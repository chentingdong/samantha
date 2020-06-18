alter table "public"."_responders"
           add constraint "_responders_user_id_fkey"
           foreign key ("user_id")
           references "public"."User"
           ("id") on update cascade on delete cascade;
