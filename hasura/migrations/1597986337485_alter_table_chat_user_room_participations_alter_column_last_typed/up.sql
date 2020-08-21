ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_typed" TYPE timestamptz;
alter table "chat"."user_room_participations" rename column "last_typed" to "last_typed_at";
