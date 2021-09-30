import React, { Component } from 'react'
import white_logo from './white-png.png';
import black_logo from './black_logo.svg';
import { Link } from 'react-router-dom';
// import white_logo from './white-logo.svg';
export default class NavBar extends Component {
    render() {
        return (
            <div className="nav-bar">

                {/*Start Logo */}
                <div className="logo-nav">
                <a href="http://localhost:3000/trackvac-api/home">
                        <img src="../images/white png logo.png" alt="TrackVac logo" width="150rem" />
                    </a>
                </div>
                {/*End Logo */}



              <a href="http://localhost:3000/trackvac-api/home">
                  Home
              </a>



                <Link to="/reviews"> <a >Reviews</a></Link>

                <Link to="/questions"> <a >Questions</a></Link>





            </div>
        )
    }
}
