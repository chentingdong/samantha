import React from "react";
import { Show, TextField, ReferenceField, SimpleShowLayout } from "react-admin";

const UserBlockParticipationShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField
        label="User"
        source="user_id"
        reference="m2_users"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Block"
        source="block_id"
        reference="m2_blocks"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);

export default UserBlockParticipationShow;
