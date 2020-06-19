alter table "public"."blockDefs"
           add constraint "blockDefs_parent_id_fkey"
           foreign key ("parent_id")
           references "public"."blockDefs"
           ("id") on update restrict on delete restrict;
