import React, {useState} from 'react';
import {MenuItems} from './MenuItemsDropdownSpeed';
import './Dropdown.css';

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <div className={item.cName} onClick={() => setClick(false)}>
                {item.title}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
