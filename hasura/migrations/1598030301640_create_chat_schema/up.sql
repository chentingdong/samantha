

alter table "chat"."conversations"
           add constraint "conversations_bell_id_fkey"
           foreign key ("bell_id")
           references "m2"."bells"
           ("id") on update cascade on delete cascade;

alter table "chat"."conversations" rename to "rooms";

alter table "chat"."rooms"
           add constraint "rooms_block_id_fkey"
           foreign key ("block_id")
           references "m2"."blocks"
           ("id") on update restrict on delete restrict;

alter table "chat"."rooms" drop constraint "rooms_block_id_fkey",
             add constraint "rooms_block_id_fkey"
             foreign key ("block_id")
             references "m2"."blocks"
             ("id") on update cascade on delete cascade;

CREATE TABLE "chat"."user_status"("user_id" text NOT NULL, "push_token" Text, "last_seen" timestamp NOT NULL DEFAULT now(), "last_typed" timestamp NOT NULL DEFAULT now(), "login_time" timestamp NOT NULL DEFAULT now(), PRIMARY KEY ("user_id") , FOREIGN KEY ("user_id") REFERENCES "m2"."users"("id") ON UPDATE cascade ON DELETE cascade);

CREATE TABLE "chat"."room_bookings"("room_id" text NOT NULL, "room_participants" jsonb NOT NULL DEFAULT jsonb_build_array(), "source" text NOT NULL, "source_id" text NOT NULL, "id" text NOT NULL, "name" Text, PRIMARY KEY ("id") , FOREIGN KEY ("source_id") REFERENCES "m2"."bells"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("source_id") REFERENCES "m2"."blocks"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("room_id") REFERENCES "chat"."rooms"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"));

CREATE TABLE "chat"."room_participations"("room_id" text NOT NULL, "user_id" text NOT NULL, "id" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("room_id") REFERENCES "chat"."rooms"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("user_id") REFERENCES "m2"."users"("id") ON UPDATE cascade ON DELETE cascade);

alter table "chat"."user_status" rename to "user_room_status";

ALTER TABLE "chat"."user_room_status" ADD COLUMN "room_id" text NOT NULL;

ALTER TABLE "chat"."user_room_status" ADD COLUMN "id" text NOT NULL UNIQUE;

alter table "chat"."user_room_status" drop constraint "user_status_pkey";
alter table "chat"."user_room_status"
    add constraint "user_room_status_pkey" 
    primary key ( "id" );

ALTER TABLE "chat"."user_room_status" DROP COLUMN "login_time" CASCADE;

alter table "chat"."user_room_status"
           add constraint "user_room_status_room_id_fkey"
           foreign key ("room_id")
           references "chat"."rooms"
           ("id") on update cascade on delete cascade;

alter table "chat"."room_participations" rename to "user_room_participations";

alter table "chat"."user_room_status" rename to "user_room_participations";

ALTER TABLE "chat"."user_room_participations" ADD COLUMN "joined_at" timestamp NOT NULL;

ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_typed" TYPE timestamptz;
alter table "chat"."user_room_participations" rename column "last_typed" to "last_typed_at";

ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_seen" TYPE timestamptz;
alter table "chat"."user_room_participations" rename column "last_seen" to "last_seen_at";

ALTER TABLE "chat"."messages" DROP COLUMN "attachments_ids" CASCADE;

ALTER TABLE "chat"."messages" DROP COLUMN "read_ids" CASCADE;

ALTER TABLE "chat"."messages" DROP COLUMN "delivered_ids" CASCADE;

CREATE TABLE "chat"."message_attachments"("id" text NOT NULL, "message_id" text NOT NULL, "attachment_id" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("message_id") REFERENCES "chat"."messages"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("attachment_id") REFERENCES "chat"."attachments"("id") ON UPDATE cascade ON DELETE cascade);

alter table "chat"."message_attachments" add constraint "message_attachments_message_id_key" unique ("message_id");

alter table "chat"."message_attachments" add constraint "message_attachments_attachment_id_key" unique ("attachment_id");

ALTER TABLE "chat"."rooms" DROP COLUMN "block_id" CASCADE;

ALTER TABLE "chat"."rooms" DROP COLUMN "bell_id" CASCADE;

ALTER TABLE "chat"."rooms" DROP COLUMN "updated_at" CASCADE;

ALTER TABLE "chat"."rooms" DROP COLUMN "ended_at" CASCADE;

alter table "chat"."user_room_participations" rename to "room_user_participations";

alter table "chat"."room_user_participations" rename to "user_room_participations";

ALTER TABLE "chat"."room_bookings" DROP COLUMN "room_participants" CASCADE;

alter table "chat"."room_bookings" add constraint "room_bookings_source_id_key" unique ("source_id");

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_fkey",
             add constraint "room_bookings_source_id_fkey2"
             foreign key ("source_id")
             references "m2"."bells"
             ("id") on update no action on delete no action;

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_fkey1",
             add constraint "room_bookings_source_id_fkey3"
             foreign key ("source_id")
             references "m2"."blocks"
             ("id") on update restrict on delete restrict;

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_fkey2";

alter table "chat"."room_bookings" drop constraint "room_bookings_source_id_fkey3";

ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "joined_at" TYPE timestamptz;
ALTER TABLE ONLY "chat"."user_room_participations" ALTER COLUMN "joined_at" SET DEFAULT now();
