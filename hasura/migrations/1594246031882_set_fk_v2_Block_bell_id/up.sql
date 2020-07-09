alter table "v2"."Block"
           add constraint "Block_bell_id_fkey"
           foreign key ("bell_id")
           references "v2"."Bell"
           ("bell_id") on update cascade on delete cascade;
