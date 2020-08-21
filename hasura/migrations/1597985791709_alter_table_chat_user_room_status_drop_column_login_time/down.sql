ALTER TABLE "chat"."user_room_status" ADD COLUMN "login_time" timestamp;
ALTER TABLE "chat"."user_room_status" ALTER COLUMN "login_time" DROP NOT NULL;
ALTER TABLE "chat"."user_room_status" ALTER COLUMN "login_time" SET DEFAULT now();
