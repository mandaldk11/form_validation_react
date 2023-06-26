import React, { useEffect, useState } from 'react'

export default function AllProducts() {
    const [inputData, setInputData] = useState('')
    const [productData, setProductData] = useState([]);

    const inputHandler = (e) => {
        setInputData(e.target.value.toLowerCase())
    }
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(result => {
                setProductData(result)
            })
    }, []);

    const editHandler = (id) => {
        console.log(id);
        productData.find((element,index)=>{
          if (index === id) {
            return element
          } 
        })
      
    }
    return (
        <div className='container mx-2 my-2'>
            <b>filter products by name and description</b>
            <input type='text' style={{ width: '350px', margin: '10px' }} placeholder='search your product here by name or description ...' onChange={inputHandler} value={inputData} />
            {
                productData.filter((element) => {
                    if (element === '') {
                        return element
                    } else {
                        return (
                            element.title.toLowerCase().includes(inputData) ||
                            element.description.toLowerCase().includes(inputData)
                        )
                    }
                })
                    .map((element) => {
                        return (
                            <>
                                <div key={element.id} class=" d-flex align-items-start row row-cols-1 row-cols-md-3 g-4">
                                    <div class="col">
                                        <div class="card-group my-2">
                                            <img src={element.image} class="card-img-top" alt="..." style={{ width: '16rem' }} />
                                            <div class="card-body">
                                                <h5 class="card-title">{element.title}</h5>
                                                <p class="card-text">{element.description}</p>
                                                <p class="card-text">{element.price}$</p>
                                                <button className='btn btn-primary'>AddToCart</button>
                                                <button className='btn btn-danger mx-2' onClick={() => editHandler(element.id)}>Edit-item</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    })
            }
        </div >
    )
}
