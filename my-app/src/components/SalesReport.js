import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Row, Col, Form } from 'react-bootstrap';

const SalesReport = () => {
  const [salesReport, setSalesReport] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get('/reports/sales')
      .then(response => {
        setSalesReport(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilter = () => {
    axios.get('/reports/sales', { params: { start_date: startDate, end_date: endDate } })
      .then(response => {
        setSalesReport(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const filteredSalesReport = salesReport.filter((item) => {
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDateRange =
      (startDate ? new Date(item.date) >= new Date(startDate) : true) &&
      (endDate ? new Date(item.date) <= new Date(endDate) : true);
    return matchesSearch && matchesDateRange;
  });

  return (
    <Container className="mt-5">
      <h2>Sales Report</h2>
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
      <button onClick={handleDateFilter} className="btn btn-primary mb-3">
        Filter by Date Range
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity Sold</th>
            <th>Revenue</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSalesReport.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.quantity_sold}</td>
              <td>${item.revenue}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SalesReport;


