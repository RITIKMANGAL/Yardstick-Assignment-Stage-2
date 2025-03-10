import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function CategoryPieChart({ transactions }) {
  // Aggregate expenses by category
  const dataMap = {};
  transactions.forEach(transaction => {
    const { category, amount } = transaction;
    if (dataMap[category]) {
      dataMap[category] += amount;
    } else {
      dataMap[category] = amount;
    }
  });
  const data = Object.keys(dataMap).map(category => ({
    name: category,
    value: dataMap[category]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="category-pie-chart">
      <h2>Expenses by Category</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryPieChart;
