ALTER TABLE "chat"."bell_room_bookings" ADD COLUMN "id" text;
ALTER TABLE "chat"."bell_room_bookings" ALTER COLUMN "id" DROP NOT NULL;
