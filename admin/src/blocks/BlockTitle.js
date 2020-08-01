import React from "react";

const BlockTitle = ({ record }) => {
  return <span>{record ? `${record.name} Block ${record.id}` : ""}</span>;
};

export default BlockTitle;
