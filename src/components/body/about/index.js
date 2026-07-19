import React from 'react';

import "./about.css";

function About() {
    return (
            <div className='about'>
            <div className='about-top'>
                <div className='about-info'>
                   <p className='intro-line animate-step-1'>Hi, I am</p>
                    <h1 className='info-name animate-step-2'>Pentest Guy</h1>
                    <p className='info-bio animate-step-3'>
                        I love to test Security <span className='divider'>|</span> InfoSec Speaker <span className='divider'>|</span> Blogger
                    </p>
                </div>
                <div className='about-photo'>
                    <img 
                    src={require("../../../assets/hacker.png")} 
                    className='picture' alt='hacker' />
                </div>
            </div>
        </div>
    )
}

export default About
