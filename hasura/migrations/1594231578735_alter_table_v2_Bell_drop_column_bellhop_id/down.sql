ALTER TABLE "v2"."Bell" ADD COLUMN "bellhop_id" text;
ALTER TABLE "v2"."Bell" ALTER COLUMN "bellhop_id" DROP NOT NULL;
ALTER TABLE "v2"."Bell" ADD CONSTRAINT Bell_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES "v2"."Bellhop" (bellhop_id) ON DELETE cascade ON UPDATE cascade;
