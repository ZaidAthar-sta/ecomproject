import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import LatestCollections from '../../components/Collections/LatestCollections';
import "./Home.css"
import Hero from '../../components/Hero/Hero';

const Home = () => {
     return (
          <div className='container' >

               <Hero />
               <LatestCollections />

          </div>
     )
}

export default Home
