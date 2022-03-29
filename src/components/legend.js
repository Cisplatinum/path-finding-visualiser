import React, {Component} from 'react';
import Node from '../PathfindingVisualiser/Node/Node';
import './Legend.css';

class Legend extends Component {
  render() {
    return (
      <ul className="legend-menu">
        <li className="legend-item">
          <Node /> <div className="legend-note">Start Node</div>
        </li>
        <li className="legend-item">
          <Node /> <div className="legend-note">Target Node</div>
        </li>
        <li className="legend-item">
          <Node /> <div className="legend-note">Wall Node</div>
        </li>
        <li className="legend-item">
          <Node /> <div className="legend-note">Weighted Node</div>
        </li>
        <li className="legend-item">
          <Node /> <div className="legend-note">Unvisited Node</div>
        </li>
        <li className="legend-item">
          <Node /> <div className="legend-note">Visited Node</div>
        </li>
        <li className="legend-item">
          <Node /> <div className="legend-note">Shortest-path Node</div>
        </li>
      </ul>
    );
  }
}

export default Legend;
