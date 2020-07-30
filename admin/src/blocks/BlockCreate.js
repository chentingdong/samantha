import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import { nanoid } from "nanoid";
import BlockSelectField from "./BlockSelectField";
import BellSelectField from "../bells/BellSelectField";
import JSONEditor from "../components/JSONEditor";

export const BlockCreate = (props) => (
  <Create title="Create New Block" {...props}>
    <SimpleForm
      variant="outlined"
      redirect="show"
      initialValues={{
        id: nanoid(),
        local_id: nanoid(),
        state: "Draft",
        is_definition: true,
      }}
    >
      <TextInput source="id" />
      <TextInput source="local_id" />
      <BooleanInput source="is_definition" />
      <TextInput source="name" fullWidth />
      <ReferenceInput label="Type" source="type" reference="m2_block_type">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="State" source="state" reference="m2_block_state">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <JSONEditor source="configs" fullWidth />
      <ReferenceInput
        label="Parent"
        source="parent_id"
        reference="m2_blocks"
        fullWidth
      >
        <SelectInput optionText={<BlockSelectField />} optionValue="id" />
      </ReferenceInput>
      <NumberInput source="sibling_order" min={0} />
      <ReferenceInput
        label="Bell"
        source="bell_id"
        reference="m2_bells"
        fullWidth
      >
        <SelectInput optionText={<BellSelectField />} optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default BlockCreate;
