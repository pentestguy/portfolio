import React from 'react';
import About from './about/index';
import Contact from './contact';
import Skills from './skills';
import Work from './work';
import "./body.css";

function Body() {
    return (
        <div className='body'>
            <section id="about">
                <About />
            </section>
            <section className='skills'>
                <Skills />
            </section>
            <section id="work">
                <Work />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </div>
    )
}

export default Body
