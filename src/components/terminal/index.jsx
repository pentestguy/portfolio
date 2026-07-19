import React, { useState, useEffect, useRef } from 'react';
import './terminal.css';

// 1. Dedicated Sub-component for simulating fast terminal text streaming
function TypewriterText({ text, speed = 10, onComplete, onStep }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
                // Trigger scroll sync every 5 characters to keep up with text wrapping
                if (index % 5 === 0 && onStep) {
                    onStep();
                }
            } else {
                clearInterval(timer);
                if (onComplete) {
                    onComplete();
                }
                if (onStep) {
                    onStep();
                }
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
}

function Terminal() {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const [isReady, setIsReady] = useState(false); // Controls when the user can type
    const inputRef = useRef(null);
    const terminalBodyRef = useRef(null);

    // Auto-scroll ONLY inside the terminal container, preventing whole-page jumps
    const scrollToBottom = () => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTo({
                top: terminalBodyRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isReady]);

    // Introductory Animation Sequence
    useEffect(() => {
        const timeouts = [];
        const aboutMeText = "Shubham Nagdive is an Application Security and DevSecOps leader with 7+ years of experience protecting high-stakes infrastructure for top East African banks and major iGaming platforms. From executing complex VAPT assessments across web, mobile, and APIs to spearheading AI-powered DevSecOps products, he bridges the gap between deep offensive security and scalable, automated defense.";

        // 1. Show system initialization
        timeouts.push(setTimeout(() => {
            setHistory(prev => [...prev, { type: 'system', text: '[Terminal Initializing... Complete in 2.1s]' }]);
        }, 400));

        // 2. Simulate typing the cat command
        timeouts.push(setTimeout(() => {
            setHistory(prev => [...prev, { type: 'command', text: 'whoami' }]);
        }, 1200));

        // 3. Output the about_me.txt text block with the live streaming effect
        timeouts.push(setTimeout(() => {
            setHistory(prev => [
                ...prev,
                { 
                    type: 'output', 
                    content: (
                        <div className="about-me-output">
                            <p>
                                <TypewriterText 
                                    text={aboutMeText} 
                                    speed={10} // 10ms per char = fast, realistic terminal stream
                                    onStep={scrollToBottom}
                                    onComplete={() => setIsReady(true)} // Unlocks prompt instantly when typing ends
                                />
                            </p>
                        </div>
                    ) 
                }
            ]);
        }, 2000));

        return () => timeouts.forEach(t => clearTimeout(t));
    }, []);

    // Keep focus on the input without jumping the page scroll
    useEffect(() => {
        if (isReady && inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    }, [isReady]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            const cmd = input.trim();
            const newHistory = [...history, { type: 'command', text: cmd }];
            
            // Custom command logic
            if (cmd.toLowerCase() === 'clear') {
                setHistory([]);
            } else if (cmd.toLowerCase() === 'help') {
                // Updated help list to include the new 'contact' command
                newHistory.push({ type: 'output', content: <p>Available commands: help, clear, whoami, blog, contact</p> });
                setHistory(newHistory);
            } else if (cmd.toLowerCase() === 'whoami') {
                const aboutMeText = "Shubham Nagdive is an Application Security and DevSecOps leader with 7+ years of experience protecting high-stakes infrastructure for top East African banks and major iGaming platforms. From executing complex VAPT assessments across web, mobile, and APIs to spearheading AI-powered DevSecOps products, he bridges the gap between deep offensive security and scalable, automated defense.";
                newHistory.push({ 
                    type: 'output', 
                    content: (
                        <div className="about-me-output">
                            <p><TypewriterText text={aboutMeText} speed={10} onStep={scrollToBottom} /></p>
                        </div>
                    ) 
                });
                setHistory(newHistory);
            } else if (cmd.toLowerCase() === 'blog') {
                // Added blog command with clickable link
                newHistory.push({ 
                    type: 'output', 
                    content: (
                        <p>
                            Visit <a href="https://pentestguy.com" target="_blank" rel="noopener noreferrer" style={{ color: '#7cfc00', textDecoration: 'underline' }}>https://pentestguy.com</a>
                        </p>
                    ) 
                });
                setHistory(newHistory);
            } else if (cmd.toLowerCase() === 'contact') {
                // Added contact command with clickable mailto link
                newHistory.push({ 
                    type: 'output', 
                    content: (
                        <p>
                            Contact me on <a href="mailto:contact@pentestguy.com" style={{ color: '#7cfc00', textDecoration: 'underline' }}>contact@pentestguy.com</a>
                        </p>
                    ) 
                });
                setHistory(newHistory);
            } else {
                newHistory.push({ type: 'output', content: <p>bash: command not found: {cmd}. Type 'help' for options.</p> });
                setHistory(newHistory);
            }
            setInput('');
        }
    };

    return (
        <div className="terminal-window" onClick={() => isReady && inputRef.current?.focus({ preventScroll: true })}>
            <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">pentestguy - Terminal</span>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
                {history.map((item, index) => (
                    <div key={index} className="terminal-line">
                        {item.type === 'system' && <div className="system-text">{item.text}</div>}
                        {item.type === 'command' && (
                            <div className="command-line">
                                <span className="prompt">guest@pentestguy:~$</span>
                                <span className="cmd-text">{item.text}</span>
                            </div>
                        )}
                        {item.type === 'output' && <div className="output-text">{item.content}</div>}
                    </div>
                ))}
                
                {/* Active prompt only renders AFTER the bio finishes typing */}
                {isReady ? (
                    <div className="command-line active-prompt">
                        <span className="prompt">guest@pentestguy:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="terminal-input"
                        />
                    </div>
                ) : (
                    <div className="loading-cursor">_</div>
                )}
            </div>
        </div>
    );
}

export default Terminal;