import * as React from "react";
import Highlight from "react-highlight.js";

const JSONField = ({ source, record = {} }) => {
  return (
    <Highlight language="JSON">
      {JSON.stringify(record[source], null, 2)}
    </Highlight>
  );
};

JSONField.defaultProps = {
  addLabel: true,
};

export default JSONField;
