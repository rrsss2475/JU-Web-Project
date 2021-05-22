import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Modal, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { listCategories } from "../actions/categoryActions";
import { listSubCategories } from "../actions/subcategoryActions1";
import firebase from "../firebase";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [description, setDescription] = useState("");
  const [isWeighted, setIsWeighted] = useState(false);
  const [uploading] = useState(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [files, setFiles] = useState(null);

  const [weights, setWeights] = useState([]);
  const [inpWt, setInpWt] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setInpWt("");
  };

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { subcategories } = subcategoryList;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category != null) dispatch(listSubCategories(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (subcategoryList.loading === false) setSubCategory(subcategories[0]._id);
  }, [subcategoryList.loading, subcategories]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setIsAvailable(product.isAvailable);
        setDescription(product.description);
        setIsWeighted(product.isWeighted);
        if (product.isWeighted) {
          setWeights(product.weights);
        }
        setCategory(product.category);
        setSubCategory(product.subCategory);
      }
    }
  }, [dispatch, product, productId, history, successUpdate]);

  const uploadImage = () => {
    let bucketName = "images";
    let file = files[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        setImage(url);
      });
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        isAvailable,
        description,
        isWeighted,
        weights,
        category,
        subCategory,
      })
    );
  };

  const handleDeleteWeight = (weight) => {
    const weights1 = weights.filter((wt) => {
      return wt !== weight;
    });
    setWeights(weights1);
  };

  const handleAddWeight = () => {
    const convertedWeight = Number(inpWt) / 1000;
    const weights1 = [];
    var i = 0;
    for (i = 0; i < weights.length; i++) {
      if (convertedWeight < weights[i]) break;
      weights1.push(weights[i]);
    }
    weights1.push(convertedWeight);
    for (; i < weights.length; i++) {
      weights1.push(weights[i]);
    }
    //weights1.push(Number(inpWt)/1000)
    setWeights(weights1);
    setShow(false);
  };

  return (
    <>
      <Container
        style={{
          fontFamily: "Rubik, sans-serif",
        }}
      >
        <Link to="/admin/productList" className="btn btn-outline-dark my-3">
          <b>Go Back</b>
        </Link>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.File
                id="image-file"
                label={image}
                custom
                onChange={(e) => setFiles(e.target.files)}
              ></Form.File>
              <Button onClick={uploadImage}>Upload</Button>
              {uploading && <Loader />}
            </Form.Group>
            {categoryList.loading ? (
              <Loader size="25px" />
            ) : (
              <div>
                <label>Category</label>
                <br />
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories.map((cat) => (
                    <option value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <br />
              </div>
            )}
            <br />
            {subcategoryList.loading ? (
              <Loader size="25px" />
            ) : (
              <div>
                <label>Subcategory</label>
                <br />
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  {subcategories.map((subcat) => (
                    <option value={subcat._id}>{subcat.name}</option>
                  ))}
                </select>
                <br />
              </div>
            )}

            <Form.Group controlId="isavailable">
              <Form.Check
                type="checkbox"
                label="Is Available"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isweighted">
              <Form.Check
                type="checkbox"
                label="Is Weighted"
                checked={isWeighted}
                onChange={(e) => setIsWeighted(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            {isWeighted ? (
              <Container>
                <Row>
                  {weights.map((weight) => (
                    <>
                      <Col
                        md={1}
                        xs={3}
                        style={{
                          marginRight: "10px",
                          border: "solid",
                          borderRadius: "10px",
                          fontSize: "12px",
                          paddingLeft: "8px",
                        }}
                        id="list-group-weight"
                      >
                        <p>
                          <b>{weight * 1000}gms</b>
                        </p>
                        <Button
                          onClick={() => handleDeleteWeight(weight)}
                          style={{
                            color: "black",
                            background: "transparent",
                            border: "white",
                            position: "absolute",
                            top: "-7px",
                            right: "-4px",
                          }}
                          id="list-group-weight"
                        >
                          <i class="fas fa-times"></i>
                        </Button>
                      </Col>
                    </>
                  ))}
                  <Button
                    onClick={handleShow}
                    style={{
                      color: "black",
                      background: "white",
                      border: "white",
                    }}
                  >
                    <i
                      //   id="list-group-weight"
                      class="fa fa-plus-circle fa-2x"
                      aria-hidden="true"
                    ></i>
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Weight(in gms)</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input
                        type="text"
                        value={inpWt}
                        onChange={(e) => setInpWt(e.target.value)}
                      ></input>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleAddWeight}>
                        Add
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Row>
              </Container>
            ) : (
              <></>
            )}

            {/* {isWeighted ? (
              <ListGroup id="list-group-weight" horizontal>
                {weights.map((weight) => (
                  <ListGroup.Item
                    id="list-group-weight"
                    style={{
                      marginRight: "10px",
                      border: "solid",
                      width: "130px",
                    }}
                  >
                    {weight * 1000}gms
                    <Button
                      onClick={() => handleDeleteWeight(weight)}
                      style={{
                        color: "black",
                        background: "white",
                        border: "white",
                        position: "absolute",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <i class="fas fa-times"></i>
                    </Button>
                  </ListGroup.Item>
                ))}
                <Button
                  onClick={handleShow}
                  style={{
                    color: "black",
                    background: "white",
                    border: "white",
                  }}
                >
                  <i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Weight(in gms)</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      type="text"
                      value={inpWt}
                      onChange={(e) => setInpWt(e.target.value)}
                    ></input>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={handleAddWeight}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
              </ListGroup>
            ) : (
              <></>
            )} */}
            <br />

            <Button type="submit" variant="warning">
              <b>Update</b>
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;
