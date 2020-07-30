import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "react-final-form";
import { useInput, required } from "react-admin";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
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

const JSONEditor = (props) => {
  const [value, setValue] = useState(
    jsonFormatter(props.record[props.source] || {})
  );

  const {
    input: { onChange },
  } = useInput({
    name: props.source,
    parse: jsonParser,
    format: jsonFormatter,
    ...props,
  });
  return (
    <Editor
      value={value}
      onValueChange={(value) => {
        setValue(value);
        onChange(value);
      }}
      highlight={(value) => {
        try {
          return highlight(value, languages.json);
        } catch (e) {}
      }}
      padding={10}
    />
  );
};

JSONEditor.defaultProps = {
  addLabel: true,
};

export default JSONEditor;
