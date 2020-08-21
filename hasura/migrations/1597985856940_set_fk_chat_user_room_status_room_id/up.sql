alter table "chat"."user_room_status"
           add constraint "user_room_status_room_id_fkey"
           foreign key ("room_id")
           references "chat"."rooms"
           ("id") on update cascade on delete cascade;
