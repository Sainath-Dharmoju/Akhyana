/**
 * ChronoSearch device-matrix regression test.
 *
 * Compact matrix of iOS and Android screen sizes. For every device it checks:
 *  - boundary touches (exact edges, epsilon-inside, out-of-bounds clamping)
 *  - reverse diagonal selections in all four diagonal directions
 *
 * Failures are reported WITH device details (name, OS, screen size, grid
 * bounds, the touch that failed, expected vs actual cell). Exits non-zero
 * when any device/interaction fails.
 *
 * Run:  npx tsx test_device_matrix.ts
 */
import {
  getCellFromTouchPosition,
  getStraightPath,
  GridScreenBounds,
} from './src/games/chronosearch/engine';
import { GridCell } from './src/games/chronosearch/types';

export interface DeviceSpec {
  name: string;
  os: 'iOS' | 'Android';
  screenW: number;
  screenH: number;
  padding: number;
  topOffset: number;
  gridSize: number;
}

export const DEVICES: DeviceSpec[] = [
  // iOS ---------------------------------------------------------------------
  { name: 'iPhone SE (3rd gen)', os: 'iOS', screenW: 375, screenH: 667, padding: 16, topOffset: 76, gridSize: 8 },
  { name: 'iPhone 15', os: 'iOS', screenW: 393, screenH: 852, padding: 20, topOffset: 118, gridSize: 8 },
  { name: 'iPhone 15 Pro Max', os: 'iOS', screenW: 430, screenH: 932, padding: 20, topOffset: 126, gridSize: 8 },
  { name: 'iPad mini', os: 'iOS', screenW: 744, screenH: 1024, padding: 48, topOffset: 120, gridSize: 8 },
  // Android -----------------------------------------------------------------
  { name: 'Android compact (Moto E)', os: 'Android', screenW: 360, screenH: 800, padding: 16, topOffset: 88, gridSize: 8 },
  { name: 'Pixel 7', os: 'Android', screenW: 412, screenH: 915, padding: 20, topOffset: 110, gridSize: 8 },
  { name: 'Galaxy S23 Ultra', os: 'Android', screenW: 384, screenH: 832, padding: 20, topOffset: 104, gridSize: 8 },
  { name: 'Android tablet (Tab A9+)', os: 'Android', screenW: 800, screenH: 1280, padding: 56, topOffset: 132, gridSize: 8 },
];

export interface Failure {
  device: DeviceSpec;
  scenario: string;
  detail: string;
}

