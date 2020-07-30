import React from "react";
import { Create, SimpleForm, ReferenceInput, SelectInput } from "react-admin";
import { useLocation } from "react-router";
import { parse } from "query-string";

export const UserBlockParticipationCreate = (props) => {
  const location = useLocation();
  const { user_id } = parse(location.search);
  const user_redirect = user_id ? `/m2_users/${user_id}/show/blocks` : "";
  const { block_id } = parse(location.search);
  const block_redirect = block_id ? `/m2_blocks/${block_id}/show/users` : "";

  return (
    <Create {...props}>
      <SimpleForm
        variant="outlined"
        initialValues={{ user_id, block_id }}
        redirect={block_redirect || user_redirect}
      >
        {!user_id && (
          <ReferenceInput label="User" source="user_id" reference="m2_users">
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        {!block_id && (
          <ReferenceInput label="Block" source="block_id" reference="m2_blocks">
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        <ReferenceInput
          label="Role"
          source="role"
          reference="m2_participation_roles"
        >
          <SelectInput optionText="id" optionValue="id" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default UserBlockParticipationCreate;
