
alter table "public"."_responders" drop constraint "_responders_user_id_fkey";

alter table "public"."_responders" drop constraint "_responders_block_id_fkey";

alter table "public"."_requestors" drop constraint "_requestors_user_id_fkey";

alter table "public"."_requestors" drop constraint "_requestors_block_id_fkey";

alter table "public"."_requestors" add constraint "_requestors_block_id_user_id_key" unique ("block_id", "user_id");

alter table "public"."_requestors" drop constraint "_requestors_block_id_user_id_key";

DROP TABLE "public"."_responders";

DROP TABLE "public"."_requestors";

alter table "public"."BlockDef" drop constraint "BlockDef_type_fkey";

alter table "public"."BlockDef" drop constraint "BlockDef_state_fkey";

alter table "public"."Block" drop constraint "Block_type_fkey";

alter table "public"."Block" drop constraint "Block_state_fkey";

ALTER TABLE "public"."BlockType" ADD COLUMN "category" text;
ALTER TABLE "public"."BlockType" ALTER COLUMN "category" DROP NOT NULL;

DROP TABLE "public"."User";

ALTER TABLE ONLY "public"."Block" ALTER COLUMN "props" DROP DEFAULT;

ALTER TABLE ONLY "public"."Block" ALTER COLUMN "context" DROP DEFAULT;

ALTER TABLE ONLY "public"."Block" ALTER COLUMN "description" DROP DEFAULT;

ALTER TABLE "public"."Block" ALTER COLUMN "parent_id" SET NOT NULL;

DROP TABLE "public"."BlockDef";

DROP TABLE "public"."Block";

ALTER TABLE "public"."BlockType" DROP COLUMN "category";

DROP TABLE "public"."BlockType";

DROP TABLE "public"."BlockDefState";

DROP TABLE "public"."BlockState";
