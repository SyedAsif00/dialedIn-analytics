import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function ChartComponent({ chartData }) {
  return (
    <div>
      {Array.isArray(chartData) && chartData.length > 0 && (
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="rgba(75,192,192,1)"
            name={`Data from selected column`}
          />
        </LineChart>
      )}
    </div>
  );
}

export default ChartComponent;
