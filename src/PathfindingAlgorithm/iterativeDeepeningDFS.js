export function iterativeDeepeningDFS(
  grid,
  startNode,
  finishNode,
  animate,
  getPath,
  clearPath,
) {
  let findFinish = false;
  for (let l = 1; l < Infinity; l++) {
    const res = depthLimitedSearch(grid, startNode, finishNode, l, findFinish);
    console.log(res);
    if (findFinish) {
      const path = getPath(finishNode);
      animate(res, path);
      return;
    } else {
      animate(res, []);
    }
    clearPath();
  }
}

export function depthLimitedSearch(
  grid,
  startNode,
  finishNode,
  limit,
  findFinish,
) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = [];
  unvisitedNodes.push(startNode);
  if (limit === 0) {
    return visitedNodesInOrder;
  }
  while (unvisitedNodes.length !== 0) {
    const closestNode = unvisitedNodes.pop();
    if (limit === 0) return visitedNodesInOrder;
    closestNode.isVisited = true;
    if (closestNode.isWall) continue;
    visitedNodesInOrder.push(closestNode);
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    updateUnvisitedNeighbors(closestNode, unvisitedNeighbors);
    for (const node of unvisitedNeighbors) {
      if (node === finishNode) {
        findFinish = true;
        return visitedNodesInOrder;
      }
      if (!node.isVisited) unvisitedNodes.push(node);
    }
    limit--;
  }
  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node, unvisitedNeighbors) {
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
