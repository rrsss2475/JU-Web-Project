import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col} from "react-bootstrap"
import Loader from '../components/Loader';
import Product from "../components/Product"

const SearchScreen = () => {
   const {query}=useParams();
   const [loading,setloading]=useState(true)
   const [products,setproducts]=useState([])

   useEffect(()=>{
     setloading(true)
      axios.get(`/api/products/search/${query}`)
      .then((res)=>{
          setproducts(res.data);
          setloading(false);
        })
      .catch()
   },[query])

   let body;

   if (!loading) {
    body = (
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product
              product={product}
              type="products"
              catName={product.category.name}
              subCatName={product.subCategory.name}
            />
          </Col>
        ))}
      </Row>
    );
  }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            {loading?<Loader />:products.length==0?<h1>No Results Found</h1>:body}
        </div>
    )
}

export default SearchScreen
