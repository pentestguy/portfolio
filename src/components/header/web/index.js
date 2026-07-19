import React from 'react'
import "./web.css"
export default function web() {
    return (
        <div className="web">
            <div className="web-option">
                <a href="https://pentestguy.com/">
                <i class="fi fi-rr-edit-alt option-icon"></i>Blog
                </a>
            </div>
            <div className="web-option">
                <a href="#projects">
                <i class="fi fi-rr-briefcase option-icon"></i>Projects
                </a>
            </div>
            <div className="web-option">
                <a href="https://pentestguy.com/contact-us/">
                <i class="fi fi-rr-user option-icon"></i>Contact
                </a>
            </div>
        </div>
    )
}
