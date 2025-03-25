import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryReport = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('/reports/inventory')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Inventory Report</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock Level</th>
              <th>Sold</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>{item.category}</td>
                <td>{item.stock_level}</td>
                <td>{item.sold}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryReport;

