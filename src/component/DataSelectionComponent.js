import React from "react";
import { Select } from "antd";

const { Option } = Select;

function DataSelectionComponent({
  jobNumbers,
  selectedJobNumber,
  selectedHeader,
  onJobNumberChange,
  onHeaderChange,
}) {
  return (
    <div>
      {/* Job Number Dropdown */}
      <Select
        value={selectedJobNumber}
        onChange={onJobNumberChange}
        style={{ width: 200 }}
      >
        <Option value="">Select a Job Number</Option>
        {jobNumbers.map((jobNumber) => (
          <Option key={jobNumber} value={jobNumber}>
            {jobNumber}
          </Option>
        ))}
      </Select>

      {/* Header Dropdown */}
      <Select
        value={selectedHeader}
        onChange={onHeaderChange}
        style={{ width: 200 }}
      >
        <Option value="">Select a Header</Option>
        <Option value="Budget Cost">Budget Cost</Option>
        <Option value="Budget Hours">Budget Hours</Option>
        <Option value="Line Item Amount">Line Item Amount</Option>
        <Option value="Cost Rate Override">Cost Rate Override</Option>
        <Option value="Gross Profit">Gross Profit</Option>
      </Select>
    </div>
  );
}

export default DataSelectionComponent;
