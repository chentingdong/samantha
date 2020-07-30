import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "react-final-form";
import { useInput, required } from "react-admin";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";

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
