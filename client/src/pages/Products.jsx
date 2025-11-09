import React from 'react'
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard'
import { useLocation, Navigate } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { useState } from 'react';
const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  // if no query -> redirect to home
  if (!category) {
    return <Navigate to="/" replace />;
  }
  const toggleFilterMenu = () => {
    setfilteIsOpen(!filterIsOpen);
  };
  const [filterIsOpen, setfilteIsOpen] = useState(false)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Product display page for product by filter and category."></meta>
        <title>Product Page</title>
      </Helmet>
      <div className="relative bg-white px-6 py-2">
        <div className="fiter text-[24px] relative cursor-pointer flex items-center gap-2 md:hidden" aria-label="filter" onClick={toggleFilterMenu}>
          <IoFilter /> <span>Filter</span>
        </div>
        {filterIsOpen && <div className='absolute shadow-[0_0_25px_rgba(0,0,0,0.2)] '><Filter /></div>}
      </div>
      {/* <div className='block z-10  md:hidden'>
        <Filter />
        </div> */}
      <div className='flex gap-7 '>

        <div className='block max-md:hidden'>
          <Filter />
        </div>
        <ProductCard />
      </div>
    </>
  )
}

export default Products
