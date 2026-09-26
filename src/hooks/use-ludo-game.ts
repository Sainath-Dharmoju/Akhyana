import { LUDO_DISCOVERIES } from '@/data/ludo';
import {
  getQuestionsForYear,
  pickRetryDuelQuestion,
  pickYearDuelQuestion,
  shuffleYearQuestionChoices,
  YearDuelQuestion,
} from '@/data/year-duel-questions';
import { addCompletedYear } from '@/utils/completed-years';
import {
  applyTokenMove,
  attachQuestion,
  collectDiscovery,
  createLudoGame,
  currentPlayer,
  destinationDistance,
  DUEL_MS,
  evaluateDuelAnswers,
  legalTokenIds,
  resolveDuel,
  rollDice,
  tokenById,
} from '@/games/ludo/engine';
import { getLudoYear } from '@/games/ludo/session';
import { LudoGameState, LudoPlayerConfig, LudoDuelQuestion, LudoToken, QuizPhase } from '@/games/ludo/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const STEP_MS = 110;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Map a canonical YearDuelQuestion to the duel-overlay presentation copy.
 * Choices are shuffled and correctIndex recalculated on every call. The
 * stored question is never mutated.
 */
function toDuelPresentation(question: YearDuelQuestion): LudoDuelQuestion {
  const shuffled = shuffleYearQuestionChoices(question);
  return {
    id: shuffled.id,
    question: shuffled.prompt,
    choices: shuffled.choices,
    correctIndex: shuffled.correctIndex,
    explanation: shuffled.explanation,
    era: String(shuffled.year),
    difficulty: 'easy',
  };
}

