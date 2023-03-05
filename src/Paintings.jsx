import React, { useState, useEffect } from "react";

function Paintings() {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/paintings")
            .then(res => res.json())
            .then(data => setPaintings(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {paintings.map(painting => (
                <div key={painting._id}>
                    <h3>{painting.title}</h3>
                    <p>{painting.paintingType}</p>
                    <img src={painting.src} alt={painting.title} />
                </div>
            ))}
        </div>
    );
}

export default Paintings;
