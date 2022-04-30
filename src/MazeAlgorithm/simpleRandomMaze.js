function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export default function randomMazeGenerator(grid, rows, cols) {
  grid.forEach(row => {
    row.forEach((_, pos) => {
      if (Math.random() < 0.25) {
        row[pos].isWall = true;
      }
    });
  });

  const entry = {x: getRandom(rows), y: getRandom(cols)};
  const exit = {x: -2, y: -2};
  do {
    exit.x = getRandom(rows);
    exit.y = getRandom(cols);
    entry.x = getRandom(rows);
    entry.y = getRandom(cols);
    // console.log(exit.x, exit.y, entry.x, entry.y);
  } while (
    (exit.x === entry.x && exit.y === entry.y) ||
    grid[entry.x][entry.y].isWall ||
    grid[exit.x][exit.y].isWall
  );

  grid[entry.x][entry.y].isStart = true;
  grid[exit.x][exit.y].isFinish = true;
  return [grid, entry, exit];
}
