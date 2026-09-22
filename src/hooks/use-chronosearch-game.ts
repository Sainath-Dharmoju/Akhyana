import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  assembleGrid,
  cellsForWord,
  CHRONOSEARCH_SCORE,
  evaluateSelection,
  lettersFromPath,
  pointsForFoundWord,
} from '@/games/chronosearch/engine';
import {
  ChronoSearchPhase,
  ChronoSearchPuzzleDef,
  ChronoSearchScoreBreakdown,
  ChronoSearchWordDef,
  GridCell,
} from '@/games/chronosearch/types';

export function useChronoSearchGame(puzzle: ChronoSearchPuzzleDef) {
  const grid = useMemo(() => assembleGrid(puzzle), [puzzle]);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<ChronoSearchPhase>('playing');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [challengeChoice, setChallengeChoice] = useState<number | null>(null);
  const [challengesCorrect, setChallengesCorrect] = useState(0);
  const [challengesAttempted, setChallengesAttempted] = useState(0);
  const [importantDiscoveries, setImportantDiscoveries] = useState(0);
  const [completionBonus, setCompletionBonus] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selection, setSelection] = useState<GridCell[]>([]);
  const [invalidSelection, setInvalidSelection] = useState(false);
  const [lastXpAwarded, setLastXpAwarded] = useState(0);
  const foundCountRef = useRef(0);
  const invalidTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const foundIdSet = useMemo(() => new Set(foundIds), [foundIds]);

  const activeWord = useMemo(
    () => puzzle.words.find((word) => word.id === activeWordId) ?? null,
    [activeWordId, puzzle.words],
  );

  const foundCellKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const word of puzzle.words) {
      if (!foundIdSet.has(word.id)) continue;
      for (const cell of cellsForWord(word)) {
        keys.add(`${cell.row}:${cell.col}`);
      }
    }
    return keys;
  }, [foundIdSet, puzzle.words]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    return () => {
      if (invalidTimerRef.current) clearTimeout(invalidTimerRef.current);
    };
  }, []);

  const finishWordFlow = useCallback(() => {
    if (foundCountRef.current >= puzzle.words.length) {
      setCompletionBonus(CHRONOSEARCH_SCORE.puzzleComplete);
      setScore((current) => current + CHRONOSEARCH_SCORE.puzzleComplete);
      setPhase('complete');
      setActiveWordId(null);
      setSelection([]);
      return;
    }
    setPhase('playing');
    setActiveWordId(null);
    setChallengeChoice(null);
    setSelection([]);
  }, [puzzle.words.length]);

  const applyFoundWord = useCallback(
    (word: ChronoSearchWordDef) => {
      const nextFoundCount = foundCountRef.current + 1;
      foundCountRef.current = nextFoundCount;
      const gained = pointsForFoundWord(word.isImportant);
      setFoundIds((current) => [...current, word.id]);
      setScore((current) => current + gained);
      setLastXpAwarded(gained);
      if (word.isImportant) {
        setImportantDiscoveries((current) => current + 1);
      }
      setActiveWordId(word.id);
      setChallengeChoice(null);
      setPhase('discovery');
    },
    [],
  );

  const completeSelection = useCallback(
    (path: GridCell[]) => {
      if (phase !== 'playing') {
        setSelection([]);
        return;
      }

      const selectedWord = lettersFromPath(grid, path);
      const result = evaluateSelection(puzzle.words, foundIdSet, selectedWord);

      if (result.status !== 'found') {
        setSelection([]);
        if (result.status === 'invalid') {
          setInvalidSelection(true);
          if (invalidTimerRef.current) clearTimeout(invalidTimerRef.current);
          invalidTimerRef.current = setTimeout(() => setInvalidSelection(false), 280);
        }
        return;
      }

      applyFoundWord(result.word);
    },
    [applyFoundWord, foundIdSet, grid, phase, puzzle.words],
  );

  const continueFromDiscovery = useCallback(() => {
    if (!activeWord) return;
    if (activeWord.challenge) {
      setPhase('challenge');
      setChallengeChoice(null);
      return;
    }
    finishWordFlow();
  }, [activeWord, finishWordFlow]);

  const selectChallengeChoice = useCallback(
    (index: number) => {
      if (!activeWord?.challenge || challengeChoice !== null) return;
      const isCorrect = index === activeWord.challenge.correctIndex;
      setChallengeChoice(index);
      setChallengesAttempted((current) => current + 1);
      if (isCorrect) {
        setChallengesCorrect((current) => current + 1);
        setScore((current) => current + CHRONOSEARCH_SCORE.challengeCorrect);
        setLastXpAwarded(CHRONOSEARCH_SCORE.challengeCorrect);
      }
    },
    [activeWord, challengeChoice],
  );

  const continueFromChallenge = useCallback(() => {
    if (challengeChoice === null) return;
    finishWordFlow();
  }, [challengeChoice, finishWordFlow]);

  const reset = useCallback(() => {
    foundCountRef.current = 0;
    setFoundIds([]);
    setScore(0);
    setPhase('playing');
    setActiveWordId(null);
    setChallengeChoice(null);
    setChallengesCorrect(0);
    setChallengesAttempted(0);
    setImportantDiscoveries(0);
    setCompletionBonus(0);
    setLastXpAwarded(0);
    setElapsedSeconds(0);
    setSelection([]);
    setInvalidSelection(false);
  }, []);

  const breakdown: ChronoSearchScoreBreakdown = {
    wordsFound: foundIds.length,
    importantDiscoveries,
    challengesCorrect,
    challengesAttempted,
    completionBonus,
    total: score,
    xpEarned: score,
  };

  return {
    grid,
    foundIds,
    foundIdSet,
    foundCellKeys,
    score,
    phase,
    activeWord,
    challengeChoice,
    elapsedSeconds,
    selection,
    setSelection,
    invalidSelection,
    lastXpAwarded,
    wordsRemaining: puzzle.words.length - foundIds.length,
    completeSelection,
    continueFromDiscovery,
    selectChallengeChoice,
    continueFromChallenge,
    reset,
    breakdown,
  };
}
