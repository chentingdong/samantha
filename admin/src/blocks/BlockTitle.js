import React from "react";

const BlockTitle = ({ record }) => {
  return <span>{record ? `${record.name} Block` : ""}</span>;
};

export default BlockTitle;
