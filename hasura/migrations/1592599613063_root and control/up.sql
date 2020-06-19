ALTER TABLE "public"."blockDefs"
ADD COLUMN "control" jsonb NOT NULL DEFAULT '{}';
ALTER TABLE "public"."blockDefs"
ADD COLUMN "root_id" jsonb NOT NULL;
ALTER TABLE "public"."blocks"
ADD COLUMN "control" jsonb NOT NULL DEFAULT '{}';
ALTER TABLE "public"."blocks"
ADD COLUMN "root_id" text NOT NULL;
alter table "public"."blocks"
add constraint "blocks_root_id_fkey" foreign key ("root_id") references "public"."blocks" ("id") on update restrict on delete restrict;
ALTER TABLE "public"."blockDefs" DROP COLUMN "root_id" CASCADE;
ALTER TABLE "public"."blockDefs"
ADD COLUMN "root_id" text NOT NULL;
alter table "public"."blockDefs"
add constraint "blockDefs_root_id_fkey" foreign key ("root_id") references "public"."blockDefs" ("id") on update restrict on delete restrict;
ALTER TABLE "public"."blockDefs"
ALTER COLUMN "root_id" DROP NOT NULL;
ALTER TABLE "public"."blocks"
ALTER COLUMN "root_id" DROP NOT NULL;
ALTER TABLE ONLY "public"."blockDefs"
ALTER COLUMN "description"
SET DEFAULT '''::text';
ALTER TABLE "public"."blockDefs"
ALTER COLUMN "description" DROP DEFAULT;
ALTER TABLE "public"."blocks"
ALTER COLUMN "description" DROP DEFAULT;
INSERT INTO public."blockType" (value, comment)
VALUES ('Conditional', 'Decorator');
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    '8CwwM5Pef77ygZ6qH-6B3',
    'SpendRequestForm',
    '',
    'Form',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{"formComponent": "SpendRequestForm"}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'G5KApRpyTYmgOQ9usbJth',
    'SpendRequestApproval',
    '',
    'Form',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{"formComponent": "SpendRequestApproval"}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'u8spNZtyin3aRjZY5WAUC',
    'Sequence',
    '',
    'Sequence',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'cc1FHNsIM29O38xtzwl6m',
    'ParallelAll',
    '',
    'ParallelAll',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'emRlRT_5ykANhaIvwR4iY',
    'ParallelAny',
    '',
    'ParallelAny',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    '8kk_uzkWEAOgRKApK-oTX',
    'Repeat',
    '',
    'Repeat',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'xqJFRjJlGL5Zct8zPvXqA',
    'Retry',
    '',
    'Retry',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'Kx1fiup4aJ83TwMkm2hHZ',
    'ManualSelector',
    '',
    'ManualSelector',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'VKfLQPYLg8WQsafGpm9jo',
    'SubTree',
    '',
    'Subtree',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public."blockDefs" (
    id,
    name,
    description,
    type,
    state,
    props,
    parent_id,
    created_at,
    last_updated,
    control,
    root_id
  )
VALUES (
    'vMDgc5devAzeZMnamBtrx',
    'Selector',
    '',
    'Selector',
    'Draft',
    '{}',
    NULL,
    '2020-06-19 20:30:47.339+00',
    '2020-06-19 20:30:47.339+00',
    '{}',
    NULL
  );
INSERT INTO public.users (id, name, email)
VALUES (
    'Google_111918078641246610063',
    'Baiji He',
    'bhe@bellhop.io'
  ) ON CONFLICT ON CONSTRAINT users_pkey DO NOTHING;
INSERT INTO public.users (id, name, email)
VALUES (
    'Google_109551792009621810100',
    'Adam Hiatt',
    'ahiatt@bellhop.io'
  ) ON CONFLICT ON CONSTRAINT users_pkey DO NOTHING;
INSERT INTO public.users (id, name, email)
VALUES (
    'Google_115419186368884878540',
    'Tingdong Chen',
    'tchen@bellhop.io'
  ) ON CONFLICT ON CONSTRAINT users_pkey DO NOTHING;