
CREATE TABLE "public"."BlockState"("value" text NOT NULL, "comment" text, PRIMARY KEY ("value") );

CREATE TABLE "public"."BlockDefState"("value" text NOT NULL, "comment" text, PRIMARY KEY ("value") );

CREATE TABLE "public"."BlockType"("value" text NOT NULL, "comment" text, PRIMARY KEY ("value") );

ALTER TABLE "public"."BlockType" ADD COLUMN "category" text NULL;

CREATE TABLE "public"."Block"("id" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "type" text NOT NULL, "state" text NOT NULL, "context" jsonb NOT NULL, "props" jsonb NOT NULL, "parent_id" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "last_updated" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );

CREATE TABLE "public"."BlockDef"("id" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL DEFAULT '''', "type" text NOT NULL, "state" text NOT NULL, "props" jsonb NOT NULL DEFAULT '{}', "parent_id" text, "created_at" timestamptz NOT NULL, "last_updated" timestamptz NOT NULL, PRIMARY KEY ("id") );

ALTER TABLE "public"."Block" ALTER COLUMN "parent_id" DROP NOT NULL;

ALTER TABLE ONLY "public"."Block" ALTER COLUMN "description" SET DEFAULT '''';

ALTER TABLE ONLY "public"."Block" ALTER COLUMN "context" SET DEFAULT '{}';

ALTER TABLE ONLY "public"."Block" ALTER COLUMN "props" SET DEFAULT '{}';

CREATE TABLE "public"."User"("id" text NOT NULL, "name" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("id") );

ALTER TABLE "public"."BlockType" DROP COLUMN "category" CASCADE;

alter table "public"."Block"
           add constraint "Block_state_fkey"
           foreign key ("state")
           references "public"."BlockState"
           ("value") on update restrict on delete restrict;

alter table "public"."Block"
           add constraint "Block_type_fkey"
           foreign key ("type")
           references "public"."BlockType"
           ("value") on update restrict on delete restrict;

alter table "public"."BlockDef"
           add constraint "BlockDef_state_fkey"
           foreign key ("state")
           references "public"."BlockDefState"
           ("value") on update restrict on delete restrict;

alter table "public"."BlockDef"
           add constraint "BlockDef_type_fkey"
           foreign key ("type")
           references "public"."BlockType"
           ("value") on update restrict on delete restrict;

CREATE TABLE "public"."_requestors"("block_id" text NOT NULL, "user_id" text NOT NULL, PRIMARY KEY ("block_id","user_id") );

CREATE TABLE "public"."_responders"("block_id" text NOT NULL, "user_id" text NOT NULL, PRIMARY KEY ("block_id","user_id") );

alter table "public"."_requestors" add constraint "_requestors_block_id_user_id_key" unique ("block_id", "user_id");

alter table "public"."_requestors" drop constraint "_requestors_block_id_user_id_key";

alter table "public"."_requestors"
           add constraint "_requestors_block_id_fkey"
           foreign key ("block_id")
           references "public"."Block"
           ("id") on update cascade on delete cascade;

alter table "public"."_requestors"
           add constraint "_requestors_user_id_fkey"
           foreign key ("user_id")
           references "public"."User"
           ("id") on update cascade on delete cascade;

alter table "public"."_responders"
           add constraint "_responders_block_id_fkey"
           foreign key ("block_id")
           references "public"."Block"
           ("id") on update cascade on delete cascade;

alter table "public"."_responders"
           add constraint "_responders_user_id_fkey"
           foreign key ("user_id")
           references "public"."User"
           ("id") on update cascade on delete cascade;
