import React from 'react';

function Dashboard({ transactions }) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Category breakdown
  const categoryMap = {};
  transactions.forEach(t => {
    if (categoryMap[t.category]) {
      categoryMap[t.category] += t.amount;
    } else {
      categoryMap[t.category] = t.amount;
    }
  });
  
  // Most recent transactions (sorted by date descending)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentTransactions = sortedTransactions.slice(0, 3);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Category Breakdown</h3>
          <ul>
            {Object.keys(categoryMap).map(category => (
              <li key={category}>
                {category}: ${categoryMap[category].toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Recent Transactions</h3>
          {recentTransactions.length === 0 ? (
            <p>No recent transactions.</p>
          ) : (
            <ul>
              {recentTransactions.map(t => (
                <li key={t.id}>
                  {t.date} - {t.description} (${t.amount.toFixed(2)})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
