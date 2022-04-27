export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    const closestNode = unvisitedNodes.pop();
    closestNode.isVisited = true;
    if (closestNode.isWall) continue;
    visitedNodesInOrder.push(closestNode);
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    updateUnvisitedNeighbors(closestNode, unvisitedNeighbors);
    for (const node of unvisitedNeighbors) {
      if (node === finishNode) return visitedNodesInOrder;
      if (!node.isVisited) unvisitedNodes.push(node);
    }
  }
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
