import { useState } from "react";
import "./NavBar.css";
import { Nav } from "react-bootstrap";
 
  function NavBar() {
  
    const [selectedIndex, setSelectedIndex] = useState(-1);
  
    return (
      <nav className="navbar navbar-expand-md navbar-light shadow">
        <div>
          <h6 className="workInProgressMessage">THIS IS A WORK IN PROGRESS, SOME FUNCTIONS MAY NOT OPERATE PROPERLY</h6>
        </div>
        <div className="navbar-elements-container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Nav.Link href="#calculator" className={selectedIndex === 0 ? 'active navbar-link' : 'navbar-link'} onClick={() => setSelectedIndex(0)}>Calculator</Nav.Link>
            <Nav.Link href="#aiSuggestions" className={selectedIndex === 1 ? 'active navbar-link' : 'navbar-link'} onClick={() => setSelectedIndex(1)}>AI Suggestions</Nav.Link>
            <Nav.Link href="#contact" className={selectedIndex === 2 ? 'active navbar-link' : 'navbar-link'} onClick={() => setSelectedIndex(2)}>Contact</Nav.Link>
          </div>
        </div>
      </nav>
    );
  }
  
  export default NavBar;