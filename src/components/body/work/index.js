import React, { useState, useEffect } from 'react';
import './work.css';

function Work() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const githubUsername = 'pentestguy'; 

    // 1. Define the EXACT names of the repositories you want to showcase
    // They will render on your site in the exact order you list them here!
    const featuredRepoNames = [
        'MobSF-Automation',
        'Vulnerable-Dependencies',
        'lazynap',
        'Email-Spoofer-and-Bomber'
    ];

    useEffect(() => {
        const fetchSpecificRepos = async () => {
            try {
                setLoading(true);
                
                // 2. Map through your list and fetch each repository individually
                const promises = featuredRepoNames.map(repoName => 
                    fetch(`https://api.github.com/repos/${githubUsername}/${repoName}`)
                        .then(response => {
                            // If a repo is private or misspelled, return null instead of breaking the app
                            return response.ok ? response.json() : null;
                        })
                        .catch(() => null)
                );

                // 3. Wait for all requests to finish simultaneously
                const results = await Promise.all(promises);
                
                // 4. Filter out any null values (in case a repo name was typed incorrectly)
                const validRepos = results.filter(repo => repo !== null);

                if (validRepos.length === 0) {
                    throw new Error('No public repositories found matching the provided names.');
                }

                setProjects(validRepos);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Unable to load featured projects at the moment.');
                setLoading(false);
            }
        };

        fetchSpecificRepos();
    }, [githubUsername]);

    return (
        <section className="work-section" id="projects">
            <div className="section-header">
                <h2 className="section-title">Featured <span className="highlight-green">Projects</span></h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">Open-source security tools, scripts, and research repositories.</p>
            </div>

            {loading && (
                <div className="work-status">
                    <div className="loading-pulse"></div>
                    <p>Loading featured repositories from GitHub...</p>
                </div>
            )}

            {error && <div className="work-status error-text">{error}</div>}

            {!loading && !error && (
                <div className="projects-grid">
                    {projects.map((repo, index) => (
                        <a 
                            key={repo.id} 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="project-card"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="card-top">
                                <div className="project-icons">
                                    <span className="folder-icon">📁</span>
                                    <span className="external-link-icon">↗</span>
                                </div>
                                <h3 className="project-title">{repo.name}</h3>
                                <p className="project-description">
                                    {repo.description || 'Security research and automation repository.'}
                                </p>
                            </div>

                            <div className="card-bottom">
                                {repo.language && (
                                    <div className="project-tech">
                                        <span className="tech-dot"></span>
                                        <span>{repo.language}</span>
                                    </div>
                                )}
                                <div className="project-metrics">
                                    <span>⭐ {repo.stargazers_count}</span>
                                    <span>🍴 {repo.forks_count}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Work;