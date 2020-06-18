alter table "public"."Block"
           add constraint "Block_state_fkey"
           foreign key ("state")
           references "public"."BlockState"
           ("value") on update restrict on delete restrict;
