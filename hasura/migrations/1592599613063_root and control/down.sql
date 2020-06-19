
ALTER TABLE ONLY "public"."blocks" ALTER COLUMN "description" SET DEFAULT '''''::text';

ALTER TABLE ONLY "public"."blockDefs" ALTER COLUMN "description" SET DEFAULT ''''::text'::text';

ALTER TABLE ONLY "public"."blockDefs" ALTER COLUMN "description" SET DEFAULT '''''::text';

ALTER TABLE "public"."blocks" ALTER COLUMN "root_id" SET NOT NULL;

ALTER TABLE "public"."blockDefs" ALTER COLUMN "root_id" SET NOT NULL;

alter table "public"."blockDefs" drop constraint "blockDefs_root_id_fkey";

ALTER TABLE "public"."blockDefs" DROP COLUMN "root_id";

ALTER TABLE "public"."blockDefs" ADD COLUMN "root_id" jsonb;
ALTER TABLE "public"."blockDefs" ALTER COLUMN "root_id" DROP NOT NULL;

alter table "public"."blocks" drop constraint "blocks_root_id_fkey";

ALTER TABLE "public"."blocks" DROP COLUMN "root_id";

ALTER TABLE "public"."blocks" DROP COLUMN "control";

ALTER TABLE "public"."blockDefs" DROP COLUMN "root_id";

ALTER TABLE "public"."blockDefs" DROP COLUMN "control";
