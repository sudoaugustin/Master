import React from "react";
import Chart from "react-apexcharts";
import { stepChartConfig } from "../../config/chartConfig";
export default (props) => {
  const titles = props.titles;
  const max = titles.length - 1;
  const step = props.step;
  return (
    <div className="stepper-root">
      <div className="stepper-indicator">
        <Chart
          type="radialBar"
          {...stepChartConfig}
          series={[(step * 100) / max]}
          width="180"
        />
      </div>
      <div className="stepper-title">
        <h2>{titles[step - 1]}</h2>
        <p>{(step === max ? " " : "Next: ") + titles[step]}</p>
      </div>
    </div>
  );
};
