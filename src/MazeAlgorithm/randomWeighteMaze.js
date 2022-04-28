function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export default function weightedMazeGenerator(grid, rows, cols) {
  grid.forEach(row => {
    row.forEach((_, pos) => {
      if (Math.random() < 0.4) {
        row[pos].isWeighted = true;
      }
    });
  });

  const entry = {x: getRandom(rows), y: getRandom(cols)};
  const exit = {x: -1, y: -1};
  do {
    exit.x = getRandom(rows);
    exit.y = getRandom(cols);
    entry.x = getRandom(rows);
    entry.y = getRandom(cols);
  } while (
    (exit.x === entry.x && exit.y === entry.y) ||
    grid[entry.x][entry.y].isWeighted ||
    grid[exit.x][exit.y].isWeighted
  );

  grid[entry.x][entry.y].isStart = true;
  grid[exit.x][exit.y].isFinish = true;
  return [grid, entry, exit];
}
