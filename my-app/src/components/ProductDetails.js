import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${productName}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [productName]);

  if (!product) return <p>Loading...</p>;

  return (
    <Container className="mt-5">
      <h2>{product.name}</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.image_url || "https://via.placeholder.com/500"} />
            <Card.Body>
              <Card.Title>Product Info</Card.Title>
              <Card.Text>
                <strong>Category:</strong> {product.category}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Stock Level:</strong> {product.stock_level}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h5>Variants</h5>
          <ul>
            {product.variants.map((variant, index) => (
              <li key={index}>
                <strong>{variant.variant_name}:</strong> {variant.variant_details}
              </li>
            ))}
          </ul>
          <Button variant="primary" href={`/products/${product.name}/buy`} className="mt-3">
            Buy Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

