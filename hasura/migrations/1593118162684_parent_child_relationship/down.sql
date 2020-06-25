
ALTER TABLE "public"."blockDefs" ADD COLUMN "parent_id" text;
ALTER TABLE "public"."blockDefs" ALTER COLUMN "parent_id" DROP NOT NULL;

alter table "public"."blockDefs" add foreign key ("parent_id") references "public"."blockDefs"("id") on update restrict on delete restrict;

DROP TABLE "public"."blockDef_parent_child";

ALTER TABLE "public"."blocks" ADD COLUMN "parent_id" text;
ALTER TABLE "public"."blocks" ALTER COLUMN "parent_id" DROP NOT NULL;

alter table "public"."blocks" add foreign key ("parent_id") references "public"."blocks"("id") on update restrict on delete restrict;

DROP TABLE "public"."block_parent_child";
