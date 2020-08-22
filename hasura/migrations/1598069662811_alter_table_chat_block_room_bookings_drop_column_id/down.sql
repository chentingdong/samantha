ALTER TABLE "chat"."block_room_bookings" ADD COLUMN "id" text;
ALTER TABLE "chat"."block_room_bookings" ALTER COLUMN "id" DROP NOT NULL;
