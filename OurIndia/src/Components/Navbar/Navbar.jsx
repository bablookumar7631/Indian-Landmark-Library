import React from 'react'
import './Navbar.css'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className='nav-outer'>
        <div className="navbar-left">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/monument">Monument</NavLink></li>
            </ul>
        </div>

        <div className="navbar-right">
            <div className="search">
                <input className='search-in' type="search" placeholder='Search...' />
                <button className='search-icon'>&#x1F50D;</button>
            </div>
            <Link to="/login">
              <button className='login-btn'>Login</button>
            </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
