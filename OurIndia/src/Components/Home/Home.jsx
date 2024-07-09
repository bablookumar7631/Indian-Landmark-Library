import React from 'react'
import './Home.css'
import Slider from './CardSlider/Slider';
import IndianMap from '../../assets/images/Indian-map.png';

const Home = () => {
  return (
    <>
      <div className="homePage">
        <div className="home-inner">
          <div className="home-left">
            <img className='india-img' src={IndianMap} alt="Taj Mahal" />
          </div>
          <div className="home-right">
            <p>India is a land of diverse states, each boasting unique cultural heritage and magnificent monuments. From ancient temples to medieval forts, and from Mughal palaces to colonial landmarks, India's architectural marvels reflect its rich history and artistic prowess. These monuments are not just symbols of architectural excellence but also repositories of stories and traditions passed down through generations. They stand as testament to India's glorious past and continue to inspire awe and admiration among visitors from around the world. Whether it's the intricate carvings of temples, the grandeur of palaces, or the imposing forts perched on hillsides, every monument in India tells a tale of bygone eras, inviting travelers to unravel the mysteries of this enchanting land.</p>
          </div>
        </div>
      </div>


      <Slider />
    </>
  )
}

export default Home
