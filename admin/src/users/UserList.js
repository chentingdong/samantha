import React from "react";
import {
  Datagrid,
  List,
  TextField,
  EmailField,
  ImageField,
  ReferenceManyField,
  SingleFieldList,
  ReferenceField,
  ChipField,
  ShowButton,
} from "react-admin";

const UserList = (props) => (
  <List {...props} perPage={25} sort={{ field: "name", order: "ASC" }}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <ImageField source="picture" />
      <EmailField source="email" />
      <ReferenceManyField
        reference="m2_bellhop_memberships"
        target="user_id"
        label="Bellhops"
      >
        <SingleFieldList linkType={false}>
          <ReferenceField
            source="bellhop_id"
            reference="m2_bellhops"
            link={false}
          >
            <ChipField source="name" />
          </ReferenceField>
        </SingleFieldList>
      </ReferenceManyField>
      <ShowButton />
    </Datagrid>
  </List>
);

export default UserList;
