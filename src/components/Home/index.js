import React from "react";

import LayoutWrapper from "../LayoutWrapper";
// import logo from '../../team-logo.png';

export function Home() {
    return (
        <div className="body-content">
            <div>REACT CRUD Assignment</div>
            {/* <img src={logo} className="team-logo" alt="logo" /> */}
            <p>
                CRUD example of Contest and Teams
            </p>
            {/*<a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*>*/}
            {/*    Learn React*/}
            {/*</a>*/}
        </div>
    )
}

const WrappedHome = LayoutWrapper(Home);
export default WrappedHome;