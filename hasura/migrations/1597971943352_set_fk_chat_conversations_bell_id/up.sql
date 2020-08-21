alter table "chat"."conversations"
           add constraint "conversations_bell_id_fkey"
           foreign key ("bell_id")
           references "m2"."bells"
           ("id") on update cascade on delete cascade;
