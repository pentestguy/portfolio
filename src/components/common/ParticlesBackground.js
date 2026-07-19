import React from "react";
// Notice the updated import names below:
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function ParticlesBackground() {
    const particlesInit = async (engine) => {
        await loadSlim(engine);
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 140, links: { opacity: 0.8, color: "#7cfc00" } },
                    },
                },
                particles: {
                    color: { value: "#000000" },
                    links: { color: "#000000", distance: 150, enable: true, opacity: 0.25, width: 1 },
                    move: { enable: true, speed: 1.2 },
                    number: { value: 50 },
                    opacity: { value: 0.4 },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            }}
        />
    );
}

export default ParticlesBackground;