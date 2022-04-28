import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from '../PathfindingAlgorithm/dijkstra';
import {bfs} from '../PathfindingAlgorithm/bfs';
import {dfs} from '../PathfindingAlgorithm/dfs';
import Navbar from '../components/Navbar/Navbar';
import Legend from '../components/Legend'
import randomMazeGenerator from '../MazeAlgorithm/simpleRandomMaze'
import weightedMazeGenerator from '../MazeAlgorithm/randomWeighteMaze'
import recursiveDivisionMaze from '../MazeAlgorithm/recursiveMaze'

import './PathfindingVisualiser.css';
import { greedySearch } from '../PathfindingAlgorithm/greedy';
import {astarSearch} from '../PathfindingAlgorithm/astar';

const rowsNum = 23;
const colsNum = 60;

let START_NODE_ROW = -1;
let START_NODE_COL = -1;
let FINISH_NODE_ROW = -1;
let FINISH_NODE_COL = -1;

let timeoutPara = 10;

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

  async setMaze(maze) {
    await this.resetGrid();
    // console.log('reset finished!');
    this.setState({maze: maze}, () => {switch(this.state.maze) {
      case 'Simple Random Maze': 
      { const grid = this.state.grid;
        const array = randomMazeGenerator(grid, rowsNum, colsNum);
        const newGrid = array[0];
        const entry = array[1];
        const exit = array[2];
        this.setState({grid: newGrid});
        [START_NODE_ROW, START_NODE_COL] = [entry.x, entry.y];
        [FINISH_NODE_ROW, FINISH_NODE_COL] = [exit.x, exit.y];
      }
        break;
      case 'Random Weighted Maze':
      { const grid = this.state.grid;
        const array = weightedMazeGenerator(grid, rowsNum, colsNum);
        const newGrid = array[0];
        const entry = array[1];
        const exit = array[2];
        this.setState({grid: newGrid});
        [START_NODE_ROW, START_NODE_COL] = [entry.x, entry.y];
        [FINISH_NODE_ROW, FINISH_NODE_COL] = [exit.x, exit.y];
      }
        break;
      case 'Recursive Maze':
      {
        const grid = this.state.grid;
        recursiveDivisionMaze(grid, 2, rowsNum - 3, 2, colsNum - 3, "horizontal", false);
        this.setState({grid: grid});
        let entry, exit;
        [entry, exit] = generateStartAndFinishNode(this.state.grid);
        // grid[entry.x][entry.y].isStart = true;
        // grid[exit.x][exit.y].isFinish = true;
        [START_NODE_ROW, START_NODE_COL] = [entry.x, entry.y];
        [FINISH_NODE_ROW, FINISH_NODE_COL] = [exit.x, exit.y];
      }
        break;
      default:
        break;
      }
    }
    )
  }

  async resetGrid() {
    const newGrid = getInitialGrid();
    await this.setState({grid: newGrid}, () => console.log('Reset Grid!'));
    [START_NODE_ROW, START_NODE_COL] = [-1, -1];
    [FINISH_NODE_ROW, FINISH_NODE_COL] = [-1, -1];
    for (let row = 0; row < rowsNum; row++) {
      for (let col = 0; col < colsNum; col++) {
        const node = this.state.grid[row][col];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node';
      }
    }
    // console.log('reset finished!');
  }

  clearPath() {
    for (let row = 0; row < rowsNum; row++) {
      for (let col = 0; col < colsNum; col++) {
        const node = this.state.grid[row][col];
        if (node.isWall) continue;
        if (node.isWeighted) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-weighted';
          continue;
        }
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-start';
          continue;
        }
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-finish';
          continue}
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node';
      }
    }
  }

  setSpeed(speed) {
    this.setState({speed: speed}, () => {switch(this.state.speed) 
      {
      case 'Fast':
        timeoutPara = 10;
        break;
      case 'Average':
        timeoutPara = 25;
        break;
      case 'Slow':
        timeoutPara = 50;
        break;
      default:
        break;
      }
    }
    )
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

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  async animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    await this.animateVisited(visitedNodesInOrder);
    setTimeout(() => {
      this.animateShortestPath(nodesInShortestPathOrder);
    }, timeoutPara * visitedNodesInOrder.length);
    return;
  }

  animateVisited(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.isWeighted) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-weighted-visited';
        }
        else document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, timeoutPara * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.isWeighted) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-weighted-path';
        }
        else document.getElementById(`node-${node.row}-${node.col}`).className =
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

  async visualize() {
    console.log(this.state);
    // no algorithm is chosen
    if (this.state.algo === null) {
      alert("Please select a algorithm to visualize!")
      return;
    }
    const {grid} = this.state;
    if (START_NODE_ROW === -1 || START_NODE_COL === -1 || FINISH_NODE_ROW === -1 || FINISH_NODE_COL === -1) {
      alert("Please select a start node and target node!");
      return;
    }
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;
    switch(this.state.algo) {
      case 'Depth-first Search':
        visitedNodesInOrder = await dfs(grid, startNode, finishNode);
        // console.log(visitedNodesInOrder);
        break;
      case 'Breadth-first Search':
        visitedNodesInOrder = await bfs(grid, startNode, finishNode);
        // console.log(visitedNodesInOrder);
        break;
      case 'Greedy Best-first Search':
        visitedNodesInOrder = await greedySearch(grid, startNode, finishNode);
        // console.log(visitedNodesInOrder);
        break;
      case "Dijkstra's Algorithm":
        visitedNodesInOrder = await dijkstra(grid, startNode, finishNode);
        // console.log(visitedNodesInOrder);
        break;
      case 'A* Search':
        visitedNodesInOrder = await astarSearch(grid, startNode, finishNode);
        // console.log(visitedNodesInOrder);
        break; 
      default:
        break
    }
    // await delay(100);
    const nodesInShortestPathOrder = await this.getNodesInShortestPathOrder(finishNode);
    
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
        <div className="App">
          Visualizing {this.state.algo}!
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

/* Help functions */

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < rowsNum; row++) {
    const currentRow = [];
    for (let col = 0; col < colsNum; col++) {
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

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function generateStartAndFinishNode(grid) {
  const entry = {x: getRandom(rowsNum), y: getRandom(colsNum)};
  const exit = {x: -2, y: -2};
  do {
    exit.x = getRandom(rowsNum);
    exit.y = getRandom(colsNum);
    entry.x = getRandom(rowsNum);
    entry.y = getRandom(colsNum);
    // console.log(exit.x, exit.y, entry.x, entry.y);
  } while (
    (exit.x === entry.x && exit.y === entry.y) ||
    grid[entry.x][entry.y].isWall ||
    grid[exit.x][exit.y].isWall
  );
  grid[entry.x][entry.y].isStart = true;
  grid[exit.x][exit.y].isFinish = true;
  return [entry, exit];
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
