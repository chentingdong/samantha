import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { nanoid } from "nanoid";
import BlockSelectField from "./BlockSelectField";
import BellSelectField from "../bells/BellSelectField";

export const BlockCreate = (props) => (
  <Create title="Create New Block" {...props}>
    <SimpleForm
      initialValues={{
        id: nanoid(),
        local_id: nanoid(),
        state: "Draft",
        is_definition: true,
      }}
    >
      <TextInput source="id" />
      <BooleanInput source="is_definition" />
      <TextInput source="name" />
      <ReferenceInput label="Type" source="type" reference="m2_block_type">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="State" source="state" reference="m2_block_state">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Parent" source="parent_id" reference="m2_blocks">
        <SelectInput optionText={<BlockSelectField />} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
        <SelectInput optionText={<BellSelectField />} optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default BlockCreate;
