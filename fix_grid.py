import re

with open('src/components/chronosearch/word-grid.tsx', 'r') as f:
    text = f.read()

# Replace pageToCell logic
page_to_cell_replacement = """
  const pageToCell = useCallback(
    (pageX: number, pageY: number): GridCell | null => {
      const { x, y, width, height } = originRef.current;
      if (width <= 0 || height <= 0) return null;
      const colSize = width / size;
      const rowSize = height / size;
      
      let col = Math.floor((pageX - x) / colSize);
      let row = Math.floor((pageY - y) / rowSize);
      
      // Clamp to grid boundaries so dragging outside doesn't fail but stops at the edge
      col = Math.max(0, Math.min(size - 1, col));
      row = Math.max(0, Math.min(size - 1, row));
      
      return { row, col };
    },
    [size],
  );
"""

text = re.sub(r'const pageToCell = useCallback\(\s*\(pageX: number, pageY: number\): GridCell \| null => \{.*?\},\s*\[size\],\s*\);', page_to_cell_replacement.strip(), text, flags=re.DOTALL)

with open('src/components/chronosearch/word-grid.tsx', 'w') as f:
    f.write(text)
