import re

with open('src/components/ludo/ludo-board.tsx', 'r') as f:
    text = f.read()

# Make bases solid and premium
base_replacement = """
          <View
            key={`base-${seat}`}
            pointerEvents="none"
            style={[
              styles.base,
              {
                top: `${(area.row / 15) * 100}%`,
                left: `${(area.col / 15) * 100}%`,
                width: `${(area.size / 15) * 100}%`,
                height: `${(area.size / 15) * 100}%`,
                backgroundColor: color,
                borderColor: 'rgba(0,0,0,0.1)',
                padding: '4%',
              },
            ]}
          >
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 8 }} />
          </View>
"""
text = re.sub(r'\<View\n\s*key=\{\`base-\$\{seat\}\`\}.*?\/\>', base_replacement, text, flags=re.DOTALL)

# Make home cells look better
home_cell_replacement = """
            <View
              key={`home-${seat}-${index}`}
              pointerEvents="none"
              style={[
                styles.homeCell,
                {
                  top: `${(cell.row / 15) * 100}%`,
                  left: `${(cell.col / 15) * 100}%`,
                  width: `${100 / 15}%`,
                  height: `${100 / 15}%`,
                  backgroundColor: color,
                  opacity: 0.85,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.05)',
                },
              ]}
            />
"""
text = re.sub(r'\<View\n\s*key=\{\`home-\$\{seat\}-\$\{index\}\`\}.*?\/\>', home_cell_replacement, text, flags=re.DOTALL)

# Only draw grid borders if it's a path cell
cells_replacement = """
      {cells.map((cell) => {
        const path = isPathCell(cell.row, cell.col);
        const safe = safeKeys.has(`${cell.row}:${cell.col}`);
        if (!path) return null; // Don't draw spreadsheet!

        return (
          <View
            key={`c-${cell.row}-${cell.col}`}
            pointerEvents="none"
            style={[
              styles.gridCell,
              {
                top: `${(cell.row / 15) * 100}%`,
                left: `${(cell.col / 15) * 100}%`,
                width: `${100 / 15}%`,
                height: `${100 / 15}%`,
                borderColor: theme.border,
                backgroundColor: safe ? theme.border : theme.card,
              },
            ]}
          />
        );
      })}
"""
text = re.sub(r'\{cells\.map\(\(cell\).*?\}\)\}', cells_replacement, text, flags=re.DOTALL)

# Draw tokens nicely
token_replacement = """
                <Pressable
                  key={token.id}
                  disabled={disabled || !legal}
                  onPress={() => onTokenPress(token.id)}
                  style={[
                    styles.token,
                    {
                      backgroundColor: color,
                      borderColor: '#FFFFFF',
                      borderWidth: legal ? 3 : 2,
                      transform: [{ translateX: index * 4 }, { translateY: index * 4 }],
                      zIndex: index + 1,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      elevation: 4,
                    },
                  ]}>
                  {legal && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />}
                </Pressable>
"""
text = re.sub(r'\<Pressable\n\s*key=\{token\.id\}.*?\<\/Pressable\>', token_replacement, text, flags=re.DOTALL)

text = text.replace("backgroundColor: theme.backgroundElement", "backgroundColor: '#FCFCFA'")
text = text.replace("borderWidth: 1,\n    borderRadius: 18,", "borderWidth: 2,\n    borderRadius: 12,\n    borderColor: theme.borderStrong,")

with open('src/components/ludo/ludo-board.tsx', 'w') as f:
    f.write(text)
