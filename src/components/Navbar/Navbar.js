import React, {useState} from 'react';
// import {MenuItems} from './MenuItemsNav';
import {Button} from '../Button';
import './Navbar.css';
import {MenuItemsAlgo} from '../MenuItemsDropdownAlgo';
import {MenuItemsMaze} from '../MenuItemsDropdownMaze';
import {MenuItemsSpeed} from '../MenuItemsDropdownSpeed';
import '../Dropdown.css';

function Navbar({startViz, setAlgo, setMaze, setSpeed, resetGrid, clearPath}) {
  const [click, setClick] = useState(false);
  const [dropdownAlgo, setDropdownAlgo] = useState(false);
  const [dropdownMaze, setDropdownMaze] = useState(false);
  const [dropdownSpeed, setDropdownSpeed] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const handleDropdownAlgo = () => {
    setDropdownAlgo(!dropdownAlgo);
    setDropdownMaze(false);
    setDropdownSpeed(false);
  };

  const handleDropdownMaze = () => {
    setDropdownAlgo(false);
    setDropdownMaze(!dropdownMaze);
    setDropdownSpeed(false);
  };

  const handleDropdownSpeed = () => {
    setDropdownAlgo(false);
    setDropdownMaze(false);
    setDropdownSpeed(!dropdownSpeed);
  };

  // const handleButtonClicked = () => {
  //   PathfindingVisualizer.visualizeDijkstra();
  // };

  // onMouseEnter = () => {
  //   this.setState({dropdown: true});
  // };

  // onMouseLeave = () => {
  //   this.setState({dropdown: false});
  // };

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        Path Finding Visualizer
        {/* <i className="fab fa-react"></i>{' '} */}
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li
          className="nav-item"
          // onMouseEnter={this.onMouseEnter}
          // onMouseLeave={this.onMouseLeave}
        >
          <div className="nav-links" onClick={handleDropdownAlgo}>
            Algorithms <i className="fas fa-caret-down" />
          </div>
          {dropdownAlgo && <DropdownAlgo setAlgo={setAlgo} />}
        </li>

        <li className="nav-item">
          <div className="nav-links" onClick={handleDropdownMaze}>
            Mazes <i className="fas fa-caret-down" />
          </div>
          {dropdownMaze && <DropdownMaze setMaze={setMaze} />}
        </li>

        <li className="nav-item">
          <div className="nav-links" onClick={resetGrid}>
            Clear Board
          </div>
        </li>

        <li className="nav-item">
          <div className="nav-links" onClick={clearPath}>
            Clear Path
          </div>
        </li>

        <li className="nav-item">
          <div className="nav-links" onClick={handleDropdownSpeed}>
            Speed <i className="fas fa-caret-down" />
          </div>
          {dropdownSpeed && <DropdownSpeed setSpeed={setSpeed} />}
        </li>

        {/* {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })} */}
      </ul>
      <Button onClick={() => startViz()}>Visualize</Button>
    </nav>
  );
}

export default Navbar;

function DropdownAlgo({setAlgo}) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {MenuItemsAlgo.map((item, index) => {
          return (
            <li key={index}>
              <div className={item.cName} onClick={() => setAlgo(item.title)}>
                {item.title}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function DropdownMaze({setMaze}) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {MenuItemsMaze.map((item, index) => {
          return (
            <li key={index}>
              <div className={item.cName} onClick={() => setMaze(item.title)}>
                {item.title}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function DropdownSpeed({setSpeed}) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {MenuItemsSpeed.map((item, index) => {
          return (
            <li key={index}>
              <div className={item.cName} onClick={() => setSpeed(item.title)}>
                {item.title}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
