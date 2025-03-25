import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form } from 'react-bootstrap';

const LowStockAlert = () => {
  const [lowStock, setLowStock] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/alerts/low-stock')
      .then(response => {
        setLowStock(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLowStock = Object.keys(lowStock).filter((productName) =>
    productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h2>Low Stock Alerts</h2>
      <Form.Control
        type="text"
        placeholder="Search by product"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-3"
      />
      <ListGroup>
        {filteredLowStock.map((productName, index) => (
          <ListGroup.Item key={index}>
            {productName}: {lowStock[productName]} units remaining
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default LowStockAlert;


