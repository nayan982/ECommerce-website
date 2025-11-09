import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import CategorySection from '../components/CategorySection'
import Footer from '../components/Footer'
import FeaturedCardSection from '../components/FeaturedCardSection'
import { Helmet } from 'react-helmet'

const Home = () => {

  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Online electronics store."></meta>
          <title>Electro</title>
        </Helmet>
      <Slider />
      <FeaturedCardSection/>
      <CategorySection/>
    </>
  )
}

export default Home