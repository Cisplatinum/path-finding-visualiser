function manhattanDistance(nodeOne, nodeTwo) {
  let xChange = Math.abs(nodeOne.row - nodeTwo.row);
  let yChange = Math.abs(nodeOne.col - nodeTwo.col);
  return xChange + yChange;
}

export function astarSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes);
    console.log('unvisitedNodes', unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // skip when we hit a wall
    if (closestNode.isWall) continue;
    // console.log('startNode', startNode.distance);
    // console.log('closestNode', closestNode.distance);
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    let manhattanDis = manhattanDistance(neighbor, finishNode);
    if (neighbor.isWeighted) {
      neighbor.distance = node.distance + 5;
    } else {
      neighbor.distance = node.distance + 1;
    }
    neighbor.distance += manhattanDis;
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
