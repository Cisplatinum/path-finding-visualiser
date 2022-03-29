import React, {Component} from 'react';
// import {MenuItems} from './MenuItemsNav';
import {Button} from '../Button';
import DropdownAlgo from '../DropdownAlgo';
import DropdownMaze from '../DropdownMaze';
import DropdownSpeed from '../DropdownSpeed';
import './Navbar.css';

class Navbar extends Component {
  state = {
    clicked: false,
    dropdownAlgo: false,
    dropdownMaze: false,
    dropdownSpeed: false,
  };

  handleClick = () => {
    this.setState({clicked: !this.state.clicked});
  };
  handleDropdownAlgo = () => {
    this.setState({
      dropdownAlgo: !this.state.dropdownAlgo,
      dropdownMaze: false,
      dropdownSpeed: false,
    });
  };

  handleDropdownMaze = () => {
    this.setState({
      dropdownAlgo: false,
      dropdownMaze: !this.state.dropdownMaze,
      dropdownSpeed: false,
    });
  };

  handleDropdownSpeed = () => {
    this.setState({
      dropdownAlgo: false,
      dropdownMaze: false,
      dropdownSpeed: !this.state.dropdownSpeed,
    });
  };

  // onMouseEnter = () => {
  //   this.setState({dropdown: true});
  // };

  // onMouseLeave = () => {
  //   this.setState({dropdown: false});
  // };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          Path Finding Visualizer
          {/* <i className="fab fa-react"></i>{' '} */}
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          <li
            className="nav-item"
            // onMouseEnter={this.onMouseEnter}
            // onMouseLeave={this.onMouseLeave}
          >
            <div className="nav-links" onClick={this.handleDropdownAlgo}>
              Algorithms <i className="fas fa-caret-down" />
            </div>
            {this.state.dropdownAlgo && <DropdownAlgo />}
          </li>

          <li className="nav-item">
            <div className="nav-links" onClick={this.handleDropdownMaze}>
              Mazes <i className="fas fa-caret-down" />
            </div>
            {this.state.dropdownMaze && <DropdownMaze />}
          </li>

          <li className="nav-item">
            <div className="nav-links">Clear Board</div>
          </li>

          <li className="nav-item">
            <div className="nav-links">Clear Path</div>
          </li>

          <li className="nav-item">
            <div className="nav-links" onClick={this.handleDropdownSpeed}>
              Speed <i className="fas fa-caret-down" />
            </div>
            {this.state.dropdownSpeed && <DropdownSpeed />}
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
        <Button>Visualize</Button>
      </nav>
    );
  }
}

export default Navbar;
