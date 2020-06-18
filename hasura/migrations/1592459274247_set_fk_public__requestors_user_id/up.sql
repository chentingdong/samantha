alter table "public"."_requestors"
           add constraint "_requestors_user_id_fkey"
           foreign key ("user_id")
           references "public"."User"
           ("id") on update cascade on delete cascade;
