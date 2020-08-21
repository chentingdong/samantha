
ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "joined_at" TYPE timestamp without time zone;
ALTER TABLE ONLY "chat"."user_room_participations" ALTER COLUMN "joined_at" DROP DEFAULT;

alter table "chat"."room_bookings" add foreign key ("source_id") references "m2"."blocks"("id") on update restrict on delete restrict;

alter table "chat"."room_bookings" add foreign key ("source_id") references "m2"."bells"("id") on update no action on delete no action;

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_fkey3",
          add constraint "room_bookings_source_id_fkey1"
          foreign key ("source_id")
          references "m2"."bells"
          ("id")
          on update no action
          on delete no action;

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_fkey2",
          add constraint "room_bookings_source_id_fkey"
          foreign key ("source_id")
          references "m2"."bells"
          ("id")
          on update cascade
          on delete cascade;

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_key";

ALTER TABLE "chat"."room_bookings" ADD COLUMN "room_participants" jsonb;
ALTER TABLE "chat"."room_bookings" ALTER COLUMN "room_participants" DROP NOT NULL;
ALTER TABLE "chat"."room_bookings" ALTER COLUMN "room_participants" SET DEFAULT jsonb_build_array();

alter table "chat"."user_room_participations" rename to "room_user_participations";

alter table "chat"."room_user_participations" rename to "user_room_participations";

ALTER TABLE "chat"."rooms" ADD COLUMN "ended_at" timestamp;
ALTER TABLE "chat"."rooms" ALTER COLUMN "ended_at" DROP NOT NULL;

ALTER TABLE "chat"."rooms" ADD COLUMN "updated_at" timestamp;
ALTER TABLE "chat"."rooms" ALTER COLUMN "updated_at" DROP NOT NULL;
ALTER TABLE "chat"."rooms" ALTER COLUMN "updated_at" SET DEFAULT now();

ALTER TABLE "chat"."rooms" ADD COLUMN "bell_id" text;
ALTER TABLE "chat"."rooms" ALTER COLUMN "bell_id" DROP NOT NULL;
ALTER TABLE "chat"."rooms" ADD CONSTRAINT conversations_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES "m2"."bells" (id) ON DELETE cascade ON UPDATE cascade;

ALTER TABLE "chat"."rooms" ADD COLUMN "block_id" text;
ALTER TABLE "chat"."rooms" ALTER COLUMN "block_id" DROP NOT NULL;
ALTER TABLE "chat"."rooms" ADD CONSTRAINT rooms_block_id_fkey FOREIGN KEY (block_id) REFERENCES "m2"."blocks" (id) ON DELETE cascade ON UPDATE cascade;


alter table "chat"."message_attachments" drop constraint "message_attachments_attachment_id_key";

alter table "chat"."message_attachments" drop constraint "message_attachments_message_id_key";

DROP TABLE "chat"."message_attachments";

ALTER TABLE "chat"."messages" ADD COLUMN "delivered_ids" jsonb;
ALTER TABLE "chat"."messages" ALTER COLUMN "delivered_ids" DROP NOT NULL;

ALTER TABLE "chat"."messages" ADD COLUMN "read_ids" jsonb;
ALTER TABLE "chat"."messages" ALTER COLUMN "read_ids" DROP NOT NULL;

ALTER TABLE "chat"."messages" ADD COLUMN "attachments_ids" jsonb;
ALTER TABLE "chat"."messages" ALTER COLUMN "attachments_ids" DROP NOT NULL;

ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_seen" TYPE timestamp without time zone;
alter table "chat"."user_room_participations" rename column "last_seen_at" to "last_seen";

ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_typed" TYPE timestamp without time zone;
alter table "chat"."user_room_participations" rename column "last_typed_at" to "last_typed";

ALTER TABLE "chat"."user_room_participations" DROP COLUMN "joined_at";

alter table "chat"."user_room_participations" rename to "user_room_status";

alter table "chat"."user_room_participations" rename to "room_participations";

alter table "chat"."user_room_status" drop constraint "user_room_status_room_id_fkey";

ALTER TABLE "chat"."user_room_status" ADD COLUMN "login_time" timestamp;
ALTER TABLE "chat"."user_room_status" ALTER COLUMN "login_time" DROP NOT NULL;
ALTER TABLE "chat"."user_room_status" ALTER COLUMN "login_time" SET DEFAULT now();

alter table "chat"."user_room_status" drop constraint "user_room_status_pkey";
alter table "chat"."user_room_status"
    add constraint "user_status_pkey" 
    primary key ( "user_id" );

ALTER TABLE "chat"."user_room_status" DROP COLUMN "id";

ALTER TABLE "chat"."user_room_status" DROP COLUMN "room_id";

alter table "chat"."user_room_status" rename to "user_status";

DROP TABLE "chat"."room_participations";

DROP TABLE "chat"."room_bookings";

DROP TABLE "chat"."user_status";

alter table "chat"."rooms" drop constraint "rooms_block_id_fkey",
          add constraint "rooms_block_id_fkey"
          foreign key ("block_id")
          references "m2"."blocks"
          ("id")
          on update restrict
          on delete restrict;

alter table "chat"."rooms" drop constraint "rooms_block_id_fkey";

alter table "chat"."rooms" rename to "conversations";

alter table "chat"."conversations" drop constraint "conversations_bell_id_fkey";
