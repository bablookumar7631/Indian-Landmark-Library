import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import './Monument.css'

const Monument = () => {

  const [monument, setMonument] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8000/all-monument/')
      .then((response) => response.json())
      .then(data => setMonument(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <div className="all-state">
        <h1 className="state-head">Monuments of India</h1>
        <div className="state-inner">
          {monument.map((monument) => (
            <Link to={`/monumentdetailPage/${monument.id}`} key={monument.id}>
              <div className="state-card">
                <img className="state-img" src={monument.Img} alt={monument.name} />
                <h4><span></span>{monument.name}</h4>
                <h4><span></span>{monument.place}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Monument

