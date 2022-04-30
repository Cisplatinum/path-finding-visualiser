import React, {Component} from 'react';
import './Legend.css';

class Legend extends Component {
  render() {
    return (
      <ul className="legend-menu">
        <li className="legend-item">
          <div className="node-start" />{' '}
          <div className="legend-note">Start Node</div>
        </li>
        <li className="legend-item">
          <div className="node-target" />{' '}
          <div className="legend-note">Target Node</div>
        </li>
        <li className="legend-item">
          <div className="node-wall" />{' '}
          <div className="legend-note">Wall Node</div>
        </li>
        <li className="legend-item">
          <div className="node-weight" />{' '}
          <div className="node-weight-visited" />{' '}
          <div className="legend-note">Weighted Node</div>
        </li>
        <li className="legend-item">
          <div className="node-visit" />{' '}
          <div className="legend-note">Visited Node</div>
        </li>
        <li className="legend-item">
          <div className="node-path" /> <div className="node-path-weighted" />{' '}
          <div className="legend-note">Shortest-path Node</div>
        </li>
        <li className="legend-item">
          <div className="node-unvisited" />{' '}
          <div className="legend-note">Unvisited Node</div>
        </li>
      </ul>
    );
  }
}

export default Legend;
