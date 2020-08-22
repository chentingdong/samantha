
alter table "chat"."user_room_participations" drop constraint "user_room_participations_room_id_fkey",
             add constraint "user_room_participations_room_id_fkey"
             foreign key ("room_id")
             references "chat"."rooms"
             ("id") on update cascade on delete cascade;

alter table "chat"."user_room_participations" drop constraint "user_room_participations_role_fkey",
             add constraint "user_room_participations_role_fkey"
             foreign key ("role")
             references "m2"."participation_roles"
             ("id") on update cascade on delete cascade;

alter table "chat"."user_room_participations"
    add constraint "user_room_participations_pkey" 
    primary key ( "user_id", "room_id" );

ALTER TABLE ONLY "chat"."bell_room_bookings" ALTER COLUMN "created_at" SET DEFAULT now();

alter table "chat"."bell_room_bookings" drop constraint "bell_room_bookings_pkey";

alter table "chat"."bell_room_bookings"
    add constraint "bell_room_bookings_pkey" 
    primary key ( "bell_id", "room_id" );

ALTER TABLE "chat"."bell_room_bookings" DROP COLUMN "id" CASCADE;

ALTER TABLE "chat"."bell_room_bookings" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "chat"."block_room_bookings" drop constraint "block_room_bookings_pkey";
alter table "chat"."block_room_bookings"
    add constraint "block_room_bookings_pkey" 
    primary key ( "block_id", "room_id" );

ALTER TABLE "chat"."block_room_bookings" DROP COLUMN "id" CASCADE;

ALTER TABLE "chat"."block_room_bookings" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "chat"."bell_room_bookings" drop constraint "bell_room_bookings_room_id_fkey";

ALTER TABLE "chat"."block_room_bookings" ADD COLUMN "last_visited" timestamp NOT NULL DEFAULT now();

ALTER TABLE "chat"."block_room_bookings" ALTER COLUMN "last_visited" TYPE timestamptz;

ALTER TABLE "chat"."block_room_bookings" DROP COLUMN "last_visited" CASCADE;

ALTER TABLE "chat"."rooms" ADD COLUMN "last_visited_at" timestamp NULL;

ALTER TABLE "chat"."rooms" ALTER COLUMN "last_visited_at" TYPE timestamptz;
