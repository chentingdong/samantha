INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'Google_111918078641246610063',
    'member',
    '2020-07-20 21:33:29.122427+00'
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at)
VALUES (
    '1ibkm0rWaBenw4GvR2_HA',
    'Google_109551792009621810100',
    'approver',
    '2020-07-20 21:33:50.181203+00'
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'Google_109551792009621810100',
    'approver',
    '2020-07-20 21:33:57.904538+00'
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at)
VALUES (
    'rSIbpHk-JU4Rca7sF4Z7A',
    'Google_115419186368884878540',
    'admin',
    '2020-07-20 21:34:18.852356+00'
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'Google_115419186368884878540',
    'manager',
    '2020-07-22 05:38:08.557555+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    created_at,
    updated_at,
    started_at,
    parent_id,
    sibling_order
  )
VALUES (
    'fa2FrFUiBE_zjiYn4Bag3',
    'fa2FrFUiBE_zjiYn4Bag3',
    NULL,
    'Created',
    'Sequence',
    false,
    '{}',
    '2020-07-20 22:00:06.802138+00',
    '2020-07-20 22:00:06.802138+00',
    NULL,
    NULL,
    1
  );  
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    created_at,
    updated_at,
    started_at,
    parent_id,
    sibling_order
  )
VALUES (
    'B0ZlcVk452H8Ofq4aCegW',
    'B0ZlcVk452H8Ofq4aCegW',
    NULL,
    'Created',
    'GoalExecutor',
    false,
    '{}',
    '2020-07-20 22:15:48.258462+00',
    '2020-07-20 22:15:48.258462+00',
    NULL,
    'fa2FrFUiBE_zjiYn4Bag3',
    2
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    created_at,
    updated_at,
    started_at,
    parent_id,
    sibling_order
  )
VALUES (
    'zbUDdWDQRqMuEdv7_mCNt',
    'zbUDdWDQRqMuEdv7_mCNt',
    NULL,
    'Created',
    'FormTask',
    false,
    '{}',
    '2020-07-20 22:01:10.36194+00',
    '2020-07-20 22:01:10.36194+00',
    NULL,
    'fa2FrFUiBE_zjiYn4Bag3',
    NULL
  );

INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    created_at,
    updated_at,
    started_at,
    parent_id,
    sibling_order
  )
VALUES (
    '7FLJEEKhtR_GAjXP9XtW-',
    '7FLJEEKhtR_GAjXP9XtW-',
    NULL,
    'Created',
    'FormTask',
    false,
    '{}',
    '2020-07-20 21:49:29.601438+00',
    '2020-07-20 21:49:29.601438+00',
    NULL,
    NULL,
    NULL
  );
INSERT INTO m2.form_tasks (id, type, title, fields, logic, theme)
VALUES (
    '7FLJEEKhtR_GAjXP9XtW-',
    'FormTask',
    'Spend Request Approval',
    '{}',
    '{}',
    '{}'
  );
INSERT INTO m2.form_tasks (id, type, title, fields, logic, theme)
VALUES (
    'zbUDdWDQRqMuEdv7_mCNt',
    'FormTask',
    'Gather Info',
    '{}',
    '{}',
    '{}'
  );
INSERT INTO m2.goal_executors (id, type, goal_id)
VALUES (
    'B0ZlcVk452H8Ofq4aCegW',
    'GoalExecutor',
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    goal_name,
    acts_as_main_bell,
    main_bell_id,
    goal_order,
    success_conditions
  )
VALUES (
    '2jB_SkDO3vd9lLNObfm9_',
    'Facilities Purchase',
    NULL,
    '{}',
    '{}',
    '{}',
    'Created',
    false,
    '2020-07-20 22:03:53.679588+00',
    '2020-07-20 22:03:53.679588+00',
    NULL,
    'fa2FrFUiBE_zjiYn4Bag3',
    'Facilities Purchase',
    true,
    NULL,
    1,
    '{}'
  );
UPDATE m2.blocks
SET bell_id = '2jB_SkDO3vd9lLNObfm9_'
WHERE id IN (
    'fa2FrFUiBE_zjiYn4Bag3',
    'zbUDdWDQRqMuEdv7_mCNt',
    'B0ZlcVk452H8Ofq4aCegW'
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    goal_name,
    acts_as_main_bell,
    main_bell_id,
    goal_order,
    success_conditions
  )
VALUES (
    'udWPBL3HJZCjY18m0zTU-',
    'Finance Approval',
    NULL,
    '{}',
    '{}',
    '{}',
    'Created',
    false,
    '2020-07-20 21:37:48.312417+00',
    '2020-07-20 21:37:48.312417+00',
    NULL,
    '7FLJEEKhtR_GAjXP9XtW-',
    'Approve the spend request',
    false,
    '2jB_SkDO3vd9lLNObfm9_',
    2,
    '{}'
  );
UPDATE m2.blocks
SET bell_id = 'udWPBL3HJZCjY18m0zTU-'
WHERE id IN ('7FLJEEKhtR_GAjXP9XtW-');
UPDATE m2.goal_executors
SET goal_id = 'udWPBL3HJZCjY18m0zTU-'
WHERE id IN ('B0ZlcVk452H8Ofq4aCegW');
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    '2jB_SkDO3vd9lLNObfm9_',
    'bell_owner'
  );
INSERT INTO m2.user_bell_participations (user_id, represented_bellhop_id, bell_id, role)
VALUES (
    'Google_115419186368884878540',
    NULL,
    '2jB_SkDO3vd9lLNObfm9_',
    'bell_initiator'
  );
INSERT INTO m2.user_bell_participations (user_id, represented_bellhop_id, bell_id, role)
VALUES (
    'Google_115419186368884878540',
    NULL,
    '2jB_SkDO3vd9lLNObfm9_',
    'bell_follower'
  );
