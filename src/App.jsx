import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpensesChart from './components/ExpensesChart';
import CategoryPieChart from './components/CategoryPieChart';
import Dashboard from './components/Dashboard';

function App() {
  const [transactions, setTransactions] = useState([]);

  // Add a new transaction with a unique ID
  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  // Delete a transaction by ID
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Update an existing transaction
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedTransaction } : t));
  };

  return (
    <div className="container">
      <h1>Personal Finance Visualizer</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList 
        transactions={transactions} 
        deleteTransaction={deleteTransaction} 
        updateTransaction={updateTransaction}
      />
      <ExpensesChart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
    </div>
  );
}

export default App;
