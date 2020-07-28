import React from "react";
import { Show, TextField, ReferenceField, SimpleShowLayout } from "react-admin";

const BellhopMembershipShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField
        label="Bellhop"
        source="bellhop_id"
        reference="m2_bellhops"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="User"
        source="user_id"
        reference="m2_users"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);

export default BellhopMembershipShow;
