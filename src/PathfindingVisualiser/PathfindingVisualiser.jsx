import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from '../PathfindingAlgorithm/dijkstra';
import {bfs} from '../PathfindingAlgorithm/bfs';
import {dfs} from '../PathfindingAlgorithm/dfs';
import Navbar from '../components/Navbar/Navbar';
import Legend from '../components/Legend'
import randomMazeGenerator from '../MazeAlgorithm/simpleRandomMaze'
import weightedMazeGenerator from '../MazeAlgorithm/randomWeighteMaze'

import './PathfindingVisualiser.css';
import { greedySearch } from '../PathfindingAlgorithm/greedy';
import {astarSearch} from '../PathfindingAlgorithm/astar';

let START_NODE_ROW;
let START_NODE_COL;
let FINISH_NODE_ROW;
let FINISH_NODE_COL;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      algo: null,
      maze: null,
      speed: 'Average',
    };
    this.setAlgo = this.setAlgo.bind(this);
    this.setMaze = this.setMaze.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.visualize = this.visualize.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.clearPath = this.clearPath.bind(this);
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  setAlgo(algo) {
    this.setState({algo: algo})
  }

  setMaze(maze) {
    this.setState({maze: maze}, () => {switch(this.state.maze) {
      case 'Simple Random Maze': 
      { const grid = getInitialGrid();
        const array = randomMazeGenerator(grid, 23, 60);
        const newGrid = array[0];
        const entry = array[1];
        const exit = array[2];
        this.setState({grid: newGrid});
        [START_NODE_ROW, START_NODE_COL] = [entry.x, entry.y];
        [FINISH_NODE_ROW, FINISH_NODE_COL] = [exit.x, exit.y];
      }
        break;
      case 'Random Weighted Maze':
      { const grid = getInitialGrid();
        const array = weightedMazeGenerator(grid, 23, 60);
        const newGrid = array[0];
        const entry = array[1];
        const exit = array[2];
        this.setState({grid: newGrid});
        [START_NODE_ROW, START_NODE_COL] = [entry.x, entry.y];
        [FINISH_NODE_ROW, FINISH_NODE_COL] = [exit.x, exit.y];
      }
        break;
      case 'Recursive Maze':
          break;
      default:
        break;
    }
  }
  )
}

  setSpeed(speed) {
    this.setState({speed: speed})
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  resetGrid() {
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 60; col++) {
        const node = this.state.grid[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node';
      }
    }
  }

  clearPath() {
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 60; col++) {
        const node = this.state.grid[row][col];
        if (node.isWall) continue;
        if (node.isStart) document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-start';
        if (node.isFinish) document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-finish';
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node';
      }
    }
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
    setTimeout(() => {
      this.animateShortestPath(nodesInShortestPathOrder);
    }, 10 * visitedNodesInOrder.length);
    return;
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  visualize() {
    console.log(this.state);
    // no algorithm is chosen
    if (this.state.algo === null) {
      alert("Please select a algorithm to visualize!")
      return;
    }
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;
    switch(this.state.algo) {
      case 'Depth-first Search':
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        break;
      case 'Breadth-first Search':
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        break;
      case 'Greedy Best-first Search':
        visitedNodesInOrder = greedySearch(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        break;
      case "Dijkstra's Algorithm":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        break;
      case 'A* Search':
        visitedNodesInOrder = astarSearch(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        break; 
      default:
        break
    }
    // await delay(200);
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(finishNode);
    
    this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="App">
          <Navbar startViz={this.visualize} setAlgo={this.setAlgo} setMaze={this.setMaze} setSpeed={this.setSpeed} resetGrid={this.resetGrid} clearPath={this.clearPath}/>
          <Legend />
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, isWeighted} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isWeighted={isWeighted}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 23; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeighted: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
