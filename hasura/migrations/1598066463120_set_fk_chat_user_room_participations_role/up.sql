alter table "chat"."user_room_participations" drop constraint "user_room_participations_role_fkey",
             add constraint "user_room_participations_role_fkey"
             foreign key ("role")
             references "m2"."participation_roles"
             ("id") on update cascade on delete cascade;
