
ALTER TABLE "v2"."User" ADD COLUMN "family_name" text NULL;

ALTER TABLE "v2"."User" ADD COLUMN "given_name" text NULL;

ALTER TABLE "v2"."User" ADD COLUMN "picture" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "family_name" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "given_name" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "picture" text NULL;
