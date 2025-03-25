import React, { useState } from 'react';
import axios from 'axios';

const SalesForm = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState('');

  const handleSale = (e) => {
    e.preventDefault();
    axios.post('/sales', { product_name: productName, quantity, payment_method: paymentMethod })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Record Sale</h2>
      <form onSubmit={handleSale}>
        <div className="mb-3">
          <label className="form-label">Product</label>
          <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <input type="text" className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit Sale</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default SalesForm;

