import { LUDO_DISCOVERIES, LUDO_QUESTIONS } from '@/data/ludo';
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
  pickQuestion,
  resolveDuel,
  rollDice,
  tokenById,
} from '@/games/ludo/engine';
import { LudoGameState, LudoPlayerConfig, LudoToken } from '@/games/ludo/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const STEP_MS = 110;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  const legalIds = useMemo(() => legalTokenIds(state), [state]);
  const player = currentPlayer(state);

  useEffect(() => {
    if (state.phase !== 'duel' || !state.pendingCapture) return;
    resolvedRef.current = false;
    setDuelChoices({ attacker: null, defender: null, attackerAt: null, defenderAt: null });
    setDuelElapsed(0);
    setDuelResult(null);
    duelStartRef.current = Date.now();
    setState((current) => {
      if (current.pendingQuestion) return current;
      const question = pickQuestion(LUDO_QUESTIONS, current.usedQuestionIds);
      return question ? attachQuestion(current, question) : current;
    });
  }, [state.phase, state.pendingCapture?.attackerTokenId, state.pendingCapture?.defenderTokenId]);

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
    setTimeout(() => {
      setState((current) => {
        const next = resolveDuel(current, outcome, LUDO_DISCOVERIES);
        setDisplayTokens(next.tokens);
        return next;
      });
      setDuelResult(null);
    }, 700);
  }, []);

  useEffect(() => {
    if (state.phase !== 'duel' || !state.pendingQuestion || resolvedRef.current) return;
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

  const reset = useCallback(() => {
    const next = createLudoGame(players);
    setState(next);
    setDisplayTokens(next.tokens);
    setBusy(false);
    setDiceSpin(null);
    setDuelResult(null);
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
  };
}