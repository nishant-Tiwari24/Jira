import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <ul className="nav-links">
      <li>
        <Link to="/">
          <i className="fas fa-home" />
          <span className="navlink">Home</span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <i className="fas fa-calendar-check" />
          <span className="navlink">To-do</span>
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <i className="fas fa-graduation-cap" />
          <span className="navlink">All Project</span>
        </Link>
      </li>
      <li>
        <Link href="/">
          <i className="fas fa-cog" />
          <span className="navlink">Settings</span>
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
