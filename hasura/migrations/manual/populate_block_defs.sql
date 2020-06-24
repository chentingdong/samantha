DELETE FROM public."blockDefs"
WHERE id='1skauzkTHAOgRKApKaoTd'
OR id='2vwPj9f5K7a21gjv90AOa'
OR id='3GKApRpyTYmgOQ9usbJti'
OR id='4FKApRpyTYmgOQ9usbJth'
OR id='5CwwM5Pef77ygZ6qHd6B3'
OR id='6EwwM5Pef77ygZ6qHd6a5'
OR id='7quSzlVKDIC38bfn7LYVn'
OR id='8vTzQ089fdxyDDOsJJz3f'
OR id='9VqoAzKt77SZRXgxCK2Q5'
OR id='10HThzJHtxEiP4KGjvx9J'
OR id='11HBSOKvg2XV_XQZfFM0d';

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
  'Marketing Spend Request',
  '1. Root Bell for Marketing Spend Request',
  'Sequence',
  'Draft',
  '{}',
  NULL,
  '2020-06-23 20:30:47.339+00',
  '2020-06-23 20:30:47.339+00',
  '{}',
  '1skauzkTHAOgRKApKaoTd'
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
  'SpendRequest',
  '2. Marketing team spend request form',
  'Form',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{
    "forms": [{
      "template": "SpendRequestApproval",
      "data": {}
    }]
  }',
  '1skauzkTHAOgRKApKaoTd'
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
  'SpendRequestApproval',
  '3. Marketing team spend request approval form for director of perf marketing',
  'Form',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{
    "forms": [{
      "template": "SpendRequestApproval",
      "data": {}
    }]
  }',
  '1skauzkTHAOgRKApKaoTd'
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
  'LargeSpendRequestApproval',
  '4. Marketing team large spend request need approval from VP of marketing',
  'Form',
  'Draft',
  '{}',
  NULL,
  '2020-06-23 20:30:47.339+00',
  '2020-06-23 20:30:47.339+00',
  '{
    "decorators": [{
      "template": "Conditional",
      "data": [{
        "all": [{
          "fact": "SpendRequest.spend",
          "operator": "greaterThan",
          "value": 10000
        }]
      }]
    }],
    "forms": [{
      "template": "SpendRequest",
      "data": {
        "name": "Spend Request Approval",
        "description": "Need approval"
      }
    }]
  }',
  '1skauzkTHAOgRKApKaoTd'
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
  'FinanceTeamApproval',
  '5. Finance team Approval sequence wrapper',
  'Sequence',
  'Draft',
  '{}',
  NULL,
  '2020-06-23 20:30:47.339+00',
  '2020-06-23 20:30:47.339+00',
  '{}',
  '1skauzkTHAOgRKApKaoTd'
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
  'CheckTeamBudgetForApproval',
  '6. Finance Check Team Budget for Approval',
  'Form',
  'Draft',
  '{}',
  '5CwwM5Pef77ygZ6qHd6B3',
  '2020-06-23 20:30:47.339+00',
  '2020-06-23 20:30:47.339+00',
  '{
    "forms": [{
      "template": "SpendRequestApproval",
      "data": {}
    }]
  }',
  '1skauzkTHAOgRKApKaoTd'
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
  '7quSzlVKDIC38bfn7LYVn',
  'LargeSpendRequestApproval',
  '7. Finance team Large Spend Request Approval',
  'Form',
  'Draft',
  '{}',
  '5CwwM5Pef77ygZ6qHd6B3',
  '2020-06-23 21:30:47.339+00',
  '2020-06-23 21:30:47.339+00',
  '{
    "decorators": [{
      "template": "Conditional",
      "data": [{
        "all": [{
          "fact": "SpendRequest.spend",
          "operator": "greaterThan",
          "value": 25000
        }]
      }]
    }],
    "forms": [{
      "template": "SpendRequest",
      "data": {
        "name": "Spend Request Approval",
        "description": "Need approval"
      }
    }]
  }',
  '1skauzkTHAOgRKApKaoTd'
);


-- Decorators

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
  '8vTzQ089fdxyDDOsJJz3f',
  'Retry decorator',
  'Retry the following decorated block',
  'Retry',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{
    "forms": [{
      "template": "Retry",
      "data": {}
    }]
  }',
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
  '9VqoAzKt77SZRXgxCK2Q5',
  'Repeat decorator',
  'Repeat the decroated block',
  'Repeat',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{
    "forms": [{
      "template": "Repeat",
      "data": {}
    }]
  }',
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
  '10HThzJHtxEiP4KGjvx9J',
  'Inverter decorator',
  'Invert the children blocks in a sequencial block wrapper.',
  'Inverter',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{
    "forms": [{
      "template": "Inverter",
      "data": {}
    }]
  }',
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
  '11HBSOKvg2XV_XQZfFM0d',
  'Conditional rules',
  'Pre conditional rules for the following decorated block',
  'Conditional',
  'Draft',
  '{}',
  NULL,
  '2020-06-22 20:30:47.339+00',
  '2020-06-22 20:30:47.339+00',
  '{
    "forms": [{
      "template": "Conditional",
      "data": {}
    }]
  }',
  NULL
);