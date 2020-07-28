import React from "react";

const BellSelectField = ({ record }) => (
  <div> {`${record.name || ""} (${record.id})`} </div>
);

export default BellSelectField;
