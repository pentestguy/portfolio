import React from 'react';
import SocialContact from '../../common/social-contact';
import "./about.css";

function About() {
    return (
            <div className='about'>
            <div className='about-top'>
                <div className='about-info'>
                    Hi, I am 
                    <br /><span className='info-name'><b>Pentest Guy</b></span>
                   <br /> I love to test Security, InfoSec Speaker, Blogger.
                </div>
                <div className='about-photo'>
                    <img 
                    src={require("../../../assets/hacker.png")} 
                    className='picture' alt='hacker' />
                </div>
            </div>
            <div className='about-bottom'>
                <SocialContact />
            </div>
        </div>
    )
}

export default About
