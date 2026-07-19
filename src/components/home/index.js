import React from 'react';
import "./home.css";
import Header from "../header/index";
import Body from "../body/index";
import Footer from "../footer/index";
import Terminal from "../terminal/index";
import ParticlesBackground from "../common/ParticlesBackground";
import SocialContact from '../common/social-contact';
import Work from '../body/work/index';

function index() {
    return (
        <div className="home">
            <ParticlesBackground />
            <div>
                <Header />
            </div>
            <div>
                <Body />
            </div>
            <div className="terminal-section">
                <Terminal />
            </div>
            <div>
                <Work />
            </div>
             <div className='about-bottom'>
                <SocialContact />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default index
