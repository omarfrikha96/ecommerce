import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../../Store';
import { getError } from '../../utils';
import { Helmet } from 'react-helmet-async';
import { LoadingBox, MessageBox } from '../../components/index';
import { Button, Container, Form, ListGroup } from '../../Boostraps';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function ProductCreateScreen() {
  const navigate = useNavigate();
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {});

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/products/`,
        {
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const deleteFileHandlerImg = async (fileName) => {
    if (image === fileName) {
      setImage(null); // Assuming you want to set it to null after deletion
      toast.success('Image removed successfully. Add another image');
    }
    setIsButtonVisible(!isButtonVisible);
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Create Product </title>
      </Helmet>
      <h1>Create Product </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={uploadFileHandler} />
          {loadingUpload && <LoadingBox></LoadingBox>}
          <div>
            {image === '' ? (
              <MessageBox>No image</MessageBox>
            ) : (
              <>
                {image}
                {isButtonVisible && (<Button
                  variant="light"
                  onClick={() => deleteFileHandlerImg(image)}
                >
                  <i className="fa fa-times-circle"></i>
                </Button>)}
              </>
            )}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="additionalImageFile">
          <Form.Label>Upload Aditional Images</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => uploadFileHandler(e, true)}
          />
          {loadingUpload && <LoadingBox></LoadingBox>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="additionalImage">
          {images.length === 0 && <MessageBox>No images</MessageBox>}
          <ListGroup variant="flush">
            {images.map((x) => (
              <ListGroup.Item key={x}>
                {x}
                <Button variant="light" onClick={() => deleteFileHandler(x)}>
                  <i className="fa fa-times-circle"></i>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Open this select menu</option>
            <option value="shirt">Shirt</option>
            <option value="pants">Pants</option>
            <option value="shorts">Shorts</option>
            <option value="costume">Costume</option>
            <option value="shoes">Shoes</option>
            <option value="watch">Watch</option>
            <option value="parfums">Parfums</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="countInStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Create</Button> &nbsp;
          <Button onClick={() => navigate('/admin/products')}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
}
