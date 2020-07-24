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

export const BellhopMembershipCreate = (props) => {
  const location = useLocation();
  const { bellhop_id } = parse(location.search);
  const bellhop_redirect = bellhop_id
    ? `/m2_bellhops/${bellhop_id}/show/users`
    : "";
  const { user_id } = parse(location.search);
  const user_redirect = user_id ? `/m2_users/${user_id}/show/bellhops` : "";

  // <ReferenceInput
  //   label="Role"
  //   source="role"
  //   reference="m2_membership_roles"
  // >
  //   <SelectInput optionText="role" />
  // </ReferenceInput>;

  return (
    <Create {...props}>
      <SimpleForm
        initialValues={{ bellhop_id, user_id }}
        redirect={user_redirect || bellhop_redirect}
      >
        {!bellhop_id && (
          <ReferenceInput
            label="Bellhop"
            source="bellhop_id"
            reference="m2_bellhops"
          >
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        {!user_id && (
          <ReferenceInput label="User" source="user_id" reference="m2_users">
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        <TextInput source="role" />
      </SimpleForm>
    </Create>
  );
};

export default BellhopMembershipCreate;