export function runDeviceMatrix(): { failures: Failure[]; totalChecks: number } {
  const failures: Failure[] = [];
  let totalChecks = 0;

  function check(device: DeviceSpec, scenario: string, detail: string, ok: boolean) {
    totalChecks++;
    if (!ok) {
      failures.push({ device, scenario, detail });
    }
  }

  for (const device of DEVICES) {
    const boardSize = device.screenW - device.padding * 2;
    const bounds: GridScreenBounds = {
      left: device.padding,
      top: device.topOffset,
      width: boardSize,
      height: boardSize,
    };
    const size = device.gridSize;
    const cell = boardSize / size;

    // 1. Cell centers across the entire grid
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const x = bounds.left + c * cell + cell / 2;
        const y = bounds.top + r * cell + cell / 2;
        const got = getCellFromTouchPosition(x, y, bounds, size);
        check(device, 'cell center', `touch(${x.toFixed(1)}, ${y.toFixed(1)}) expected (${r}, ${c}) got (${got?.row}, ${got?.col})`,
          !!got && got.row === r && got.col === c);
      }
    }

    // 2. Exact outer corners
    const cornerCases: [number, number, GridCell][] = [
      [bounds.left, bounds.top, { row: 0, col: 0 }],
      [bounds.left + boardSize - 0.001, bounds.top + boardSize - 0.001, { row: size - 1, col: size - 1 }],
      [bounds.left + boardSize - 0.001, bounds.top, { row: 0, col: size - 1 }],
      [bounds.left, bounds.top + boardSize - 0.001, { row: size - 1, col: 0 }],
    ];
    for (const [x, y, exp] of cornerCases) {
      const got = getCellFromTouchPosition(x, y, bounds, size);
      check(device, 'boundary corner', `touch(${x.toFixed(1)}, ${y.toFixed(1)}) expected (${exp.row}, ${exp.col}) got (${got?.row}, ${got?.col})`,
        !!got && got.row === exp.row && got.col === exp.col);
    }

    // 3. Epsilon inside every perimeter cell (top, bottom, left, right)
    for (let c = 0; c < size; c++) {
      const topGot = getCellFromTouchPosition(bounds.left + c * cell + 0.001, bounds.top + 0.001, bounds, size);
      check(device, 'top edge epsilon', `expected (0, ${c}) got (${topGot?.row}, ${topGot?.col})`,
        !!topGot && topGot.row === 0 && topGot.col === c);

      const botGot = getCellFromTouchPosition(bounds.left + c * cell + 0.001, bounds.top + boardSize - 0.001, bounds, size);
      check(device, 'bottom edge epsilon', `expected (${size - 1}, ${c}) got (${botGot?.row}, ${botGot?.col})`,
        !!botGot && botGot.row === size - 1 && botGot.col === c);
    }

    // 4. Out-of-bounds touches clamp to edge
    const oobCases: [number, number, GridCell][] = [
      [bounds.left - 500, bounds.top - 500, { row: 0, col: 0 }],
      [bounds.left + boardSize + 500, bounds.top + boardSize + 500, { row: size - 1, col: size - 1 }],
      [bounds.left - 100, bounds.top + boardSize / 2, { row: Math.floor(size / 2), col: 0 }],
      [bounds.left + boardSize + 100, bounds.top + boardSize / 2, { row: Math.floor(size / 2), col: size - 1 }],
    ];
    for (const [x, y, exp] of oobCases) {
      const got = getCellFromTouchPosition(x, y, bounds, size);
      check(device, 'out-of-bounds clamp', `touch(${x}, ${y}) expected (${exp.row}, ${exp.col}) got (${got?.row}, ${got?.col})`,
        !!got && got.row === exp.row && got.col === exp.col);
    }

    // 5. Reverse diagonal selections in all 4 diagonal directions
    const diagonalCases: [GridCell, GridCell, string][] = [
      [{ row: size - 1, col: size - 1 }, { row: 0, col: 0 }, 'reverse main diagonal (up-left)'],
      [{ row: 0, col: size - 1 }, { row: size - 1, col: 0 }, 'reverse anti-diagonal (down-left)'],
      [{ row: 0, col: 0 }, { row: size - 1, col: size - 1 }, 'forward main diagonal (down-right)'],
      [{ row: size - 1, col: 0 }, { row: 0, col: size - 1 }, 'forward anti-diagonal (up-right)'],
    ];
    for (const [start, end, label] of diagonalCases) {
      const path = getStraightPath(start, end);
      const valid =
        path !== null &&
        path.length === size &&
        path[0].row === start.row && path[0].col === start.col &&
        path[path.length - 1].row === end.row && path[path.length - 1].col === end.col;
      check(device, label, `path ${JSON.stringify(start)} -> ${JSON.stringify(end)} failed`, valid);

      // Verify release touch at target end maps to target cell
      const endX = bounds.left + end.col * cell + cell / 2;
      const endY = bounds.top + end.row * cell + cell / 2;
      const got = getCellFromTouchPosition(endX, endY, bounds, size);
      check(device, `${label} touch target`, `touch(${endX.toFixed(1)}, ${endY.toFixed(1)}) expected (${end.row}, ${end.col}) got (${got?.row}, ${got?.col})`,
        !!got && got.row === end.row && got.col === end.col);
    }
  }

  return { failures, totalChecks };
}

const { failures, totalChecks } = runDeviceMatrix();

if (failures.length > 0) {
  console.error(`\n❌ DEVICE MATRIX FAILED: ${failures.length} failure(s) out of ${totalChecks} checks\n`);
  for (const f of failures) {
    console.error(`  DEVICE : ${f.device.name} [${f.device.os}]`);
    console.error(`           Screen: ${f.device.screenW}x${f.device.screenH} | TopOffset: ${f.device.topOffset}px | Board: ${f.device.screenW - f.device.padding * 2}px`);
    console.error(`  SCENARIO: ${f.scenario}`);
    console.error(`  DETAIL  : ${f.detail}\n`);
  }
  process.exit(1);
} else {
  console.log(`\n✅ DEVICE MATRIX PASSED: Verified ${DEVICES.length} devices across ${totalChecks} boundary and diagonal checks with zero failures.`);
}
