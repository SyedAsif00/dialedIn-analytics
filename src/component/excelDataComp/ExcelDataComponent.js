import React, { useState, useEffect } from "react";
import FileUploadComponent from "../FileUploadComponent";
import DataSelectionComponent from "../DataSelectionComponent";
import ChartComponent from "../ReactChart/Chart";
import { extractDataFromExcel } from "../dataExtractor/DataExtractor";
// Import styles if necessary

function ExcelDataComponent() {
  const [excelData, setExcelData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("Budget Cost"); // Default to "Budget Cost"
  const [loading, setLoading] = useState(false);
  const [jobNumbers, setJobNumbers] = useState([]);
  const [selectedJobNumber, setSelectedJobNumber] = useState(""); // Default to an empty string
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (selectedColumn && excelData.length > 0) {
      processDataForChart(selectedColumn);
    }
  }, [excelData, selectedColumn]);

  useEffect(() => {
    // Update the chart data whenever selectedJobNumber or selectedHeader changes
    if (selectedJobNumber && selectedColumn) {
      updateChartData(selectedJobNumber, selectedColumn);
    }
  }, [selectedJobNumber, selectedColumn]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      const { data, columns } = await extractDataFromExcel(file);
      setExcelData(data);
      setColumnNames(columns);

      // Extract unique job numbers from the data, excluding those with empty rows
      const uniqueJobNumbers = [
        ...new Set(
          data
            .filter((item) => Object.values(item).some((value) => value !== "")) // Check for at least one non-empty value
            .map((item) => item["Job Number"])
        ),
      ];
      setJobNumbers(uniqueJobNumbers);

      // Set the default selectedJobNumber to the first job number in the Excel file
      if (uniqueJobNumbers.length > 0) {
        setSelectedJobNumber(uniqueJobNumbers[0]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error extracting data:", error);
    }
  };

  const processDataForChart = (columnName) => {
    if (!excelData || excelData.length === 0) {
      return;
    }

    const chartData = excelData.map((item) => ({
      label: item.label,
      value: item[columnName],
    }));

    setChartData(chartData);
  };

  const updateChartData = (jobNumber, header) => {
    if (!excelData || excelData.length === 0) {
      return;
    }

    // Filter the data based on the selected job number
    const filteredData = excelData.filter(
      (item) => item["Job Number"] === jobNumber
    );

    // Prepare the chart data based on the selected header
    const chartData = filteredData.map((item) => ({
      label: item.label,
      value: item[header],
    }));

    setChartData(chartData);
  };

  return (
    <div>
      <h1>Analytics Page</h1>
      <FileUploadComponent onFileChange={handleFileChange} loading={loading} />
      <DataSelectionComponent
        jobNumbers={jobNumbers}
        selectedJobNumber={selectedJobNumber}
        selectedHeader={selectedColumn} // Use selectedColumn for the header selection
        onJobNumberChange={setSelectedJobNumber}
        onHeaderChange={setSelectedColumn} // Update selectedColumn for header selection
      />
      {chartData.length > 0 && <ChartComponent chartData={chartData} />}
    </div>
  );
}

export default ExcelDataComponent;
