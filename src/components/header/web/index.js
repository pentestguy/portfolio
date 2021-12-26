import React from 'react'
import "./web.css"
export default function web() {
    return (
        <div className="web">
            <div className="web-option">
                <a href="#Blog">
                <i class="fi fi-rr-edit-alt option-icon"></i>Blog
                </a>
            </div>
            <div className="web-option">
                <a href="#skills">
                <i class="fi fi-rr-laptop option-icon"></i>Skills
                </a>
            </div>
            <div className="web-option">
                <a href="#work">
                <i class="fi fi-rr-briefcase option-icon"></i>Work
                </a>
            </div>
            <div className="web-option">
                <a href="#contact">
                <i class="fi fi-rr-user option-icon"></i>Contact
                </a>
            </div>
        </div>
    )
}
