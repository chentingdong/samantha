DELETE FROM public."blockDefs"
WHERE id='1skauzkTHAOgRKApKaoTd'
OR id='2vwPj9f5K7a21gjv90AOa'
OR id='3GKApRpyTYmgOQ9usbJti'
OR id='4FKApRpyTYmgOQ9usbJth'
OR id='5CwwM5Pef77ygZ6qHd6B3'
OR id='6EwwM5Pef77ygZ6qHd6a5';

INSERT INTO public."blockDefs"
(
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
  '1skauzkTHAOgRKApKaoTd',
  'SpendRequest',
  'General spend request form',
  'Form',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{"template": "SpendRequest"}',
  NULL
);

INSERT INTO public."blockDefs"
(
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
  '2vwPj9f5K7a21gjv90AOa',
  'SpendRequestApproval',
  'General spend request approval form',
  'Form',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{"template": "SpendRequestApproval"}',
  NULL
);


INSERT INTO public."blockDefs"
(
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
  '3GKApRpyTYmgOQ9usbJti',
  'ReTry decorator',
  'Retry the following decorated block',
  'Retry',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{"template": "ReTry"}',
  NULL
);

INSERT INTO public."blockDefs"
(
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
  '4FKApRpyTYmgOQ9usbJth',
  'Repeat decorator',
  'Repeat the decroated block',
  'Repeat',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{"template": "Repeat"}',
  NULL
);

INSERT INTO public."blockDefs"
(
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
  '5CwwM5Pef77ygZ6qHd6B3',
  'Inverter decorator',
  'Invert the children blocks in a sequencial block wrapper.',
  'Inverter',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{"template": "Inverter"}',
  NULL
);

INSERT INTO public."blockDefs"
(
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
  '6EwwM5Pef77ygZ6qHd6a5',
  'Conditional rules',
  'Pre conditional rules for the following decorated block',
  'Conditional',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{"template": "Conditional"}',
  NULL
);
