import React from "react";

const BlockSelectField = ({ record }) => (
  <div> {`${record.name || ""} (${record.id})`} </div>
);

export default BlockSelectField;
