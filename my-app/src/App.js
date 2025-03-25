import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

// Import components
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import InventoryReport from "./components/InventoryReport";
import SalesReport from "./components/SalesReport";
import LowStockAlert from "./components/LowStockAlert";
import ExpiryAlert from "./components/ExpiryAlert";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/products">Product Management</Nav.Link>
            <Nav.Link href="/sales">Sales Management</Nav.Link>
            <Nav.Link href="/inventory-report">Inventory Report</Nav.Link>
            <Nav.Link href="/sales-report">Sales Report</Nav.Link>
            <Nav.Link href="/alerts/low-stock">Low Stock Alerts</Nav.Link>
            <Nav.Link href="/alerts/expiry">Expiry Alerts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to the Inventory Management System</h2>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productName" element={<ProductDetails />} />
          <Route path="/inventory-report" element={<InventoryReport />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/alerts/low-stock" element={<LowStockAlert />} />
          <Route path="/alerts/expiry" element={<ExpiryAlert />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;








