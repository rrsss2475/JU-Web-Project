import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Category from '../components/Category';
import categoryList, { listCategories } from '../actions/categoryActions';

const CategoriesScreen = () => {

    const dispatch = useDispatch();

    const categoryList = useSelector(state => state.categoryList);
    const { loading, error, categories } = categoryList;

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch]);

    let body = (<h1></h1>);

    if (loading == false) {
        body = (
            <Row>
                {categories.map((category) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Category type="category" category={category} />
                    </Col>
                ))
                }
            </Row>
        );
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <Link className='btn btn-dark my-3 mx-2' to="/">Back to Home</Link>
            <h1>Categories</h1>
            {loading ? <h1>Loading...</h1> : error ? <h1>Error</h1> : body}

        </div>
    )
}

export default CategoriesScreen
