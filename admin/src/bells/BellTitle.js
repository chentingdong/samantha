import React from "react";

const BellTitle = ({ record }) => {
  return <span>{record ? `${record.name} Bell` : ""}</span>;
};

export default BellTitle;
