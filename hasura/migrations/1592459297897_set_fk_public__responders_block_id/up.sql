alter table "public"."_responders"
           add constraint "_responders_block_id_fkey"
           foreign key ("block_id")
           references "public"."Block"
           ("id") on update cascade on delete cascade;
