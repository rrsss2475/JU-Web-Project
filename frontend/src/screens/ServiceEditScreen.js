import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/serviceActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listservCategories } from "../actions/servcategoryActions";
import { listSubCategories } from "../actions/subcategoryActions1"

const ServiceEditScreen = ({ history, match }) => {
    const productId = match.params.id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const subcategoryList = useSelector((state) => state.subcategoryList)
    const { subcategories } = subcategoryList;

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate } = productUpdate

    useEffect(() => {
        dispatch(listservCategories());
    }, [dispatch])

    useEffect(() => {
        if (category != null)
            dispatch(listSubCategories(category))
    }, [dispatch, category])

    useEffect(() => {
        if (subcategoryList.loading == false)
            setSubCategory(subcategories[0]._id)
    }, [subcategoryList.loading])

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/servicelist')
        }
        else {
            if (!product.name || product._id != productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setIsAvailable(product.isAvailable)
                setDescription(product.description)
                setCategory(product.category)
                setSubCategory(product.subCategory)
            }
        }
    }, [dispatch, product, productId, history, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                isAvailable,
                description,
                category,
                subCategory
            })
        )
    }

    return (
        <>
            <div className='container'>
                <Link to='/admin/serviceList' className='btn btn-light my-3'>
                    Go Back
                </Link>
                <h1>Edit Service</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        {categoryList.loading ? <Loader size="25px" />
                            :
                            <div>
                                <label >Category</label>
                                <br />
                                <select value={category} onChange={(e) => { setCategory(e.target.value); }}>
                                    {categories.map(cat => <option value={cat._id}>{cat.name}</option>)}
                                </select>
                                <br />
                            </div>
                        }
                        <br />
                        {subcategoryList.loading ? <Loader size="25px" />
                            :
                            <div>
                                <label >Subcategory</label>
                                <br />
                                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                                    {subcategories.map(subcat => <option value={subcat._id}>{subcat.name}</option>)}
                                </select>
                                <br />
                            </div>
                        }

                        <Form.Group controlId='isavailable'>
                            <Form.Check
                                type='checkbox'
                                label='Is Available'
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>


                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </div>
        </>
    )
}

export default ServiceEditScreen
