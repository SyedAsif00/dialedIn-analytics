import React, { useState, useEffect } from "react";
import jsonData from "../../DataFile.json";
import { Select } from "antd";
import {
  BudgetCostChart,
  BudgetHoursChart,
  LineItemAmountChart,
  CostRateOverrideChart,
  GrossProfitChart,
} from "../analyticsChart/AnalyticsCharts";
import { Grid } from "@mui/material";
const { Option } = Select;

const ExcelDataComponent = () => {
  const [selectedJobNumber, setSelectedJobNumber] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      const firstJobNumber = Array.from(
        new Set(jsonData.map((item) => item["Job Number"]))
      )[0];
      setSelectedJobNumber(firstJobNumber);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const filteredData = jsonData.filter(
      (item) => item["Job Number"] === selectedJobNumber
    );

    setFilteredData(filteredData);
    setIsLoading(false);
  }, [selectedJobNumber]);

  const handleJobNumberChange = (value) => {
    setSelectedJobNumber(value);
  };

  return (
    <div>
      <h2>Analytical Data</h2>
      <label>Select Job Number:</label>
      <Select
        onChange={handleJobNumberChange}
        value={selectedJobNumber}
        style={{ width: "200px", marginLeft: "15px" }}
      >
        <Option value="">Select a Job Number</Option>
        {Array.from(new Set(jsonData.map((item) => item["Job Number"]))).map(
          (jobNumber) => (
            <Option key={jobNumber} value={jobNumber}>
              {jobNumber}
            </Option>
          )
        )}
      </Select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Charts for {selectedJobNumber}</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <BudgetCostChart data={filteredData} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <BudgetHoursChart data={filteredData} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <LineItemAmountChart data={filteredData} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CostRateOverrideChart data={filteredData} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <GrossProfitChart data={filteredData} />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ExcelDataComponent;
