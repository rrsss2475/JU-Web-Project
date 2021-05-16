import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listCategories } from "../actions/categoryActions";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)
  const [description, setDescription] = useState('')
  const [isWeighted, setIsWeighted] = useState(false)
  const [uploading, setUploading] = useState(false)

  const categoryList = useSelector((state) => state.categoryList);
  const { categories,loading:catloading } = categoryList;
  console.log(categories)

  const dispatch = useDispatch()
  //dispatch(listCategories());

  const [category, setCategory] = useState()
  //const [redirect, setRedirect] = useState(false)
  if(categoryList.loading==false)
  {
    setCategory(categories[0]._id)
  }

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate } = productUpdate

  useEffect(() => {

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    }
    else {
      console.log(categories.length)
      if(catloading)
      {
        console.log("mai gandu hu")
        dispatch(listCategories());
      }
      if (!product.name || product._id != productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setIsAvailable(product.isAvailable)
        setDescription(product.description)
        setIsWeighted(product.isWeighted)

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
        isWeighted
      })
    )
  }

  return (
    <>
      <div className='container'>
        <Link to='/admin/productList' className='btn btn-light my-3'>
          Go Back
        </Link>
        <h1>Edit Product</h1>
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
                <label for="cars">Category </label>
                <select name="cars" id="cars">
                  {categories.map(cat=><option value={cat._id}>{cat.name}</option>)}
                </select>
              </div>
            }

            {/* <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='subCategory'>
              <Form.Label>SubCategory</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Sub Category'
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

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

            <Form.Group controlId='isweighted'>
              <Form.Check
                type='checkbox'
                label='Is Weighted'
                checked={isWeighted}
                onChange={(e) => setIsWeighted(e.target.checked)}
              ></Form.Check>
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

export default ProductEditScreen
