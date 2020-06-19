CREATE TABLE "public"."BlockState"(
  "value" text NOT NULL,
  "comment" text,
  PRIMARY KEY ("value")
);
CREATE TABLE "public"."BlockDefState"(
  "value" text NOT NULL,
  "comment" text,
  PRIMARY KEY ("value")
);
CREATE TABLE "public"."BlockType"(
  "value" text NOT NULL,
  "comment" text,
  PRIMARY KEY ("value")
);
ALTER TABLE "public"."BlockType"
ADD COLUMN "category" text NULL;
CREATE TABLE "public"."Block"(
  "id" text NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "type" text NOT NULL,
  "state" text NOT NULL,
  "context" jsonb NOT NULL,
  "props" jsonb NOT NULL,
  "parent_id" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "last_updated" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);
CREATE TABLE "public"."BlockDef"(
  "id" text NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL DEFAULT '''',
  "type" text NOT NULL,
  "state" text NOT NULL,
  "props" jsonb NOT NULL DEFAULT '{}',
  "parent_id" text,
  "created_at" timestamptz NOT NULL,
  "last_updated" timestamptz NOT NULL,
  PRIMARY KEY ("id")
);
ALTER TABLE "public"."Block"
ALTER COLUMN "parent_id" DROP NOT NULL;
ALTER TABLE ONLY "public"."Block"
ALTER COLUMN "description"
SET DEFAULT '''';
ALTER TABLE ONLY "public"."Block"
ALTER COLUMN "context"
SET DEFAULT '{}';
ALTER TABLE ONLY "public"."Block"
ALTER COLUMN "props"
SET DEFAULT '{}';
CREATE TABLE "public"."User"(
  "id" text NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  PRIMARY KEY ("id")
);
ALTER TABLE "public"."BlockType" DROP COLUMN "category" CASCADE;
alter table "public"."Block"
add constraint "Block_state_fkey" foreign key ("state") references "public"."BlockState" ("value") on update restrict on delete restrict;
alter table "public"."Block"
add constraint "Block_type_fkey" foreign key ("type") references "public"."BlockType" ("value") on update restrict on delete restrict;
alter table "public"."BlockDef"
add constraint "BlockDef_state_fkey" foreign key ("state") references "public"."BlockDefState" ("value") on update restrict on delete restrict;
alter table "public"."BlockDef"
add constraint "BlockDef_type_fkey" foreign key ("type") references "public"."BlockType" ("value") on update restrict on delete restrict;
CREATE TABLE "public"."_requestors"(
  "block_id" text NOT NULL,
  "user_id" text NOT NULL,
  PRIMARY KEY ("block_id", "user_id")
);
CREATE TABLE "public"."_responders"(
  "block_id" text NOT NULL,
  "user_id" text NOT NULL,
  PRIMARY KEY ("block_id", "user_id")
);
alter table "public"."_requestors"
add constraint "_requestors_block_id_user_id_key" unique ("block_id", "user_id");
alter table "public"."_requestors" drop constraint "_requestors_block_id_user_id_key";
alter table "public"."_requestors"
add constraint "_requestors_block_id_fkey" foreign key ("block_id") references "public"."Block" ("id") on update cascade on delete cascade;
alter table "public"."_requestors"
add constraint "_requestors_user_id_fkey" foreign key ("user_id") references "public"."User" ("id") on update cascade on delete cascade;
alter table "public"."_responders"
add constraint "_responders_block_id_fkey" foreign key ("block_id") references "public"."Block" ("id") on update cascade on delete cascade;
alter table "public"."_responders"
add constraint "_responders_user_id_fkey" foreign key ("user_id") references "public"."User" ("id") on update cascade on delete cascade;

INSERT INTO public."BlockState" (value, comment)
VALUES ('Created', NULL);
INSERT INTO public."BlockState" (value, comment)
VALUES ('Ready', NULL);
INSERT INTO public."BlockState" (value, comment)
VALUES ('Running', NULL);
INSERT INTO public."BlockState" (value, comment)
VALUES ('Success', NULL);
INSERT INTO public."BlockState" (value, comment)
VALUES ('Failure', NULL);
INSERT INTO public."BlockType" (value, comment)
VALUES ('API', NULL);
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'BlackboardCondition',
    'The Blackboard node will check to see if a value is set on the given Blackboard Key.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'Selector',
    'Selector Nodes execute their children from left to right. They stop executing when one of their children succeeds. If a Selector''s child succeeds, the Selector succeeds. If all the Selector''s children fail, the Selector fails.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'Sequence',
    'Sequence nodes execute their children from left to right. They stop executing when one of their children fails. If a child fails, then the Sequence fails. If all the Sequence''s children succeed, then the Sequence succeeds.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'ParallelAll',
    'ParallelAll nodes execute all their children at the same time. If a child fails, then the ParallelAll fails. If all the Sequence''s children succeed, then the ParallelAll succeeds.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES ('HumanForm', NULL);
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'ParallelAny',
    'ParallelAny nodes execute all their children at the same time. If a ParallelAny''s child succeeds, the ParallelAny succeeds. If all the ParallelAny''s children fail, the ParallelAny fails.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'ManualSelector',
    'ManualSelector Nodes allow human to choose which children to execute. If any selected child fails, then the ManualSelector fails. If all the ManualSelector''s selected children succeed, then the ManualSelector succeeds.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES (
    'FinishWithResult',
    'The Finish With Result Task node can be used to instantly finish with a given result. This node can be used to force a branch to exit or continue based on the defined result.'
  );
INSERT INTO public."BlockType" (value, comment)
VALUES ('BehaviorTree', 'The root node.');
INSERT INTO public."BlockType" (value, comment)
VALUES ('SubTree', 'Run a BehaviorTree');
INSERT INTO public."BlockType" (value, comment)
VALUES ('Timeout', NULL);
INSERT INTO public."BlockType" (value, comment)
VALUES ('Loop', NULL);
INSERT INTO public."BlockType" (value, comment)
VALUES ('Conditional', NULL);
INSERT INTO public."BlockType" (value, comment)
VALUES ('Inverter', NULL);
INSERT INTO public."BlockDefState" (value, comment)
VALUES ('Draft', NULL);
INSERT INTO public."BlockDefState" (value, comment)
VALUES ('Published', NULL);
