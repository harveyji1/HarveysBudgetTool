import { useState } from "react";
import "./NavBar.css";

interface NavBarProps {
    navItems: string[];
  }
  
  function NavBar({ navItems }: NavBarProps) {
  
    const [selectedIndex, setSelectedIndex] = useState(-1);
  
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
        <div className="navbar-elements-container">
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div
            className="collapse
           navbar-collapse"
          id="navbarSupportedContent">
            <div className="navbar-nav">
              {navItems.map((items, index) => (
                <li
                  key={items}
                  className="nav-item"
                  onClick={() => setSelectedIndex(index)}
                >
                  <a
                    className={
                      selectedIndex == index
                        ? "nav-link active fw-bold"
                        : "nav-link"
                    }
                    href="#"
                  >
                    {items}
                  </a>
                </li>
              ))}
            </div>
            {/* <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    );
  }
  
  export default NavBar;