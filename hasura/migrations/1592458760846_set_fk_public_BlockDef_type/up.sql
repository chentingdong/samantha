alter table "public"."BlockDef"
           add constraint "BlockDef_type_fkey"
           foreign key ("type")
           references "public"."BlockType"
           ("value") on update restrict on delete restrict;
