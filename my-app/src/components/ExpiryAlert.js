import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

const ExpiryAlert = () => {
  const [expiryAlerts, setExpiryAlerts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get('/alerts/expiry')
      .then(response => {
        setExpiryAlerts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilter = () => {
    axios.get('/alerts/expiry', { params: { start_date: startDate, end_date: endDate } })
      .then(response => {
        setExpiryAlerts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Filter by product name (search query)
  const filteredExpiryAlerts = Object.keys(expiryAlerts).filter((productName) =>
    productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by date range
  const dateFilteredExpiryAlerts = filteredExpiryAlerts.filter((productName) => {
    return expiryAlerts[productName].some((batch) => {
      const expiryDate = new Date(batch.expiry_date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      return (
        (!start || expiryDate >= start) &&
        (!end || expiryDate <= end)
      );
    });
  });

  return (
    <Container className="mt-5">
      <h2>Expiry Alerts</h2>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by product"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>
      </Row>
      <Button onClick={handleDateFilter} className="mb-3">Filter by Date Range</Button>
      <Row>
        {dateFilteredExpiryAlerts.map((productName, index) => (
          <Col md={6} key={index} className="mb-4">
            <h5>{productName}</h5>
            <ListGroup>
              {expiryAlerts[productName].map((batch, idx) => {
                const expiryDate = new Date(batch.expiry_date);
                return (
                  <ListGroup.Item key={idx}>
                    Batch: {batch.batch}, Expiry Date: {expiryDate.toLocaleDateString()}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExpiryAlert;



