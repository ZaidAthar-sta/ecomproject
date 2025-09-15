import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import LatestCollections from '../../components/Collections/LatestCollections';
import "./Home.css"
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';

const Home = () => {
     return (
          <div className='home-section' >

               <Hero />
               <Categories />
               <LatestCollections />

          </div>
     )
}

export default Home
