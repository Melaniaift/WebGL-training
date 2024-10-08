import React from 'react'
import { useParams } from 'react-router-dom';

export const Product = () => {
    const params = useParams();
    console.error(params)

    return (
        <div>
            <h1>Product detail {params}</h1>
        </div>
    )
}
