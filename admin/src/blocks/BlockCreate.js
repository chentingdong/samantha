import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";

export const BlockCreate = (props) => (
  <Create title="Create New Block" {...props}>
    <SimpleForm>
      <TextInput source="type" />
      <BooleanInput source="is_definition" />
    </SimpleForm>
  </Create>
);

export default BlockCreate;
