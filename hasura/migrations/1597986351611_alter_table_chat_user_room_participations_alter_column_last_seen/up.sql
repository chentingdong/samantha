ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_seen" TYPE timestamptz;
alter table "chat"."user_room_participations" rename column "last_seen" to "last_seen_at";
