import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Inventory System</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sales">Sales</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports/inventory">Inventory Report</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports/sales">Sales Report</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alerts/low-stock">Low Stock Alerts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alerts/expiry">Expiry Alerts</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;


