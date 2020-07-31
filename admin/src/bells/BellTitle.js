import React from "react";

const BellTitle = ({ record }) => {
  return <span>{record ? `${record.name} Bell (${record.id})` : ""}</span>;
};

export default BellTitle;
