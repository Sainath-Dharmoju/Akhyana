import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GestureResponderEvent, PanResponder, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius } from '@/constants/theme';
import { cellKey, selectionPathFromDrag } from '@/games/chronosearch/engine';
import { GridCell } from '@/games/chronosearch/types';
import { useTheme } from '@/hooks/use-theme';

interface ChronoSearchWordGridProps {
  grid: string[][];
  selection: GridCell[];
  foundCellKeys: ReadonlySet<string>;
  invalidSelection: boolean;
  interactionEnabled: boolean;
  onDragActiveChange?: (active: boolean) => void;
  onSelectionChange: (path: GridCell[]) => void;
  onSelectionComplete: (path: GridCell[]) => void;
}

export function ChronoSearchWordGrid({
  grid,
  selection,
  foundCellKeys,
  invalidSelection,
  interactionEnabled,
  onDragActiveChange,
  onSelectionChange,
  onSelectionComplete,
}: ChronoSearchWordGridProps) {
  const theme = useTheme();
  const size = grid.length;
  const boardRef = useRef<View>(null);
  const originRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const startRef = useRef<GridCell | null>(null);
  const directionRef = useRef<GridCell | null>(null);
  const pathRef = useRef<GridCell[]>([]);
  const [boardWidth, setBoardWidth] = useState(0);
  const cellSize = boardWidth > 0 ? boardWidth / size : 0;
  const selectedKeys = new Set(selection.map(cellKey));

  const measureBoard = useCallback(() => {
    boardRef.current?.measureInWindow((x, y, width, height) => {
      originRef.current = { x, y, width, height };
      if (width > 0) setBoardWidth(width);
    });
  }, []);

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

  const applyPointer = useCallback(
    (pageX: number, pageY: number) => {
      const cell = pageToCell(pageX, pageY);
      const start = startRef.current;
      if (!cell || !start) return;
      const result = selectionPathFromDrag(start, cell, directionRef.current, size);
      if (result.direction) directionRef.current = result.direction;
      pathRef.current = result.path;
      onSelectionChange(result.path);
    },
    [onSelectionChange, pageToCell, size],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => interactionEnabled,
        onStartShouldSetPanResponderCapture: () => interactionEnabled,
        onMoveShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderGrant: (event: GestureResponderEvent) => {
          if (!interactionEnabled) return;
          const { pageX, pageY, locationX, locationY } = event.nativeEvent;
          onDragActiveChange?.(true);
          boardRef.current?.measureInWindow((x, y, width, height) => {
            originRef.current = { x, y, width, height };
            if (width > 0) setBoardWidth(width);
            const cell =
              pageToCell(pageX, pageY) ??
              (width > 0
                ? {
                    row: Math.min(size - 1, Math.max(0, Math.floor(locationY / (height / size)))),
                    col: Math.min(size - 1, Math.max(0, Math.floor(locationX / (width / size)))),
                  }
                : null);
            if (!cell) return;
            startRef.current = cell;
            directionRef.current = null;
            pathRef.current = [cell];
            onSelectionChange([cell]);
          });
        },
        onPanResponderMove: (event: GestureResponderEvent) => {
          applyPointer(event.nativeEvent.pageX, event.nativeEvent.pageY);
        },
        onPanResponderRelease: () => {
          onDragActiveChange?.(false);
          const path = pathRef.current;
          startRef.current = null;
          directionRef.current = null;
          pathRef.current = [];
          if (path.length >= 2) {
            onSelectionComplete(path);
          } else {
            onSelectionChange([]);
          }
        },
        onPanResponderTerminate: () => {
          onDragActiveChange?.(false);
          startRef.current = null;
          directionRef.current = null;
          pathRef.current = [];
          onSelectionChange([]);
        },
      }),
    [
      applyPointer,
      interactionEnabled,
      measureBoard,
      onDragActiveChange,
      onSelectionChange,
      onSelectionComplete,
      pageToCell,
    ],
  );

  return (
    <View
      ref={boardRef}
      collapsable={false}
      pointerEvents="box-only"
      onLayout={measureBoard}
      style={[
        styles.board,
        {
          backgroundColor: theme.card,
          borderColor: invalidSelection ? theme.accent : theme.cardBorder,
        },
      ]}
      {...panResponder.panHandlers}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row} pointerEvents="none">
          {row.map((letter, colIndex) => {
            const key = `${rowIndex}:${colIndex}`;
            const isFound = foundCellKeys.has(key);
            const isSelected = selectedKeys.has(key);
            
            let backgroundColor: string = 'transparent';
            let color: string = theme.textSecondary;
            let borderRadius = 0;
            let opacity = 1;

            if (isFound) {
              backgroundColor = '#50613E'; // Deep forest olive
              color = '#FFFFFF';
              borderRadius = 12;
            } else if (isSelected) {
              backgroundColor = invalidSelection ? theme.accent : '#7D7246'; // Chola / warm green
              color = '#FFFFFF';
              borderRadius = 12;
              opacity = 0.9;
            }

            return (
              <View
                key={key}
                pointerEvents="none"
                style={[
                  styles.cell,
                  {
                    width: cellSize || undefined,
                    height: cellSize || undefined,
                    backgroundColor,
                    borderRadius,
                    opacity
                  },
                ]}>
                <ThemedText type="smallBold" style={[styles.letter, { color }]}>
                  {letter}
                </ThemedText>
              </View>
            );
          })}

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: BorderRadius.xl,
    padding: 4,
    backgroundColor: '#EBEBE3', // very soft cream
    // @ts-ignore
    userSelect: 'none',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  letter: {
    letterSpacing: 1,
  },
});
