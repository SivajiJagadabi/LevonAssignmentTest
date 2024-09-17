import React, { useState, useEffect } from 'react';
import './index.css';

const TrafficLight = () => {
    const [currentLight, setCurrentLight] = useState('green');
    const [pedestrianRequested, setPedestrianRequested] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
     
        const lightDurations = {
            green: 10,
            yellow: 3,
            red: 7
        };

     
        const handleLightChange = () => {
            if (pedestrianRequested && currentLight === 'green') {
                setCurrentLight('red');
                setPedestrianRequested(false);
            } else {
                const nextLight = currentLight === 'green' ? 'yellow' :
                                  currentLight === 'yellow' ? 'red' : 'green';
                setCurrentLight(nextLight);
            }
        };

    
        setCountdown(lightDurations[currentLight]);

        const countdownInterval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown > 1) {
                    return prevCountdown - 1;
                } else {
         
                    handleLightChange();
                    return lightDurations[currentLight];
                }
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [currentLight, pedestrianRequested]);

    return (
        <div className="traffic-light-container">
            <div className="lights-container">
                <div className={`light ${currentLight === 'green' ? 'green-light' : ''}`}></div>
                <div className={`light ${currentLight === 'yellow' ? 'yellow-light' : ''}`}></div>
                <div className={`light ${currentLight === 'red' ? 'red-light' : ''}`}></div>
            </div>
            <div className="controls">
                <div className="countdown">Time: {countdown}s</div>
                <button className="button" onClick={() => setPedestrianRequested(true)}>Pedestrian Request</button>
                <button className="button emergency" onClick={() => setCurrentLight('red')}>Emergency Override</button>
            </div>
        </div>
    );
};

export default TrafficLight;
