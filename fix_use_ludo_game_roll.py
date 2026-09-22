import re

with open('src/hooks/use-ludo-game.ts', 'r') as f:
    text = f.read()

replacement = """
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
"""

text = re.sub(r'const roll = useCallback\(async \(\) \=\> \{.*?setBusy\(false\);\n  \}, \[busy\]\);', replacement, text, flags=re.DOTALL)

with open('src/hooks/use-ludo-game.ts', 'w') as f:
    f.write(text)
