import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

export const Products = () => {

    const [searchParams] = useSearchParams();
    const location = useLocation();
    console.log(searchParams, location);


  return (
    <div className='component'>ProductList</div>
  )
}
