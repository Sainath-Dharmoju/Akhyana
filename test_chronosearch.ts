import assert from 'assert';
import {
  getCellFromTouchPosition,
  isValidStraightLine,
  getStraightPath,
  selectionPathFromDrag,
  assembleGrid,
  GridScreenBounds,
} from './src/games/chronosearch/engine';
import {
  CHRONOSEARCH_PUZZLES,
  PRESERVED_ERA_PUZZLES,
  CHRONOSEARCH_DECADES,
  CHRONOSEARCH_ERAS,
  getChronoSearchDecades,
  getChronoSearchPuzzlesForDecade,
  getChronoSearchPuzzle,
  getChronoSearchEras,
  getChronoSearchEra,
  getEraForPuzzle,
} from './src/data/chronosearch';
import { GridCell } from './src/games/chronosearch/types';

console.log('====================================================');
console.log('RUNNING CHRONOSEARCH VERIFICATION TEST SUITES');
console.log('====================================================\n');

let passCount = 0;
function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passCount++;
  } catch (err: any) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ============================================================================
// SUITE 1: TOUCH-TO-CELL MAPPING & SELECTION DIRECTIONS / PATH INTEGRITY
// ============================================================================
console.log('--- SUITE 1: Touch-to-cell Mapping & Selection Paths ---');

test('Grid cell conversion handles normal cell centers', () => {
  const bounds: GridScreenBounds = { left: 50, top: 100, width: 320, height: 320 };
  const size = 8;
  const cellSize = 320 / 8; // 40px

  // Center of cell (0, 0) -> (50 + 20, 100 + 20) = (70, 120)
  const cell00 = getCellFromTouchPosition(70, 120, bounds, size);
  assert.deepStrictEqual(cell00, { row: 0, col: 0 });

  // Center of cell (3, 5) -> (50 + 5*40 + 20, 100 + 3*40 + 20) = (270, 240)
  const cell35 = getCellFromTouchPosition(270, 240, bounds, size);
  assert.deepStrictEqual(cell35, { row: 3, col: 5 });

  // Center of bottom-right cell (7, 7) -> (50 + 7*40 + 20, 100 + 7*40 + 20) = (350, 400)
  const cell77 = getCellFromTouchPosition(350, 400, bounds, size);
  assert.deepStrictEqual(cell77, { row: 7, col: 7 });
});

test('Grid cell conversion handles inner boundaries and epsilon edges', () => {
  const bounds: GridScreenBounds = { left: 0, top: 0, width: 400, height: 400 };
  const size = 8; // 50px per cell

  // Exactly on the boundary between col 0 and col 1 (x = 50)
  assert.deepStrictEqual(getCellFromTouchPosition(50, 25, bounds, size), { row: 0, col: 1 });
  // Just inside col 0 (x = 49.999)
  assert.deepStrictEqual(getCellFromTouchPosition(49.999, 25, bounds, size), { row: 0, col: 0 });

  // Exactly on boundary between row 2 and row 3 (y = 150)
  assert.deepStrictEqual(getCellFromTouchPosition(125, 150, bounds, size), { row: 3, col: 2 });
  // Just inside row 2 (y = 149.999)
  assert.deepStrictEqual(getCellFromTouchPosition(125, 149.999, bounds, size), { row: 2, col: 2 });
});

test('Grid cell conversion clamps out-of-bounds touches to perimeter cells', () => {
  const bounds: GridScreenBounds = { left: 100, top: 100, width: 300, height: 300 };
  const size = 6; // 50px per cell

  // Far negative / top-left
  assert.deepStrictEqual(getCellFromTouchPosition(10, 20, bounds, size), { row: 0, col: 0 });
  // Far positive / bottom-right
  assert.deepStrictEqual(getCellFromTouchPosition(800, 900, bounds, size), { row: 5, col: 5 });
  // Negative X, valid Y
  assert.deepStrictEqual(getCellFromTouchPosition(50, 225, bounds, size), { row: 2, col: 0 });
  // Overshot X, valid Y
  assert.deepStrictEqual(getCellFromTouchPosition(550, 275, bounds, size), { row: 3, col: 5 });
});

test('Grid cell conversion returns null on unmeasured or zero bounds', () => {
  assert.strictEqual(getCellFromTouchPosition(100, 100, { left: 0, top: 0, width: 0, height: 0 }, 8), null);
  assert.strictEqual(getCellFromTouchPosition(100, 100, { left: 0, top: 0, width: 100, height: -10 }, 8), null);
  assert.strictEqual(getCellFromTouchPosition(100, 100, { left: 0, top: 0, width: 100, height: 100 }, 0), null);
});

