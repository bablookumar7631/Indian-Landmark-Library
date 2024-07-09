import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './DetailPage.css'


const DetailPage = () => {
  const { id } = useParams(); // Retrieve the state ID from URL parameter
  const [monumentDetail, setMonumentDetail] = useState({});


  useEffect(() => {
    fetch(`http://localhost:8000/monumentDetail/${id}`) // Use the state ID in the fetch URL
      .then((response) => response.json())
      .then((data) => setMonumentDetail(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]); // Add id to the dependency array to re-fetch data when id changes

  return (
    <div className="detail-page">
      <h1>{monumentDetail.name}, {monumentDetail.place}</h1>
      <div className='leftRight'>
        <div className='left'>
          {/* <p>{monumentDetail.desc}</p> */}
          <div dangerouslySetInnerHTML={{ __html: monumentDetail.desc }} />
        </div>
        <div className="right">
        <img className="state-img" src={monumentDetail.Img} alt={monumentDetail.name} />
        <h3>{monumentDetail.name}</h3>
        <p><span>Location : </span>{monumentDetail.place}</p>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
