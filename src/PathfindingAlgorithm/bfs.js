// export function bfs(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   const unvisitedNodes = [];
//   unvisitedNodes.push(startNode);
//   while (unvisitedNodes.length !== 0) {
//     const closestNode = unvisitedNodes.shift();
//     closestNode.isVisited = true;
//     if (closestNode.isWall) continue;
//     visitedNodesInOrder.push(closestNode);
//     const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
//     updateUnvisitedNeighbors(closestNode, unvisitedNeighbors);
//     for (const node of unvisitedNeighbors) {
//       if (node === finishNode) return visitedNodesInOrder;
//       if (!node.isVisited) unvisitedNodes.push(node);
//     }
//   }
// }

// function updateUnvisitedNeighbors(node, unvisitedNeighbors) {
//   for (const neighbor of unvisitedNeighbors) {
//     neighbor.previousNode = node;
//   }
// }

// function getUnvisitedNeighbors(node, grid) {
//   const neighbors = [];
//   const {col, row} = node;
//   if (row > 0) neighbors.push(grid[row - 1][col]);
//   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//   if (col > 0) neighbors.push(grid[row][col - 1]);
//   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//   return neighbors.filter(neighbor => !neighbor.isVisited);
// }

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // skip when we hit a wall
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
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

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
