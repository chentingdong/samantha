alter table "v2"."Bell"
           add constraint "Bell_bellhop_id_fkey"
           foreign key ("bellhop_id")
           references "v2"."Bellhop"
           ("bellhop_id") on update cascade on delete cascade;
