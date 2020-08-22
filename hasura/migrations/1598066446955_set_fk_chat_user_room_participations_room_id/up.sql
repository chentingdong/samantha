alter table "chat"."user_room_participations" drop constraint "user_room_participations_room_id_fkey",
             add constraint "user_room_participations_room_id_fkey"
             foreign key ("room_id")
             references "chat"."rooms"
             ("id") on update cascade on delete cascade;
