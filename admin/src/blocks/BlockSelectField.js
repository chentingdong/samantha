import React from "react";

const BlockSelectField = ({ record }) => (
  <div> {`${record.type} ${record.name || ""} (${record.id})`} </div>
);

export default BlockSelectField;
