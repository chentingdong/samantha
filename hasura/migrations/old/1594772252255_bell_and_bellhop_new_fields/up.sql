
ALTER TABLE "v2"."Bell" ADD COLUMN "private" boolean NOT NULL DEFAULT false;

ALTER TABLE "v2"."Bell" ADD COLUMN "menu_order" integer NULL;

ALTER TABLE "v2"."Bell" ADD COLUMN "can_act_as_subbell" boolean NOT NULL DEFAULT false;

ALTER TABLE "v2"."Bellhop" ADD COLUMN "profile_image_url" text NULL;
