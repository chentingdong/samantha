
alter table "chat"."messages" drop constraint "messages_room_id_fkey";

ALTER TABLE "chat"."rooms" ALTER COLUMN "last_post_at" TYPE timestamp without time zone;

alter table "chat"."user_room_participations" drop constraint "user_room_participations_room_id_fkey";

alter table "chat"."rooms" rename column "id" to "source_id";

alter table "chat"."rooms" add foreign key ("source") references "chat"."room_sources"("id") on update cascade on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_pkey";

ALTER TABLE "chat"."rooms" ADD COLUMN "id" text;
ALTER TABLE "chat"."rooms" ALTER COLUMN "id" DROP NOT NULL;
ALTER TABLE "chat"."rooms" ADD CONSTRAINT rooms_id_source_source_id_key UNIQUE (id, source, source_id);

alter table "chat"."rooms"
    add constraint "rooms_pkey" 
    primary key ( "id", "source", "source_id" );

alter table "chat"."rooms" drop constraint "rooms_pkey";
alter table "chat"."rooms"
    add constraint "rooms_pkey" 
    primary key ( "id", "source" );

alter table "chat"."rooms" drop constraint "rooms_pkey";
alter table "chat"."rooms"
    add constraint "rooms_pkey" 
    primary key ( "id" );

alter table "chat"."user_room_participations" drop constraint "user_room_participations_pkey";
alter table "chat"."user_room_participations"
    add constraint "user_room_participations_pkey" 
    primary key ( "room_id", "user_id" );

alter table "chat"."user_room_participations" add foreign key ("room_id") references "chat"."rooms"("id") on update cascade on delete cascade;

alter table "chat"."messages" add foreign key ("room_id") references "chat"."rooms"("id") on update cascade on delete cascade;

ALTER TABLE "chat"."user_room_participations" ADD COLUMN "id" int4;
ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "id" DROP NOT NULL;
ALTER TABLE "chat"."user_room_participations" ADD CONSTRAINT user_room_participations_id_key UNIQUE (id);
ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "id" SET DEFAULT nextval('chat.user_room_participations_id_seq'::regclass);

ALTER TABLE ONLY "chat"."rooms" ALTER COLUMN "last_visited_at" SET DEFAULT now();

ALTER TABLE ONLY "chat"."rooms" ALTER COLUMN "last_visited_at" DROP DEFAULT;

ALTER TABLE "chat"."rooms" ADD COLUMN "type" text;
ALTER TABLE "chat"."rooms" ALTER COLUMN "type" DROP NOT NULL;
ALTER TABLE "chat"."rooms" ALTER COLUMN "type" SET DEFAULT 'chat'::text;

alter table "chat"."rooms" drop constraint "rooms_id_source_source_id_key";

alter table "chat"."rooms" drop constraint "rooms_source_fkey",
          add constraint "rooms_source_id_fkey"
          foreign key ("source_id")
          references "chat"."room_sources"
          ("id")
          on update cascade
          on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_fkey",
          add constraint "rooms_source_id_fkey"
          foreign key ("source_id")
          references "chat"."room_sources"
          ("id")
          on update cascade
          on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_fkey",
          add constraint "rooms_source_id_fkey"
          foreign key ("source_id")
          references "chat"."room_sources"
          ("id")
          on update cascade
          on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_fkey",
          add constraint "rooms_source_id_fkey"
          foreign key ("source_id")
          references "chat"."room_sources"
          ("id")
          on update cascade
          on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_fkey",
          add constraint "rooms_source_id_fkey"
          foreign key ("source_id")
          references "chat"."room_sources"
          ("id")
          on update cascade
          on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_id_fkey";

ALTER TABLE "chat"."rooms" DROP COLUMN "source_id";

ALTER TABLE "chat"."rooms" DROP COLUMN "source";

;

alter table "chat"."room_bookings" add foreign key ("source") references "chat"."room_sources"("id") on update set default on delete set default;

;

alter table "chat"."room_bookings" add foreign key ("source") references "chat"."room_sources"("id") on update set default on delete set default;

;

alter table "chat"."room_bookings" add foreign key ("room_id") references "chat"."rooms"("id") on update cascade on delete cascade;

;

;

;

;

;

alter table "chat"."user_room_participations" drop constraint "user_room_participations_user_id_fkey";

drop schema chat cascade;
