function manhattanDistance(nodeOne, nodeTwo) {
  let xChange = Math.abs(nodeOne.row - nodeTwo.row);
  let yChange = Math.abs(nodeOne.col - nodeTwo.col);
  return xChange + yChange;
}

export function astarSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.distancel1 = manhattanDistance(startNode, finishNode);
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length !== 0) {
    sortNodesByDistance(unvisitedNodes);
    // console.log('unvisitedNodes', unvisitedNodes);
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
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.distance + nodeA.distancel1 === nodeB.distance + nodeB.distancel1)
      return nodeA.distancel1 - nodeB.distancel1;
    return (
      nodeA.distance + nodeA.distancel1 - (nodeB.distance + nodeB.distancel1)
    );
  });
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    let manhattanDis = manhattanDistance(neighbor, finishNode);
    if (neighbor.isWeighted) {
      const temp = node.distance + 5;
      if (temp < neighbor.distance) {
        neighbor.distance = temp;
        neighbor.distancel1 = manhattanDis;
        neighbor.previousNode = node;
      }
    } else {
      const temp = node.distance + 1;
      if (temp < neighbor.distance) {
        neighbor.distance = temp;
        neighbor.distancel1 = manhattanDis;
        neighbor.previousNode = node;
      }
    }
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
