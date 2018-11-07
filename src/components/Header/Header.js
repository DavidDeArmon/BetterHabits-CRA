import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Dashboard.scss";
import logo from '../../DavidsIconWhite.svg'

class Header extends React.Component {  
  render() {
    return (
        <div className="dashboardHeader">
          <img id='icon' src={logo} alt='logo'/>
          <Link className="Link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="Link" to="/moods">
            Moods
          </Link>
          <Link className="Link" to="/habits">
            Habits
          </Link>
        </div>
    
    );
  }
}
export default Header