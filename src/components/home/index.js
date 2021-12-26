import React from 'react';
import "./home.css";
import Header from "../header/index";
import Body from "../body/index";
import Footer from "../footer/index";

function index() {
    return (
        <div className="home">
            <div>
                <Header />
            </div>
            <div>
                <Body />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default index
