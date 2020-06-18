alter table "public"."BlockDef"
           add constraint "BlockDef_state_fkey"
           foreign key ("state")
           references "public"."BlockDefState"
           ("value") on update restrict on delete restrict;
