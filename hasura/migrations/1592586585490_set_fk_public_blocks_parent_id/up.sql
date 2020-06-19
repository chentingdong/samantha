alter table "public"."blocks"
           add constraint "blocks_parent_id_fkey"
           foreign key ("parent_id")
           references "public"."blocks"
           ("id") on update restrict on delete restrict;
