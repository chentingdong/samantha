ALTER TABLE "chat"."user_room_participations" ALTER COLUMN "last_typed" TYPE timestamp without time zone;
alter table "chat"."user_room_participations" rename column "last_typed_at" to "last_typed";
