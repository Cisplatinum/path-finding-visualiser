export default function recursiveDivisionMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation,
  surroundingWalls,
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          row === 0 ||
          row === grid.length - 1 ||
          col === 0 ||
          col === grid[0].length - 1
        )
          grid[row][col].isWall = true;
      }
    }
    surroundingWalls = true;
  }
  if (orientation === 'horizontal') {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          row === currentRow &&
          col !== colRandom &&
          col >= colStart - 1 &&
          col <= colEnd + 1
        ) {
          let currNode = grid[row][col];
          if (!currNode.isStart && !currNode.isFinish) {
            currNode.isWall = true;
          }
        }
      }
    }

    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        'vertical',
        surroundingWalls,
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
      );
    } else {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        'vertical',
        surroundingWalls,
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (
          col === currentCol &&
          row !== rowRandom &&
          row >= rowStart - 1 &&
          row <= rowEnd + 1
        ) {
          let currNode = grid[row][col];
          if (!currNode.isStart && !currNode.isFinish) {
            currNode.isWall = true;
          }
        }
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        'horizontal',
        surroundingWalls,
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        'horizontal',
        surroundingWalls,
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
      );
    }
  }
}
