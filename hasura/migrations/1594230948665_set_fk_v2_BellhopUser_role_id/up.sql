alter table "v2"."BellhopUser"
           add constraint "BellhopUser_role_id_fkey"
           foreign key ("role_id")
           references "v2"."Role"
           ("role_id") on update cascade on delete cascade;
