alter table "v2"."Bell"
           add constraint "Bell_owner_fkey"
           foreign key ("owner")
           references "v2"."Bellhop"
           ("bellhop_id") on update cascade on delete cascade;
