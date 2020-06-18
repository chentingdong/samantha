alter table "public"."Block"
           add constraint "Block_type_fkey"
           foreign key ("type")
           references "public"."BlockType"
           ("value") on update restrict on delete restrict;
