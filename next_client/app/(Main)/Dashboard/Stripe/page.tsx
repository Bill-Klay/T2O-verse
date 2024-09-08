"use client";

import React, { useState } from "react";

// Stripe Page Component
const StripePage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handlePaymentStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentStatus(e.target.value);
  };

  const handleTransactionIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionId(e.target.value);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your payment submission logic here
    alert(`Payment Method: ${paymentMethod}\nAmount: ${amount}`);
  };

  const handleStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your payment status check logic here
    alert(`Payment Status: ${paymentStatus}`);
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your transaction ID search logic here
    alert(`Transaction ID: ${transactionId}`);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Stripe Payment Page</h1>

      <div style={{ margin: "20px 0" }}>
        <h2>Process Payment</h2>
        <form onSubmit={handlePaymentSubmit}>
          <div>
            <label>
              Payment Method:
              <input
                type="text"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                placeholder="e.g., Credit Card"
                required
              />
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="e.g., 100.00"
                required
              />
            </label>
          </div>
          <button type="submit">Submit Payment</button>
        </form>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2>Check Payment Status</h2>
        <form onSubmit={handleStatusSubmit}>
          <div>
            <label>
              Payment Status:
              <input
                type="text"
                value={paymentStatus}
                onChange={handlePaymentStatusChange}
                placeholder="e.g., Completed"
                required
              />
            </label>
          </div>
          <button type="submit">Check Status</button>
        </form>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2>Find Transaction</h2>
        <form onSubmit={handleTransactionSubmit}>
          <div>
            <label>
              Transaction ID:
              <input
                type="text"
                value={transactionId}
                onChange={handleTransactionIdChange}
                placeholder="e.g., txn_12345"
                required
              />
            </label>
          </div>
          <button type="submit">Find Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default StripePage;
