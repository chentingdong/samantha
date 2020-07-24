import React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";
import BlockTitle from "./BlockTitle";

const BlockEdit = (props) => (
  <Edit title={<BlockTitle />} {...props}>
    <SimpleForm>
      <TextInput source="type" />
      <BooleanInput source="is_definition" />
    </SimpleForm>
  </Edit>
);

export default BlockEdit;
