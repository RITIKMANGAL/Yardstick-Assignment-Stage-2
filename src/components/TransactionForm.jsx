import React, { useState } from 'react';

function TransactionForm({ addTransaction }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [error, setError] = useState('');

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!amount || isNaN(amount) || !date || !description || !category) {
      setError('Please fill all fields correctly.');
      return;
    }
    const transaction = {
      amount: parseFloat(amount),
      date,
      description,
      category
    };
    addTransaction(transaction);
    setAmount('');
    setDate('');
    setDescription('');
    setCategory('Food');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {error && <div className="error">{error}</div>}
      <div>
        <label>Amount:</label>
        <input 
          type="number" 
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input 
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
