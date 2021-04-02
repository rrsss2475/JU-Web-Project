import React from 'react'
import { Card, CardImg } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import   img  from '../images/baby.jpg'

const Category = ( {category} ) => {

    return (
        <div>
            <Card className='my-3 p-3 rounded' >
                <Link to={`/category/${category.name}`} exact>
                    <Card.Img src={category.image || img} variant="top" style={{height: "150px"}}/>
                </Link>
                <Card.Body>
                    <Link to={`/category/${category.name}`} exact>
                        <Card.Title as="div">
                            <strong>{category.name}</strong>
                        </Card.Title>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Category
