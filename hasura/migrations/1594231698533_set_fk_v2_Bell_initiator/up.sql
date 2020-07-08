alter table "v2"."Bell"
           add constraint "Bell_initiator_fkey"
           foreign key ("initiator")
           references "v2"."Bellhop"
           ("bellhop_id") on update cascade on delete cascade;
