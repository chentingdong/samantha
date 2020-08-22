
ALTER TABLE "chat"."rooms" ALTER COLUMN "last_visited_at" TYPE timestamp without time zone;

ALTER TABLE "chat"."rooms" DROP COLUMN "last_visited_at";

ALTER TABLE "chat"."block_room_bookings" ADD COLUMN "last_visited" timestamptz;
ALTER TABLE "chat"."block_room_bookings" ALTER COLUMN "last_visited" DROP NOT NULL;
ALTER TABLE "chat"."block_room_bookings" ALTER COLUMN "last_visited" SET DEFAULT now();

ALTER TABLE "chat"."block_room_bookings" ALTER COLUMN "last_visited" TYPE timestamp without time zone;

ALTER TABLE "chat"."block_room_bookings" DROP COLUMN "last_visited";

alter table "chat"."bell_room_bookings" add foreign key ("room_id") references "chat"."rooms"("id") on update cascade on delete cascade;

ALTER TABLE "chat"."block_room_bookings" DROP COLUMN "id";

ALTER TABLE "chat"."block_room_bookings" ADD COLUMN "id" text;
ALTER TABLE "chat"."block_room_bookings" ALTER COLUMN "id" DROP NOT NULL;

alter table "chat"."block_room_bookings" drop constraint "block_room_bookings_pkey";
alter table "chat"."block_room_bookings"
    add constraint "block_room_bookings_pkey" 
    primary key ( "id" );

ALTER TABLE "chat"."bell_room_bookings" DROP COLUMN "id";

ALTER TABLE "chat"."bell_room_bookings" ADD COLUMN "id" text;
ALTER TABLE "chat"."bell_room_bookings" ALTER COLUMN "id" DROP NOT NULL;

alter table "chat"."bell_room_bookings" drop constraint "bell_room_bookings_pkey";

alter table "chat"."bell_room_bookings"
    add constraint "bell_room_bookings_pkey" 
    primary key ( "id" );

ALTER TABLE ONLY "chat"."bell_room_bookings" ALTER COLUMN "created_at" DROP DEFAULT;

alter table "chat"."user_room_participations" drop constraint "user_room_participations_pkey";

alter table "chat"."user_room_participations" drop constraint "user_room_participations_role_fkey",
          add constraint "user_room_participations_role_fkey"
          foreign key ("role")
          references "m2"."participation_roles"
          ("id")
          on update restrict
          on delete restrict;

alter table "chat"."user_room_participations" drop constraint "user_room_participations_room_id_fkey",
          add constraint "user_room_participations_room_id_fkey"
          foreign key ("room_id")
          references "chat"."rooms"
          ("id")
          on update restrict
          on delete restrict;
