import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/scss/Home.scss';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <nav className={sidebar ? 'navbar__menu active' : 'navbar__menu'}>
        <ul className="navbar__menu__list" onClick={showSidebar}>
          <li className="navbar__menu__list-items active">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar__menu__list-items">
            <Link to="/maps">Maps</Link>
          </li>
          <li className="navbar__menu__list-items">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 319fb0d01e0d17ee6c3668a42c37a518388119d2
