import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { listProducts } from "../actions/productActions"

const ProductScreen = () => {
    const { catName, subCatName } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts(catName, subCatName))
    }, [dispatch]);

    let body = (<h1></h1>);

    if (loading == false) {
        body = (
            <Row>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} catName={catName} subCatName={subCatName} />
                    </Col>
                ))
                }
            </Row>
        );
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <Link className='btn btn-dark my-3 mx-2' to={`/`}>Back to Home</Link>
            <Link className='btn btn-dark my-3 mx-2' to={`/categories`}>Back to Categories</Link>
            <Link className='btn btn-dark my-3 mx-2' to={`/categories/${catName}`}>Back to {catName}</Link>
            <h1>{subCatName}</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : body}

        </div>
    )
}

export default ProductScreen
