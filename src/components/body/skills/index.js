import React, { useState, useEffect } from 'react';
import './youtube.css';

function YouTube() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Add the specific YouTube Video IDs you want to feature on your site.
    // Example: For "https://www.youtube.com/watch?v=dQw4w9WgXcQ", the ID is "dQw4w9WgXcQ"
    const featuredVideoIds = [
        'ADEfA_EtIE0',
        'xDotz4iOVNQ',
        'Cc7i3ba5G7A'
    ];

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                setLoading(true);
                
                // Uses the free noembed service to fetch title and author automatically from the video ID
                const promises = featuredVideoIds.map(id => 
                    fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`)
                        .then(response => response.ok ? response.json() : null)
                        .then(data => {
                            if (!data || data.error) return null;
                            return {
                                id: id,
                                title: data.title,
                                author: data.author_name || 'YouTube Video',
                                // Fetches YouTube's crisp high-resolution default thumbnail
                                thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                                url: `https://www.youtube.com/watch?v=${id}`
                            };
                        })
                        .catch(() => null)
                );

                const results = await Promise.all(promises);
                const validVideos = results.filter(video => video !== null);

                if (validVideos.length === 0) {
                    throw new Error('No videos found matching the provided IDs.');
                }

                setVideos(validVideos);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching YouTube videos:', err);
                setError('Unable to load featured videos at the moment.');
                setLoading(false);
            }
        };

        fetchVideoData();
    }, []);

    return (
        <section className="youtube-section" id="videos">
            <div className="section-header">
                <h2 className="section-title">Featured <span className="highlight-green">Videos</span></h2>
                <div className="title-underline"></div>
                <p className="section-subtitle">Cybersecurity tutorials, penetration testing walkthroughs, and security research.</p>
            </div>

            {loading && (
                <div className="youtube-status">
                    <div className="loading-pulse"></div>
                    <p>Loading videos from YouTube...</p>
                </div>
            )}

            {error && <div className="youtube-status error-text">{error}</div>}

            {!loading && !error && (
                <div className="videos-grid">
                    {videos.map((video, index) => (
                        <a 
                            key={video.id} 
                            href={video.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="video-card"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="thumbnail-container">
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                                <div className="play-overlay">
                                    <span className="play-icon">▶</span>
                                </div>
                            </div>

                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                <p className="video-author">{video.author}</p>
                            </div>

                            <div className="video-footer">
                                <div className="video-platform">
                                    <span className="youtube-dot"></span>
                                    <span>YouTube</span>
                                </div>
                                <span className="watch-link">Watch Video ↗</span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
}

export default YouTube;