import React, { useState } from 'react';

function TransactionList({ transactions, deleteTransaction, updateTransaction }) {
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [error, setError] = useState('');

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

  const startEditing = (transaction) => {
    setEditingId(transaction.id);
    setEditAmount(transaction.amount);
    setEditDate(transaction.date);
    setEditDescription(transaction.description);
    setEditCategory(transaction.category);
  };

  const handleUpdate = (id) => {
    if (!editAmount || isNaN(editAmount) || !editDate || !editDescription || !editCategory) {
      setError('Please fill all fields correctly.');
      return;
    }
    updateTransaction(id, {
      amount: parseFloat(editAmount),
      date: editDate,
      description: editDescription,
      category: editCategory
    });
    setEditingId(null);
    setError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError('');
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions added.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td data-label="Amount">
                  {editingId === transaction.id ? (
                    <input 
                      type="number" 
                      step="0.01"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  ) : (
                    transaction.amount
                  )}
                </td>
                <td data-label="Date">
                  {editingId === transaction.id ? (
                    <input 
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                    />
                  ) : (
                    transaction.date
                  )}
                </td>
                <td data-label="Description">
                  {editingId === transaction.id ? (
                    <input 
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    transaction.description
                  )}
                </td>
                <td data-label="Category">
                  {editingId === transaction.id ? (
                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  ) : (
                    transaction.category
                  )}
                </td>
                <td data-label="Actions">
                  {editingId === transaction.id ? (
                    <>
                      <button onClick={() => handleUpdate(transaction.id)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                      {error && <div className="error">{error}</div>}
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(transaction)}>Edit</button>
                      <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;