export function useLudoGame(players: LudoPlayerConfig[]) {
  const [state, setState] = useState<LudoGameState>(() => createLudoGame(players));
  const [displayTokens, setDisplayTokens] = useState<LudoToken[]>(() => createLudoGame(players).tokens);
  const [busy, setBusy] = useState(false);
  const [diceSpin, setDiceSpin] = useState<number | null>(null);
  const [duelChoices, setDuelChoices] = useState<{
    attacker: number | null;
    defender: number | null;
    attackerAt: number | null;
    defenderAt: number | null;
  }>({ attacker: null, defender: null, attackerAt: null, defenderAt: null });
  const [duelElapsed, setDuelElapsed] = useState(0);
  const [duelResult, setDuelResult] = useState<string | null>(null);
  const resolvedRef = useRef(false);
  const duelStartRef = useRef(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  // ----- Year-based quiz cycle state (independent of board state) -----
  const [quizYear, setQuizYearState] = useState<number>(() => getLudoYear() ?? 1956);
  const [quizPhase, setQuizPhase] = useState<QuizPhase>('initial');
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>([]);
  const quizPhaseRef = useRef<QuizPhase>('initial');
  const usedRef = useRef<string[]>([]);
  const incorrectRef = useRef<string[]>([]);
  const presentedRef = useRef<YearDuelQuestion | null>(null);

  const setQuizPhaseSafe = (phase: QuizPhase) => {
    quizPhaseRef.current = phase;
    setQuizPhase(phase);
  };

  const legalIds = useMemo(() => legalTokenIds(state), [state]);
  const player = currentPlayer(state);

  // ----- Question selection: exact-year filter, phase-aware -----
  useEffect(() => {
    if (state.phase !== 'duel' || !state.pendingCapture) return;
    resolvedRef.current = false;
    setDuelChoices({ attacker: null, defender: null, attackerAt: null, defenderAt: null });
    setDuelElapsed(0);
    setDuelResult(null);
    duelStartRef.current = Date.now();
    setState((current) => {
      if (current.pendingQuestion) return current;
      const year = quizYear;
      let canonical: YearDuelQuestion | undefined;
      if (quizPhaseRef.current === 'retry') {
        canonical = pickRetryDuelQuestion(year, incorrectRef.current);
      } else {
        canonical = pickYearDuelQuestion(year, usedRef.current);
      }
      if (!canonical) return current; // handled by fallback resolution
      presentedRef.current = canonical;
      // Record as presented: no repeats within the same initial pass.
      if (!usedRef.current.includes(canonical.id)) {
        usedRef.current = [...usedRef.current, canonical.id];
        setUsedQuestionIds(usedRef.current);
      }
      return attachQuestion(current, toDuelPresentation(canonical));
    });
  }, [state.phase, state.pendingCapture?.attackerTokenId, state.pendingCapture?.defenderTokenId, quizYear]);

  useEffect(() => {
    if (state.phase !== 'duel' || !state.pendingQuestion) return;
    const timer = setInterval(() => {
      setDuelElapsed(Date.now() - duelStartRef.current);
    }, 80);
    return () => clearInterval(timer);
  }, [state.phase, state.pendingQuestion]);

  const finishDuel = useCallback((outcome: 'attacker' | 'defender' | 'none') => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setDuelResult(
      outcome === 'attacker' ? 'Attack holds. Capture proceeds.' : outcome === 'defender' ? 'Defence holds. No capture.' : 'Time. Neither capture nor defence.',
    );

    // ----- Quiz cycle bookkeeping (attacker is the duel initiator) -----
    const canonical = presentedRef.current;
    const attackerCorrect = outcome === 'attacker';
    if (canonical) {
      const phase = quizPhaseRef.current;
      if (phase === 'initial' && !attackerCorrect) {
        incorrectRef.current = [...incorrectRef.current, canonical.id];
        setIncorrectQuestionIds(incorrectRef.current);
      } else if (phase === 'retry' && attackerCorrect) {
        incorrectRef.current = incorrectRef.current.filter((id) => id !== canonical.id);
        setIncorrectQuestionIds(incorrectRef.current);
      }
      // retry-phase incorrect answers keep the ID in incorrectQuestionIds.
    }

    setTimeout(() => {
      setState((current) => {
        const next = resolveDuel(current, outcome, LUDO_DISCOVERIES);
        setDisplayTokens(next.tokens);
        return next;
      });
      setDuelResult(null);

      // ----- Phase transitions after the duel resolves -----
      const year = quizYear;
      const total = getQuestionsForYear(year).length;
      if (total > 0 && usedRef.current.length >= total) {
        if (quizPhaseRef.current === 'initial') {
          if (incorrectRef.current.length > 0) {
            setQuizPhaseSafe('retry');
          } else {
            setQuizPhaseSafe('year_complete');
            void addCompletedYear(year);
          }
        } else if (quizPhaseRef.current === 'retry' && incorrectRef.current.length === 0) {
          setQuizPhaseSafe('year_complete');
          void addCompletedYear(year);
        }
      }
      presentedRef.current = null;
    }, 700);
  }, [quizYear]);

  useEffect(() => {
    if (state.phase !== 'duel' || !state.pendingQuestion || resolvedRef.current) return;
    if (!state.pendingCapture) {
      // No question available for this year: resolve as time-out so the
      // duel never hangs. Defender holds, capture does not proceed.
      finishDuel('none');
      return;
    }
    const outcome = evaluateDuelAnswers({
      correctIndex: state.pendingQuestion.correctIndex,
      attackerChoice: duelChoices.attacker,
      defenderChoice: duelChoices.defender,
      attackerAtMs: duelChoices.attackerAt,
      defenderAtMs: duelChoices.defenderAt,
      elapsedMs: duelElapsed,
    });
    if (outcome !== 'pending') finishDuel(outcome);
  }, [duelChoices, duelElapsed, finishDuel, state.pendingQuestion, state.phase]);

  const roll = useCallback(async (forcedValue?: number) => {
    if (busy || stateRef.current.phase !== 'rolling' || stateRef.current.hasRolled) return;
    setBusy(true);

    let value = forcedValue;

    // Only spin if we don't have a forced value from Rapid Fire
    if (value === undefined) {
      for (let i = 0; i < 8; i += 1) {
        setDiceSpin(1 + Math.floor(Math.random() * 6));
        await sleep(45);
      }
      value = 1 + Math.floor(Math.random() * 6);
    }

    setDiceSpin(null);
    setState((current) => {
      const next = rollDice(current, value as number);
      setDisplayTokens(next.tokens);
      return next;
    });
    setBusy(false);
  }, [busy]);

  const moveToken = useCallback(
    async (tokenId: string) => {
      const current = stateRef.current;
      if (busy || current.phase !== 'selecting' || !legalTokenIds(current).includes(tokenId)) return;
      const token = tokenById(current, tokenId);
      if (!token || current.diceValue === null) return;
      const nextDistance = destinationDistance(token, current.diceValue);
      if (nextDistance === null) return;

      setBusy(true);
      if (token.distance < 0) {
        setDisplayTokens((tokens) =>
          tokens.map((item) => (item.id === tokenId ? { ...item, distance: 0 } : item)),
        );
        await sleep(STEP_MS * 2);
      } else {
        for (let distance = token.distance + 1; distance <= nextDistance; distance += 1) {
          setDisplayTokens((tokens) =>
            tokens.map((item) => (item.id === tokenId ? { ...item, distance } : item)),
          );
          await sleep(STEP_MS);
        }
      }

      setState((latest) => {
        const next = applyTokenMove(latest, tokenId, LUDO_DISCOVERIES);
        setDisplayTokens(next.tokens);
        return next;
      });
      setBusy(false);
    },
    [busy],
  );

  const answerDuel = useCallback((role: 'attacker' | 'defender', choice: number) => {
    if (stateRef.current.phase !== 'duel' || resolvedRef.current) return;
    const at = Date.now() - duelStartRef.current;
    if (at > DUEL_MS) return;
    setDuelChoices((current) => {
      if (role === 'attacker' && current.attacker !== null) return current;
      if (role === 'defender' && current.defender !== null) return current;
      return role === 'attacker'
        ? { ...current, attacker: choice, attackerAt: at }
        : { ...current, defender: choice, defenderAt: at };
    });
  }, []);

  const continueDiscovery = useCallback(() => {
    setState((current) => {
      const next = collectDiscovery(current, LUDO_DISCOVERIES);
      setDisplayTokens(next.tokens);
      return next;
    });
  }, []);

  /**
   * Start a fresh quiz cycle for a new year inside the same match.
   * Only quiz-year state resets; the board, tokens, XP and turn order
   * are untouched.
   */
  const selectNextYear = useCallback((year: number) => {
    setQuizYearState(year);
    setQuizPhaseSafe('initial');
    usedRef.current = [];
    incorrectRef.current = [];
    presentedRef.current = null;
    setUsedQuestionIds([]);
    setIncorrectQuestionIds([]);
  }, []);

  const reset = useCallback(() => {
    const next = createLudoGame(players);
    setState(next);
    setDisplayTokens(next.tokens);
    setBusy(false);
    setDiceSpin(null);
    setDuelResult(null);
    usedRef.current = [];
    incorrectRef.current = [];
    presentedRef.current = null;
    setUsedQuestionIds([]);
    setIncorrectQuestionIds([]);
    setQuizPhaseSafe('initial');
    const year = getLudoYear();
    if (year) setQuizYearState(year);
  }, [players]);

  return {
    state,
    displayTokens,
    player,
    legalIds,
    busy,
    diceSpin,
    duelChoices,
    duelElapsed,
    duelResult,
    roll,
    moveToken,
    answerDuel,
    continueDiscovery,
    reset,
    // year-based quiz cycle
    quizYear,
    quizPhase,
    usedQuestionIds,
    incorrectQuestionIds,
    selectNextYear,
  };
}
