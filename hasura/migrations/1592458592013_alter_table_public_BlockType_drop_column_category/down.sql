ALTER TABLE "public"."BlockType" ADD COLUMN "category" text;
ALTER TABLE "public"."BlockType" ALTER COLUMN "category" DROP NOT NULL;
