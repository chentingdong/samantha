import React from "react";
import {
  Filter,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  TextInput,
} from "react-admin";

const BlockFilter = (props) => (
  <Filter {...props}>
    <BooleanInput
      label="Is Definition"
      source="is_definition"
      defaultValue={false}
      alwaysOn
    />
    <ReferenceInput
      label="Type"
      source="type"
      reference="m2_block_type"
      alwaysOn
    >
      <SelectInput optionText="id" optionValue="id" />
    </ReferenceInput>
    <ReferenceInput
      label="State"
      source="state"
      reference="m2_block_state"
      alwaysOn
    >
      <SelectInput optionText="id" optionValue="id" />
    </ReferenceInput>
    <ReferenceInput label="Bell" source="bell_id" reference="m2_bells" alwaysOn>
      <SelectInput optionText="name" optionValue="name" />
    </ReferenceInput>
  </Filter>
);

export default BlockFilter;
