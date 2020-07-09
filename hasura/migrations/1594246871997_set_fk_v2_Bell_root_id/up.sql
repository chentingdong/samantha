alter table "v2"."Bell"
           add constraint "Bell_root_id_fkey"
           foreign key ("root_id")
           references "v2"."Block"
           ("block_id") on update cascade on delete cascade;
