import React from 'react'
import { Card, CardImg } from 'react-bootstrap'
import { Link, Switch, Route } from 'react-router-dom'
import img from '../images/baby.jpg'

const Category = ({ category, type, catName }) => {

    let body = (<Card className='my-3 p-3 rounded' >
        <Link to={`/categories/${category.name}`} exact>
            <Card.Img src={category.image || img} variant="top" style={{ height: "150px" }} />
        </Link>
        <Card.Body>
            <Link to={`/categories/${category.name}`} exact>
                <Card.Title as="div">
                    <strong>{category.name}</strong>
                </Card.Title>
            </Link>
        </Card.Body>
    </Card>);

    if (type == "subcategory") {
        body = (<Card className='my-3 p-3 rounded' >
            <Link to={`/categories/${catName}/${category.name}/`} exact>
                <Card.Img src={category.image || img} variant="top" style={{ height: "150px" }} />
            </Link>
            <Card.Body>
                <Link to={`/categories/${catName}/${category.name}`} exact>
                    <Card.Title as="div">
                        <strong>{category.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>);
    }

    return (
        <div>
            {body}
        </div>
    )
}

export default Category
