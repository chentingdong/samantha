DROP SCHEMA m2 CASCADE;
CREATE SCHEMA m2;
CREATE TABLE m2.bell_executors (
    id text NOT NULL,
    type text NOT NULL,
    bell_id text,
    CONSTRAINT block_type CHECK ((type = 'BellExecutor'::text))
);
CREATE TABLE m2.bellhop_bell_participations (
    bellhop_id text NOT NULL,
    bell_id text NOT NULL,
    role text NOT NULL,
    id integer NOT NULL,
    CONSTRAINT bellhop_bell_role CHECK (((role = 'bell_owner'::text) OR (role = 'bell_initiator'::text)))
);
CREATE SEQUENCE m2.bellhop_bell_participations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE m2.bellhop_bell_participations_id_seq OWNED BY m2.bellhop_bell_participations.id;
CREATE TABLE m2.bellhop_memberships (
    bellhop_id text NOT NULL,
    user_id text NOT NULL,
    role text NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL,
    id integer NOT NULL
);
CREATE SEQUENCE m2.bellhop_memberships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE m2.bellhop_memberships_id_seq OWNED BY m2.bellhop_memberships.id;
CREATE TABLE m2.bellhops (
    id text NOT NULL,
    name text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    profile_image_url text,
    created_at text DEFAULT now() NOT NULL,
    updated_at text DEFAULT now() NOT NULL
);
CREATE TABLE m2.bells (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    inputs jsonb DEFAULT '{}'::jsonb NOT NULL,
    outputs jsonb DEFAULT '{}'::jsonb NOT NULL,
    state text DEFAULT 'Draft'::text NOT NULL,
    is_definition boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone,
    root_block_id text,
    acts_as_main_bell boolean DEFAULT true NOT NULL,
    main_bell_id text,
    ended_at timestamp with time zone
);
CREATE TABLE m2.block_state (
    id text NOT NULL,
    attribute text
);
CREATE TABLE m2.block_type (
    id text NOT NULL,
    category text NOT NULL
);
CREATE TABLE m2.blocks (
    id text NOT NULL,
    local_id text NOT NULL,
    bell_id text,
    state text DEFAULT 'Draft'::text NOT NULL,
    type text NOT NULL,
    is_definition boolean DEFAULT false NOT NULL,
    configs jsonb DEFAULT '{}'::jsonb NOT NULL,
    parent_id text,
    sibling_order integer,
    name text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone,
    ended_at timestamp with time zone
);
CREATE TABLE m2.goals (
    id text NOT NULL,
    type text NOT NULL,
    goal_name text,
    success_conditions jsonb DEFAULT '{}'::jsonb NOT NULL,
    CONSTRAINT block_type CHECK ((type = 'Goal'::text))
);
CREATE TABLE m2.membership_roles (
    id text NOT NULL,
    attribute text
);
CREATE TABLE m2.participation_roles (
    id text NOT NULL,
    attribute text
);
CREATE TABLE m2.tasks (
    id text NOT NULL,
    type text NOT NULL,
    title text,
    fields jsonb DEFAULT '{}'::jsonb NOT NULL,
    CONSTRAINT block_type CHECK ((type = 'Task'::text))
);
CREATE TABLE m2.user_bell_participations (
    user_id text NOT NULL,
    represented_bellhop_id text,
    bell_id text NOT NULL,
    role text NOT NULL,
    id integer NOT NULL,
    CONSTRAINT user_bell_role CHECK (((role = 'bell_initiator'::text) OR (role = 'bell_follower'::text)))
);
CREATE SEQUENCE m2.user_bell_participations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE m2.user_bell_participations_id_seq OWNED BY m2.user_bell_participations.id;
CREATE TABLE m2.user_block_participations (
    user_id text NOT NULL,
    block_id text NOT NULL,
    role text NOT NULL,
    id integer NOT NULL
);
CREATE SEQUENCE m2.user_block_participations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE m2.user_block_participations_id_seq OWNED BY m2.user_block_participations.id;
CREATE TABLE m2.users (
    id text NOT NULL,
    name text NOT NULL,
    email text,
    family_name text,
    given_name text,
    picture text
);


