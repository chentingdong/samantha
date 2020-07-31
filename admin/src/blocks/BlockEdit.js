import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";
import BlockTitle from "./BlockTitle";
import BlockSelectField from "./BlockSelectField";
import BellSelectField from "../bells/BellSelectField";
import JSONEditor from "../components/JSONEditor";

const BlockEdit = (props) => (
  <Edit undoable={false} title={<BlockTitle />} {...props}>
    <SimpleForm variant="outlined" redirect="show">
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
  </Edit>
);

export default BlockEdit;
