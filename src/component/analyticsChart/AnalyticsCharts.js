import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

export const BudgetCostChart = ({ data }) => {
  return (
    <div>
      <h4 style={{ color: "#808080" }}>Budget Cost</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget Cost" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export const BudgetHoursChart = ({ data }) => {
  return (
    <div>
      <h4 style={{ color: "#808080" }}>Budget Hours</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Budget Hours" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export const LineItemAmountChart = ({ data }) => {
  return (
    <div>
      <h4 style={{ color: "#808080" }}>Line Item Amount</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Line Item Amount" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export const CostRateOverrideChart = ({ data }) => {
  return (
    <div>
      <h4 style={{ color: "#808080" }}>Cost Rate Override</h4>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="Cost Rate Override" stroke="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export const GrossProfitChart = ({ data }) => {
  return (
    <div>
      <h4 style={{ color: "#808080" }}>Gross Profit</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Gross Profit (%)" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