INSERT INTO m2.block_state (id, attribute) VALUES ('Created', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Running', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Success', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Failure', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Draft', NULL);
INSERT INTO m2.bells (id, name, description, context, inputs, outputs, state, is_definition, created_at, updated_at, started_at, root_block_id, acts_as_main_bell, main_bell_id, ended_at) VALUES ('s4Uq5-3xUX5bljHUIJMLW', 'Facilities Purchase Request', 'Get purchase request, have dept. leads approve, and have Finance approve.', '{}', '{}', '{}', 'Running', false, '2020-07-30 07:37:49.40117+00', '2020-07-30 07:37:49.40117+00', NULL, '11OPQ53T10ju7GYERgBOP', true, NULL, NULL);
INSERT INTO m2.bells (id, name, description, context, inputs, outputs, state, is_definition, created_at, updated_at, started_at, root_block_id, acts_as_main_bell, main_bell_id, ended_at) VALUES ('Mz1t1IwyheFE5oVYwkJPW', 'Large Spend Approval Request', NULL, '{}', '{}', '{}', 'Created', false, '2020-07-31 17:37:10.704903+00', '2020-07-31 17:37:10.704903+00', NULL, 'QwnivOlovwLzVHcCN1wZF', true, 's4Uq5-3xUX5bljHUIJMLW', NULL);
INSERT INTO m2.block_type (id, category) VALUES ('APIExecutor', 'Executor');
INSERT INTO m2.block_type (id, category) VALUES ('BellExecutor', 'Executor');
INSERT INTO m2.block_type (id, category) VALUES ('Task', 'Task');
INSERT INTO m2.block_type (id, category) VALUES ('Goal', 'Goal');
INSERT INTO m2.block_type (id, category) VALUES ('Notification', 'Executor');
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('0vNN_nHW0jc87jo-s8XPd', '7Q1HhUA6rtEsZQVLIsSCk', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'Goal', false, '{"control_type": "Parallel", "pre_conditions": [{"op": ">", "lhs": "${Block.by_local_id=1234}.response", "rhs": 10000}]}', '11OPQ53T10ju7GYERgBOP', 1, 'Conditional Goal (Get All Approvals)', '2020-07-30 08:41:13.975206+00', '2020-07-30 08:41:13.975206+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('bVeXuHvMlUVpbM2e4zMy9', 'rJnhPkEpzbL_KnF6uBBD1', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'Goal', false, '{"control_type": "Sequential"}', '11OPQ53T10ju7GYERgBOP', 0, 'Goal (Get Purchasing Information)', '2020-07-30 07:41:03.980018+00', '2020-07-30 07:41:03.980018+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('QwnivOlovwLzVHcCN1wZF', 'VIwcpLa_dfw0jBLlU6rK0', 'Mz1t1IwyheFE5oVYwkJPW', 'Created', 'Goal', false, '{"control_type": "Sequential"}', NULL, NULL, 'Goal (Finance Team Spend Approval)', '2020-07-31 17:42:28.149388+00', '2020-07-31 17:42:28.149388+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('w7WjLJgmw-8IcoJPwymUV', 'sTOp8e44a9NdJweWr828_', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'APIExecutor', false, '{"API": {"input": {"bellhop_id": "$(Context.Global.Bellhop_Initiator.ID)"}}}', 'bVeXuHvMlUVpbM2e4zMy9', 1, 'API (Lookup Cost Center by Initiator''s Bellhop ID)', '2020-07-30 08:17:15.205561+00', '2020-07-30 08:17:15.205561+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('05rDLPiegRuF7-f72D-PK', 'Fw2rwZaa27CIyilQKNqge', 's4Uq5-3xUX5bljHUIJMLW', 'Success', 'Task', false, '{}', 'bVeXuHvMlUVpbM2e4zMy9', 2, 'Task (What categories describe this purchase?)', '2020-07-30 08:17:57.465675+00', '2020-07-30 08:17:57.465675+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('G-M8ECueR0697Gx8buehJ', 'vuJeHylhqX0YbTVtgDsZ7', 's4Uq5-3xUX5bljHUIJMLW', 'Success', 'Task', false, '{}', 'bVeXuHvMlUVpbM2e4zMy9', 3, 'Task (How much do you need to budget?)', '2020-07-30 08:19:26.854575+00', '2020-07-30 08:19:26.854575+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('QwpfcdLPH_iQqzbz7nFg-', 'ZKinThbIS7TwdHA49RpZp', 's4Uq5-3xUX5bljHUIJMLW', 'Running', 'Task', false, '{}', 'bVeXuHvMlUVpbM2e4zMy9', 4, 'Optional Task (Is it capitalizable?)', '2020-07-30 08:20:08.788528+00', '2020-07-30 08:20:08.788528+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('WWazDMHYOxCXCgTyND2js', 'zFi6jh6a-pkIEXi1_8-md', 's4Uq5-3xUX5bljHUIJMLW', 'Success', 'Task', false, '{"pre_conditions": [{"op": "eq", "lhs": "${Block.by_local_id=1234}.response", "rhs": "Yes"}]}', 'bVeXuHvMlUVpbM2e4zMy9', 5, 'Conditional Task: (What is the depreciation period?)', '2020-07-30 08:29:20.515691+00', '2020-07-30 08:29:20.515691+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('ZmafozjAljqxYe5jn4voG', 'OfuLt7QWe8HTV5ArYLjza', 's4Uq5-3xUX5bljHUIJMLW', 'Success', 'Notification', false, '{"recipients": [], "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}', 'bVeXuHvMlUVpbM2e4zMy9', 6, 'UI Notification (Summarize Purchase Information)', '2020-07-30 08:37:42.861179+00', '2020-07-30 08:37:42.861179+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('dsobfMA_-Bm_hfa4OJ7kC', 'NnYT4CUJgPEZexz0Io4JL', 'Mz1t1IwyheFE5oVYwkJPW', 'Created', 'Notification', false, '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}', 'QwnivOlovwLzVHcCN1wZF', 0, 'UI Notification (Summarize Spend Information)', '2020-07-31 17:44:29.45459+00', '2020-07-31 17:44:29.45459+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('11OPQ53T10ju7GYERgBOP', 'H2_a_Rk3ay03OozK5aeyK', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'Goal', false, '{"control_type": "Sequential"}', NULL, NULL, 'Main Goal (Facilities Spend Request)', '2020-07-30 07:39:47.197711+00', '2020-07-30 07:39:47.197711+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('emfJCl6E2Dc32GXQtf4FO', 'Qa9j-wSS3YZFMPcKiy7rM', 'Mz1t1IwyheFE5oVYwkJPW', 'Created', 'Task', false, '{}', 'QwnivOlovwLzVHcCN1wZF', 1, 'Task (Dir. of FP&A Approval)', '2020-07-31 17:46:39.466706+00', '2020-07-31 17:46:39.466706+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('QWhbnWC7Esg2UwIVIbbfG', '8o_yyJjEDKmhsRA1gIlv7', 's4Uq5-3xUX5bljHUIJMLW', 'Success', 'Task', false, '{}', '0vNN_nHW0jc87jo-s8XPd', NULL, 'Task (Head of Facilities Approval)', '2020-07-30 08:47:52.045784+00', '2020-07-30 08:47:52.045784+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('f9-D98KF8ZHvNn5GIhBGw', '2tAIiTBtJXmVC2xF_Wcr4', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'APIExecutor', false, '{}', '790hOnMXtRMBWhiZetAIK', NULL, 'API (Update Netsuite/SAP)', '2020-07-30 08:52:04.838542+00', '2020-07-30 08:52:04.838542+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('tuqfR-7bTIsyHXgiq8XSP', 'qzUHD8X2uc6Qomg2Oh7iM', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'BellExecutor', false, '{}', '0vNN_nHW0jc87jo-s8XPd', NULL, 'Sub Bell (Finance Approval) (bell_id incomplete)', '2020-07-30 08:49:50.491672+00', '2020-07-30 08:49:50.491672+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('HttfA2gqDC5Uek_WD-rpn', 'cO64qn3wioY6O7h_LOi-L', 's4Uq5-3xUX5bljHUIJMLW', 'Running', 'Task', false, '{}', 'bVeXuHvMlUVpbM2e4zMy9', 0, 'Task (What are you purchasing?)', '2020-07-30 07:42:49.683987+00', '2020-07-30 07:42:49.683987+00', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, parent_id, sibling_order, name, created_at, updated_at, started_at, ended_at) VALUES ('790hOnMXtRMBWhiZetAIK', '38CVmndMM-H1xXEIkWvrH', 's4Uq5-3xUX5bljHUIJMLW', 'Created', 'Goal', false, '{}', '11OPQ53T10ju7GYERgBOP', 2, 'Goal (Execute Purchase)', '2020-07-30 08:51:25.1418+00', '2020-07-30 08:51:25.1418+00', NULL, NULL);
INSERT INTO m2.bell_executors (id, type, bell_id) VALUES ('tuqfR-7bTIsyHXgiq8XSP', 'BellExecutor', 'Mz1t1IwyheFE5oVYwkJPW');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('6U0uG2uaSVCOgFW_6RU0G', 'Facilities', '{}', NULL, '2020-07-20 21:32:05.280057+00', '2020-07-20 21:32:05.280057+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('1ibkm0rWaBenw4GvR2_HA', 'Marketing', '{}', NULL, '2020-07-20 21:32:15.007791+00', '2020-07-20 21:32:15.007791+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('5N7DVIvQIV0dBGx89q9r2', 'Finance', '{}', NULL, '2020-07-20 21:32:24.717504+00', '2020-07-20 21:32:24.717504+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('rSIbpHk-JU4Rca7sF4Z7A', 'Legal', '{}', NULL, '2020-07-20 21:32:32.292195+00', '2020-07-20 21:32:32.292195+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('kK70A5g3BM9mjbHQoYnjL', 'Purchasing Team', '{}', NULL, '2020-07-30 07:22:44.257982+00', '2020-07-30 07:22:44.257982+00');
INSERT INTO m2.participation_roles (id, attribute) VALUES ('task_assignee', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('bell_initiator', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('bell_owner', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('task_requestor', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('task_follower', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('bell_follower', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('goal_assignee', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('goal_follower', NULL);
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id) VALUES ('kK70A5g3BM9mjbHQoYnjL', 's4Uq5-3xUX5bljHUIJMLW', 'bell_owner', 2);
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id) VALUES ('6U0uG2uaSVCOgFW_6RU0G', 's4Uq5-3xUX5bljHUIJMLW', 'bell_initiator', 3);
INSERT INTO m2.membership_roles (id, attribute) VALUES ('admin', NULL);
INSERT INTO m2.membership_roles (id, attribute) VALUES ('approver', NULL);
INSERT INTO m2.membership_roles (id, attribute) VALUES ('member', NULL);
INSERT INTO m2.membership_roles (id, attribute) VALUES ('manager', NULL);
INSERT INTO m2.users (id, name, email, family_name, given_name, picture) VALUES ('Google_113132363560941198349', 'Ben Werther', 'bwerther@bellhop.io', 'Werther', 'Ben', 'https://lh3.googleusercontent.com/a-/AOh14GiBUMCJtUOa3-tU490ZvIEDVrq93riaTc-iWg9P=s96-c');
INSERT INTO m2.users (id, name, email, family_name, given_name, picture) VALUES ('Google_111918078641246610063', 'Baiji He', 'bhe@bellhop.io', 'He', 'Baiji', 'https://lh3.googleusercontent.com/a-/AOh14Ghb68OwaaY2L8jaT0shFyIHT4ZaukDMnyPyUCnY=s96-c');
INSERT INTO m2.users (id, name, email, family_name, given_name, picture) VALUES ('Google_109551792009621810100', 'Adam Hiatt', 'ahiatt@bellhop.io', 'Hiatt', 'Adam', 'https://lh6.googleusercontent.com/-c-UyBv5uH2E/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn0pRn1sP_ehaZlcruXojR5zShqFA/s96-c/photo.jpg');
INSERT INTO m2.users (id, name, email, family_name, given_name, picture) VALUES ('Google_115419186368884878540', 'Tingdong Chen', 'tchen@bellhop.io', 'Chen', 'Tingdong', 'https://lh3.googleusercontent.com/a-/AOh14GiewYead-zagD_r1jSjTcZ4QCoIW9GQoc_Bzb3m=s96-c');
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('6U0uG2uaSVCOgFW_6RU0G', 'Google_111918078641246610063', 'member', '2020-07-20 21:33:29.122427+00', 1);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('1ibkm0rWaBenw4GvR2_HA', 'Google_109551792009621810100', 'approver', '2020-07-20 21:33:50.181203+00', 2);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('5N7DVIvQIV0dBGx89q9r2', 'Google_109551792009621810100', 'approver', '2020-07-20 21:33:57.904538+00', 3);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('rSIbpHk-JU4Rca7sF4Z7A', 'Google_115419186368884878540', 'admin', '2020-07-20 21:34:18.852356+00', 4);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('6U0uG2uaSVCOgFW_6RU0G', 'Google_115419186368884878540', 'manager', '2020-07-22 05:38:08.557555+00', 5);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('6U0uG2uaSVCOgFW_6RU0G', 'Google_113132363560941198349', 'member', '2020-07-24 03:20:28.987126+00', 9);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('5N7DVIvQIV0dBGx89q9r2', 'Google_111918078641246610063', 'manager', '2020-07-24 22:15:41.394778+00', 10);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id) VALUES ('kK70A5g3BM9mjbHQoYnjL', 'Google_111918078641246610063', 'manager', '2020-07-30 07:23:07.551902+00', 11);
INSERT INTO m2.goals (id, type, goal_name, success_conditions) VALUES ('11OPQ53T10ju7GYERgBOP', 'Goal', 'Facilities Spend Request', '{}');
INSERT INTO m2.goals (id, type, goal_name, success_conditions) VALUES ('bVeXuHvMlUVpbM2e4zMy9', 'Goal', 'Get Purchase Information', '{}');
INSERT INTO m2.goals (id, type, goal_name, success_conditions) VALUES ('0vNN_nHW0jc87jo-s8XPd', 'Goal', 'Get All Approvals', '{}');
INSERT INTO m2.goals (id, type, goal_name, success_conditions) VALUES ('790hOnMXtRMBWhiZetAIK', 'Goal', 'Execute Purchase', '{}');
INSERT INTO m2.goals (id, type, goal_name, success_conditions) VALUES ('QwnivOlovwLzVHcCN1wZF', 'Goal', 'Finance Team Spend Approval', '{}');
INSERT INTO m2.tasks (id, type, title, fields) VALUES ('QWhbnWC7Esg2UwIVIbbfG', 'Task', NULL, '[{"optional": false, "question": "Do you approve this purchase?", "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]');
INSERT INTO m2.tasks (id, type, title, fields) VALUES ('QwpfcdLPH_iQqzbz7nFg-', 'Task', NULL, '[{"optional": true, "question": "Is it capitalizable?", "response": "No", "response_type": "SingleSelect", "select_options": ["Yes", "No"]}]');
INSERT INTO m2.tasks (id, type, title, fields) VALUES ('WWazDMHYOxCXCgTyND2js', 'Task', NULL, '[{"optional": true, "question": "What is the depreciation period", "response": "10+ years", "response_type": "SingleSelect", "select_options": ["<5 years", "5-10 years", "10+ years"]}]');
INSERT INTO m2.tasks (id, type, title, fields) VALUES ('G-M8ECueR0697Gx8buehJ', 'Task', NULL, '[{"optional": false, "question": "How much do you need to budget in dollars?", "response": 1234, "min_value": 0, "response_type": "Decimal"}]');
INSERT INTO m2.tasks (id, type, title, fields) VALUES ('HttfA2gqDC5Uek_WD-rpn', 'Task', NULL, '[{"optional": false, "question": "What are you purchasing?", "response": "A new HVAC machine", "response_type": "Text", "max_field_size": 128, "min_field_size": 4}]');
INSERT INTO m2.tasks (id, type, title, fields) VALUES ('05rDLPiegRuF7-f72D-PK', 'Task', NULL, '[{"optional": false, "question": "What categories describe this purchase?", "response": "Heating/Cooling", "response_type": "MultiSelect", "select_options": ["Heating/Cooling", "services", "other"]}]');
INSERT INTO m2.user_bell_participations (user_id, represented_bellhop_id, bell_id, role, id) VALUES ('Google_109551792009621810100', NULL, 's4Uq5-3xUX5bljHUIJMLW', 'bell_follower', 3);
INSERT INTO m2.user_bell_participations (user_id, represented_bellhop_id, bell_id, role, id) VALUES ('Google_115419186368884878540', NULL, 's4Uq5-3xUX5bljHUIJMLW', 'bell_initiator', 4);
INSERT INTO m2.user_block_participations (user_id, block_id, role, id) VALUES ('Google_115419186368884878540', 'HttfA2gqDC5Uek_WD-rpn', 'task_assignee', 1);
INSERT INTO m2.user_block_participations (user_id, block_id, role, id) VALUES ('Google_109551792009621810100', 'QwpfcdLPH_iQqzbz7nFg-', 'task_follower', 2);
INSERT INTO m2.user_block_participations (user_id, block_id, role, id) VALUES ('Google_109551792009621810100', '790hOnMXtRMBWhiZetAIK', 'task_follower', 3);
SELECT pg_catalog.setval('m2.bellhop_bell_participations_id_seq', 3, true);
SELECT pg_catalog.setval('m2.bellhop_memberships_id_seq', 11, true);
SELECT pg_catalog.setval('m2.user_bell_participations_id_seq', 4, true);
SELECT pg_catalog.setval('m2.user_block_participations_id_seq', 3, true);

ALTER TABLE ONLY m2.bellhop_bell_participations ALTER COLUMN id SET DEFAULT nextval('m2.bellhop_bell_participations_id_seq'::regclass);
ALTER TABLE ONLY m2.bellhop_memberships ALTER COLUMN id SET DEFAULT nextval('m2.bellhop_memberships_id_seq'::regclass);
ALTER TABLE ONLY m2.user_bell_participations ALTER COLUMN id SET DEFAULT nextval('m2.user_bell_participations_id_seq'::regclass);
ALTER TABLE ONLY m2.user_block_participations ALTER COLUMN id SET DEFAULT nextval('m2.user_block_participations_id_seq'::regclass);
ALTER TABLE ONLY m2.bell_executors
    ADD CONSTRAINT bell_executors_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.bell_executors
    ADD CONSTRAINT bell_executors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_pkey PRIMARY KEY (bellhop_id, bell_id, role);
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_pkey PRIMARY KEY (bellhop_id, user_id, role);
ALTER TABLE ONLY m2.bellhops
    ADD CONSTRAINT bellhops_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_root_block_id_key UNIQUE (root_block_id);
ALTER TABLE ONLY m2.block_state
    ADD CONSTRAINT block_state_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.block_type
    ADD CONSTRAINT block_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_bell_id_local_id_key UNIQUE (bell_id, local_id);
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.goals
    ADD CONSTRAINT goals_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.participation_roles
    ADD CONSTRAINT participation_role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.membership_roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.tasks
    ADD CONSTRAINT tasks_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participations_pkey PRIMARY KEY (role, user_id, bell_id);
ALTER TABLE ONLY m2.user_block_participations
    ADD CONSTRAINT user_block_participations_pkey PRIMARY KEY (user_id, block_id, role);
ALTER TABLE ONLY m2.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER update_bells_ended_at BEFORE UPDATE ON m2.bells FOR EACH ROW WHEN (((old.state = 'Running'::text) AND (new.state = ANY (ARRAY['Success'::text, 'Failure'::text])))) EXECUTE PROCEDURE public.update_ended_at();
CREATE TRIGGER update_bells_started_at BEFORE UPDATE ON m2.bells FOR EACH ROW WHEN (((old.state = ANY (ARRAY['Created'::text, 'Drafted'::text])) AND (new.state = 'Running'::text))) EXECUTE PROCEDURE public.update_started_at();
CREATE TRIGGER update_blocks_ended_at BEFORE UPDATE ON m2.blocks FOR EACH ROW WHEN (((old.state = 'Running'::text) AND (new.state = ANY (ARRAY['Success'::text, 'Failure'::text])))) EXECUTE PROCEDURE public.update_ended_at();
CREATE TRIGGER update_blocks_started_at BEFORE UPDATE ON m2.blocks FOR EACH ROW WHEN (((old.state = ANY (ARRAY['Created'::text, 'Drafted'::text])) AND (new.state = 'Running'::text))) EXECUTE PROCEDURE public.update_started_at();
ALTER TABLE ONLY m2.bell_executors
    ADD CONSTRAINT bell_executors_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bell_executors
    ADD CONSTRAINT bell_executors_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_role_fkey FOREIGN KEY (role) REFERENCES m2.membership_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_main_bell_id_fkey FOREIGN KEY (main_bell_id) REFERENCES m2.bells(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_root_block_id_fkey FOREIGN KEY (root_block_id) REFERENCES m2.blocks(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES m2.blocks(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_type_fkey FOREIGN KEY (type) REFERENCES m2.block_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.goals
    ADD CONSTRAINT goals_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.tasks
    ADD CONSTRAINT tasks_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_represented_bellhop_id_fkey FOREIGN KEY (represented_bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_block_participations
    ADD CONSTRAINT user_block_participations_block_id_fkey FOREIGN KEY (block_id) REFERENCES m2.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_block_participations
    ADD CONSTRAINT user_block_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_block_participations
    ADD CONSTRAINT user_block_participations_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
