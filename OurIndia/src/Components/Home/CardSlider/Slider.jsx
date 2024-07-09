import React from 'react'
import './Slider.css'
import tajmahalImage from '../../../assets/images/tajmahal.jpg';
import hawaImage from '../../../assets/images/hawa.jpg';
import templeImage from '../../../assets/images/temple.jpg';
import BuddhaImage from '../../../assets/images/Great_Buddha.jpg';
import JagannathImage from '../../../assets/images/Jagannath_Temple.jpg';


const Slider = () => {
  return (
    <>
      <div className="slide-card">
        <p>Gallery</p>
        <div className="slider-inner">

        <div className="card">
          <img className='card-img' src={tajmahalImage} alt="Taj Mahal" />
        </div>
        <div className="card">
          <img className='card-img' src={hawaImage} alt="Taj Mahal" />
        </div>

        <div className="card">
          <img className='card-img' src={templeImage} alt="Taj Mahal" />
        </div>

        <div className="card">
          <img className='card-img' src={tajmahalImage} alt="Taj Mahal" />
        </div>
        <div className="card">
          <img className='card-img' src={hawaImage} alt="Taj Mahal" />
        </div>
        <div className="card">
          <img className='card-img' src={templeImage} alt="Taj Mahal" />
        </div>

        <div className="card">
          <img className='card-img' src={tajmahalImage} alt="Taj Mahal" />
        </div>
        <div className="card">
          <img className='card-img' src={hawaImage} alt="Taj Mahal" />
        </div>
        <div className="card">
          <img className='card-img' src={templeImage} alt="Taj Mahal" />
        </div>

        <div className="card">
          <img className='card-img' src={BuddhaImage} alt="Taj Mahal" />
        </div>
        <div className="card">
          <img className='card-img' src={JagannathImage} alt="Taj Mahal" />
        </div>

      </div>
    </div>
    </>
  )
}

export default Slider

