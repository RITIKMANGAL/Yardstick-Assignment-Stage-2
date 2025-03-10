import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ExpensesChart({ transactions }) {
  // Group transactions by month and year, summing the amounts
  const dataMap = {};

  transactions.forEach((transaction) => {
    const dateObj = new Date(transaction.date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();
    const key = `${month} ${year}`;

    if (dataMap[key]) {
      dataMap[key] += transaction.amount;
    } else {
      dataMap[key] = transaction.amount;
    }
  });

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    expense: dataMap[key]
  }));

  return (
    <div className="expenses-chart">
      <h2>Monthly Expenses</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="expense" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpensesChart;
