import React from "react";
import { Progress } from "antd";

const ProgressBar = (props) => {
  const { percent } = props;
  return (
    <div className="progress">
      <Progress percent={percent} />
    </div>
  );
};

export default ProgressBar;
