import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { useLocation } from "react-router";
import { parse } from "query-string";
import JSONEditor from "../components/JSONEditor";

export const BellExecutorCreate = (props) => {
  const location = useLocation();
  const { block_id } = parse(location.search);
  const redirect = `/m2_blocks/${block_id}/show`;

  return (
    <Create {...props}>
      <SimpleForm
        variant="outlined"
        initialValues={{ id: block_id, type: "BellExecutor" }}
        redirect={redirect}
      >
        <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default BellExecutorCreate;
