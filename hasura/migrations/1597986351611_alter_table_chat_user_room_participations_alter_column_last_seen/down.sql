ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_seen" TYPE timestamp without time zone;
alter table "chat"."user_room_participations" rename column "last_seen_at" to "last_seen";
