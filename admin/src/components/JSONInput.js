import React from "react";
import TextField from "@material-ui/core/TextField";
import { useInput } from "react-admin";

const jsonFormatter = (json) => {
  try {
    return JSON.stringify(json, null, 2);
  } catch (e) {}
};

const jsonParser = (text) => {
  try {
    return JSON.parse(text);
  } catch (e) {}
};

const JSONInput = (props) => {
  const {
    input: { onChange },
  } = useInput({
    name: props.source,
    parse: jsonParser,
    format: jsonFormatter,
    ...props,
  });
  return (
    <TextField
      multiline={true}
      rowsMax={25}
      fullWidth={true}
      variant="outlined"
      defaultValue={jsonFormatter(props.record[props.source])}
      onChange={onChange}
      label={props.label}
    />
  );
};

JSONInput.defaultProps = {
  addLabel: true,
};

export default JSONInput;
