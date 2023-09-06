import React, { useState, useEffect } from "react";
import FileUploadComponent from "../FileUploadComponent";
import DataSelectionComponent from "../DataSelectionComponent";
import ChartComponent from "../ReactChart/Chart";
import { extractDataFromExcel } from "../dataExtractor/DataExtractor";

function ExcelDataComponent() {
  const [excelData, setExcelData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("Budget Cost");
  const [loading, setLoading] = useState(false);
  const [jobNumbers, setJobNumbers] = useState([]);
  const [selectedJobNumber, setSelectedJobNumber] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (selectedColumn && excelData.length > 0) {
      processDataForChart(selectedColumn);
    }
  }, [excelData, selectedColumn]);

  useEffect(() => {
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

      const uniqueJobNumbers = [
        ...new Set(
          data
            .filter((item) => Object.values(item).some((value) => value !== ""))
            .map((item) => item["Job Number"])
        ),
      ];
      setJobNumbers(uniqueJobNumbers);

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

    const filteredData = excelData.filter(
      (item) => item["Job Number"] === jobNumber
    );

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
        selectedHeader={selectedColumn}
        onJobNumberChange={setSelectedJobNumber}
        onHeaderChange={setSelectedColumn}
      />
      {chartData.length > 0 && <ChartComponent chartData={chartData} />}
    </div>
  );
}

export default ExcelDataComponent;
