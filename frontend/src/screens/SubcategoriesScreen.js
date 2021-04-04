import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import Category from '../components/Category';
import subcategoryList, { listsubCategories } from '../actions/subcategoryActions';

const SubcategoriesScreen = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const subcategoryList = useSelector(state => state.subcategoryList);
    const { loading, error, subcategories} = subcategoryList;

    useEffect(() => {
        dispatch(listsubCategories(id))
    }, [dispatch]);

    let body = (<h1></h1>);

    if(loading == false)    {
    body = (
        <Row>
                {subcategories.map((category) => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Category category = { category } />
                    </Col>
                ))
                }
            </Row>
    );
    };

    return (
        <div className="container" style={{marginTop:'100px'}}>
            <Link className='btn btn-dark my-3 mx-2' to="/">Back to Home</Link>
            <h1>{id}</h1>
            {loading? <h1>Loading...</h1> : error? <h1>Error</h1> : body}
            
        </div>
    )
}

export default SubcategoriesScreen
