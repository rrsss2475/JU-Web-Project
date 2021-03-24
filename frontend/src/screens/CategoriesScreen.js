import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import categories from '../categories'
import Category from '../components/Category'
const CategoriesScreen = () => {
    return (
        <div className="container" style={{marginTop:'100px'}}>
            <Link className='btn btn-dark my-3 mx-2' to="/">Back to Home</Link>
            <h1>Categories</h1>
            <Row>
                {categories.map((category) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Category category = { category } />
                    </Col>
                ))
                }
            </Row>
        </div>
    )
}

export default CategoriesScreen