test('Straight path: horizontal forward and reverse selections', () => {
  const start: GridCell = { row: 2, col: 1 };
  const right: GridCell = { row: 2, col: 5 };
  const left: GridCell = { row: 2, col: 0 };

  // Forward horizontal
  assert.strictEqual(isValidStraightLine(start, right), true);
  const pathR = getStraightPath(start, right);
  assert.deepStrictEqual(pathR, [
    { row: 2, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
    { row: 2, col: 5 },
  ]);

  // Reverse horizontal
  assert.strictEqual(isValidStraightLine(start, left), true);
  const pathL = getStraightPath(start, left);
  assert.deepStrictEqual(pathL, [
    { row: 2, col: 1 },
    { row: 2, col: 0 },
  ]);
});

test('Straight path: vertical forward and reverse selections', () => {
  const start: GridCell = { row: 1, col: 3 };
  const down: GridCell = { row: 5, col: 3 };
  const up: GridCell = { row: 0, col: 3 };

  // Downward vertical
  assert.strictEqual(isValidStraightLine(start, down), true);
  assert.deepStrictEqual(getStraightPath(start, down), [
    { row: 1, col: 3 },
    { row: 2, col: 3 },
    { row: 3, col: 3 },
    { row: 4, col: 3 },
    { row: 5, col: 3 },
  ]);

  // Upward reverse vertical
  assert.strictEqual(isValidStraightLine(start, up), true);
  assert.deepStrictEqual(getStraightPath(start, up), [
    { row: 1, col: 3 },
    { row: 0, col: 3 },
  ]);
});

test('Straight path: all 4 diagonal directions (forward & reverse)', () => {
  const center: GridCell = { row: 3, col: 3 };

  // 1. Down-Right (row+1, col+1)
  const downRight: GridCell = { row: 6, col: 6 };
  assert.strictEqual(isValidStraightLine(center, downRight), true);
  assert.deepStrictEqual(getStraightPath(center, downRight), [
    { row: 3, col: 3 },
    { row: 4, col: 4 },
    { row: 5, col: 5 },
    { row: 6, col: 6 },
  ]);

  // 2. Down-Left (row+1, col-1)
  const downLeft: GridCell = { row: 6, col: 0 };
  assert.strictEqual(isValidStraightLine(center, downLeft), true);
  assert.deepStrictEqual(getStraightPath(center, downLeft), [
    { row: 3, col: 3 },
    { row: 4, col: 2 },
    { row: 5, col: 1 },
    { row: 6, col: 0 },
  ]);

  // 3. Up-Right (row-1, col+1)
  const upRight: GridCell = { row: 0, col: 6 };
  assert.strictEqual(isValidStraightLine(center, upRight), true);
  assert.deepStrictEqual(getStraightPath(center, upRight), [
    { row: 3, col: 3 },
    { row: 2, col: 4 },
    { row: 1, col: 5 },
    { row: 0, col: 6 },
  ]);

  // 4. Up-Left (row-1, col-1)
  const upLeft: GridCell = { row: 0, col: 0 };
  assert.strictEqual(isValidStraightLine(center, upLeft), true);
  assert.deepStrictEqual(getStraightPath(center, upLeft), [
    { row: 3, col: 3 },
    { row: 2, col: 2 },
    { row: 1, col: 1 },
    { row: 0, col: 0 },
  ]);
});

test('Invalid L-shaped and knight moves are rejected and preserve previous path', () => {
  const start: GridCell = { row: 2, col: 2 };

  // Knight move (row + 1, col + 2)
  const knightMove: GridCell = { row: 3, col: 4 };
  assert.strictEqual(isValidStraightLine(start, knightMove), false);
  assert.strictEqual(getStraightPath(start, knightMove), null);

  // Irregular jump (row + 2, col + 3)
  const irregular: GridCell = { row: 4, col: 5 };
  assert.strictEqual(isValidStraightLine(start, irregular), false);
  assert.strictEqual(getStraightPath(start, irregular), null);

  // Drag interaction preserves previous straight path when finger drifts into L-shape
  const validStraightPath = [
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
  ];
  const dragResult = selectionPathFromDrag(start, knightMove, validStraightPath, 8);
  assert.deepStrictEqual(dragResult.path, validStraightPath);
  assert.deepStrictEqual(dragResult.direction, { row: 0, col: 1 });

  // Without a previous path, falls back to single start cell
  const fallback = selectionPathFromDrag(start, knightMove, null, 8);
  assert.deepStrictEqual(fallback.path, [start]);
  assert.strictEqual(fallback.direction, null);
});

// ============================================================================
// SUITE 2: DATA INTEGRITY CHECKS FOR DECADE & YEAR SELECTORS & ARCHIVE PUZZLES
// ============================================================================
console.log('\n--- SUITE 2: Data Integrity Checks ---');

test('CHRONOSEARCH_PUZZLES contains only documented decades and exact matching years', () => {
  assert(CHRONOSEARCH_PUZZLES.length > 0, 'Must have puzzles in bank');
  for (const puzzle of CHRONOSEARCH_PUZZLES) {
    assert(typeof puzzle.decade === 'number', `Puzzle ${puzzle.id} must have numeric decade`);
    assert(typeof puzzle.year === 'number', `Puzzle ${puzzle.id} must have exact numeric year`);
    assert(
      puzzle.year >= puzzle.decade && puzzle.year <= puzzle.decade + 9,
      `Puzzle ${puzzle.id} year ${puzzle.year} must belong to decade ${puzzle.decade}`,
    );
    assert(puzzle.title && puzzle.title.length > 0, `Puzzle ${puzzle.id} must have title`);
    assert(puzzle.description && puzzle.description.length > 0, `Puzzle ${puzzle.id} must have description`);
    assert(puzzle.gridSize >= 6 && puzzle.gridSize <= 12, `Puzzle ${puzzle.id} valid gridSize`);
    assert(puzzle.words.length >= 2, `Puzzle ${puzzle.id} must have at least 2 words`);

    // Verify grid assembly executes cleanly without overlaps or out-of-bound errors
    const grid = assembleGrid(puzzle);
    assert.strictEqual(grid.length, puzzle.gridSize);
    assert.strictEqual(grid[0].length, puzzle.gridSize);
  }
});

test('PRESERVED_ERA_PUZZLES remains strictly undated with no fabricated decade or year', () => {
  assert(PRESERVED_ERA_PUZZLES.length > 0, 'Must have preserved era puzzles');
  for (const p of PRESERVED_ERA_PUZZLES) {
    assert.strictEqual(p.decade, undefined, `Preserved puzzle ${p.id} must NOT have decade metadata`);
    assert.strictEqual(p.year, undefined, `Preserved puzzle ${p.id} must NOT have fabricated year`);
    assert(p.eraId !== undefined, `Preserved puzzle ${p.id} must have era`);

    // Check that era corresponds to documented era definitions
    const matchedEra = CHRONOSEARCH_ERAS.find((e) => e.id === p.eraId);
    assert(matchedEra, `Preserved puzzle ${p.id} has valid era in CHRONOSEARCH_ERAS`);

    // Verify grid assembly succeeds
    const grid = assembleGrid(p);
    assert.strictEqual(grid.length, p.gridSize);
  }
});

test('Decade selectors only expose documented decade puzzles and never leak archive puzzles', () => {
  const decades = getChronoSearchDecades();
  assert(decades.length > 0, 'Must return documented decades');

  for (const d of decades) {
    const puzzles = getChronoSearchPuzzlesForDecade(d.decade);
    assert(puzzles.length > 0, `Decade ${d.decade} must have puzzles`);
    for (const p of puzzles) {
      assert.strictEqual(p.decade, d.decade, `Returned puzzle ${p.id} must match requested decade`);
      assert(typeof p.year === 'number', `Returned puzzle ${p.id} must have documented year`);
      // Ensure no preserved era puzzle is ever returned
      const isPreserved = PRESERVED_ERA_PUZZLES.some((archive) => archive.id === p.id);
      assert.strictEqual(isPreserved, false, `Decade selector must never leak archive puzzle ${p.id}`);
    }
  }

  // Passing non-existent decade returns empty array
  assert.deepStrictEqual(getChronoSearchPuzzlesForDecade(1800), []);
});

test('Era helpers correctly resolve preserved era puzzles', () => {
  const eras = getChronoSearchEras();
  assert(eras.length > 0, 'Must return documented eras');

  for (const p of PRESERVED_ERA_PUZZLES) {
    const era = getEraForPuzzle(p.id);
    assert(era !== undefined, `Era helper must resolve era for preserved puzzle ${p.id}`);
    assert.strictEqual(era?.id, p.eraId);
  }

  // Non-era puzzle should return undefined from getEraForPuzzle
  assert.strictEqual(getEraForPuzzle('chrono-1942'), undefined);
});

// ============================================================================
// SUITE 3: DEVICE-LEVEL TEST FOR SCROLLING, RESIZING, AND SAFE-AREA CHANGES
// ============================================================================
console.log('\n--- SUITE 3: Device-Level Finger-to-Cell Accuracy ---');

test('Safe-area insets: Status bar / Dynamic Island (top offset = 59px, home indicator = 34px)', () => {
  const size = 8;
  const gridWidth = 360;
  const gridHeight = 360;
  const cellSize = 360 / 8; // 45px

  // Grid is rendered in a container with a 59px top safe-area and 20px header
  const safeAreaTop = 59;
  const headerHeight = 60;
  const renderedGridTop = safeAreaTop + headerHeight; // 119px
  const renderedGridLeft = 15; // horizontal screen margin

  // PanResponder onPanResponderGrant computes:
  // left = pageX - locationX = renderedGridLeft
  // top = pageY - locationY = renderedGridTop
  const bounds: GridScreenBounds = {
    left: renderedGridLeft,
    top: renderedGridTop,
    width: gridWidth,
    height: gridHeight,
  };

  // User touches cell (2, 3) at its exact center
  const targetCell = { row: 2, col: 3 };
  const fingerPageX = renderedGridLeft + targetCell.col * cellSize + cellSize / 2; // 15 + 135 + 22.5 = 172.5
  const fingerPageY = renderedGridTop + targetCell.row * cellSize + cellSize / 2; // 119 + 90 + 22.5 = 231.5

  const resolved = getCellFromTouchPosition(fingerPageX, fingerPageY, bounds, size);
  assert.deepStrictEqual(resolved, targetCell, 'Must map to cell (2, 3) with dynamic safe area');
});

test('Scroll offset: Grid scrolled up by 180px in a ScrollView', () => {
  const size = 8;
  const gridWidth = 360;
  const gridHeight = 360;
  const cellSize = 45;

  const initialGridTop = 200;
  const initialGridLeft = 20;

  // Before scrolling:
  const initialBounds: GridScreenBounds = {
    left: initialGridLeft,
    top: initialGridTop,
    width: gridWidth,
    height: gridHeight,
  };

  // After scrolling 180px down, the grid screen position shifts up:
  const scrollOffsetY = 180;
  const scrolledGridTop = initialGridTop - scrollOffsetY; // 20px from top of screen

  // The dynamic onPanResponderGrant calculation:
  // pageY - locationY = scrolledGridTop
  const scrolledBounds: GridScreenBounds = {
    left: initialGridLeft,
    top: scrolledGridTop,
    width: gridWidth,
    height: gridHeight,
  };

  // User touches cell (4, 1):
  const targetCell = { row: 4, col: 1 };
  const fingerPageX = initialGridLeft + targetCell.col * cellSize + 22.5;
  const fingerPageY = scrolledGridTop + targetCell.row * cellSize + 22.5;

  const resolved = getCellFromTouchPosition(fingerPageX, fingerPageY, scrolledBounds, size);
  assert.deepStrictEqual(resolved, targetCell, 'Must map accurately to cell (4, 1) when scrolled');
});

test('Device resizing: Compact (320px), Standard (390px), Tablet (768px), and Landscape (844px)', () => {
  const devices = [
    { name: 'Compact Phone', screenW: 320, padding: 16, top: 80 },
    { name: 'Standard Phone (iPhone 15)', screenW: 393, padding: 20, top: 120 },
    { name: 'Android Large (Pixel 8)', screenW: 412, padding: 24, top: 110 },
    { name: 'Tablet Portrait (iPad)', screenW: 768, padding: 64, top: 150 },
    { name: 'Landscape Mode', screenW: 844, padding: 120, top: 40 },
  ];

  const size = 8;

  for (const device of devices) {
    const boardWidth = device.screenW - device.padding * 2;
    const boardHeight = boardWidth; // 1:1 aspect ratio
    const bounds: GridScreenBounds = {
      left: device.padding,
      top: device.top,
      width: boardWidth,
      height: boardHeight,
    };

    const cellSize = boardWidth / size;

    // Test every single cell center on this device layout
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const pageX = bounds.left + c * cellSize + cellSize / 2;
        const pageY = bounds.top + r * cellSize + cellSize / 2;
        const mapped = getCellFromTouchPosition(pageX, pageY, bounds, size);
        assert.deepStrictEqual(
          mapped,
          { row: r, col: c },
          `Failed on ${device.name} at row ${r}, col ${c}`,
        );
      }
    }
  }
});

test('Safe area rotation / landscape side insets (notch on left = 44px)', () => {
  const size = 8;
  const leftInset = 44; // landscape notch inset
  const rightInset = 44;
  const screenWidth = 844;
  const boardSize = 360;

  const bounds: GridScreenBounds = {
    left: leftInset + (screenWidth - leftInset - rightInset - boardSize) / 2,
    top: 20,
    width: boardSize,
    height: boardSize,
  };

  const cellSize = boardSize / size;
  // Touch cell (0, 7)
  const pageX = bounds.left + 7 * cellSize + cellSize / 2;
  const pageY = bounds.top + 0 * cellSize + cellSize / 2;

  const mapped = getCellFromTouchPosition(pageX, pageY, bounds, size);
  assert.deepStrictEqual(mapped, { row: 0, col: 7 }, 'Must map accurately with landscape left notch');
});

console.log(`\n====================================================`);
console.log(`ALL ${passCount} TESTS PASSED CLEANLY!`);
console.log(`====================================================`);
