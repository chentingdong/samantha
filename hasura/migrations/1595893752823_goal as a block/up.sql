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
    main_bell_id text
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
    created_at text DEFAULT now() NOT NULL,
    updated_at text DEFAULT now() NOT NULL,
    started_at text,
    parent_id text,
    sibling_order integer,
    name text
);
CREATE TABLE m2.form_tasks (
    id text NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    fields jsonb DEFAULT '{}'::jsonb NOT NULL,
    logic jsonb DEFAULT '{}'::jsonb NOT NULL,
    theme jsonb DEFAULT '{}'::jsonb NOT NULL,
    CONSTRAINT block_type CHECK ((type = 'FormTask'::text))
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
CREATE TABLE m2.user_task_participations (
    user_id text NOT NULL,
    task_id text NOT NULL,
    role text NOT NULL,
    id integer NOT NULL,
    CONSTRAINT user_task_role CHECK (((role = 'task_requestor'::text) OR (role = 'task_assignee'::text) OR (role = 'task_follower'::text)))
);
CREATE SEQUENCE m2.user_task_participations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE m2.user_task_participations_id_seq OWNED BY m2.user_task_participations.id;
CREATE TABLE m2.users (
    id text NOT NULL,
    name text NOT NULL,
    email text,
    family_name text,
    given_name text,
    picture text
);
ALTER TABLE ONLY m2.bellhop_bell_participations ALTER COLUMN id SET DEFAULT nextval('m2.bellhop_bell_participations_id_seq'::regclass);
ALTER TABLE ONLY m2.bellhop_memberships ALTER COLUMN id SET DEFAULT nextval('m2.bellhop_memberships_id_seq'::regclass);
ALTER TABLE ONLY m2.user_bell_participations ALTER COLUMN id SET DEFAULT nextval('m2.user_bell_participations_id_seq'::regclass);
ALTER TABLE ONLY m2.user_task_participations ALTER COLUMN id SET DEFAULT nextval('m2.user_task_participations_id_seq'::regclass);

INSERT INTO m2.block_state (id, attribute) VALUES ('Created', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Running', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Success', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Failure', NULL);
INSERT INTO m2.block_state (id, attribute) VALUES ('Draft', NULL);
INSERT INTO m2.bells (id, name, description, context, inputs, outputs, state, is_definition, created_at, updated_at, started_at, root_block_id, acts_as_main_bell, main_bell_id) VALUES ('2jB_SkDO3vd9lLNObfm9_', 'Facilities Purchase', NULL, '{}', '{}', '{}', 'Created', false, '2020-07-20 22:03:53.679588+00', '2020-07-20 22:03:53.679588+00', NULL, 'fa2FrFUiBE_zjiYn4Bag3', true, '2jB_SkDO3vd9lLNObfm9_');
INSERT INTO m2.bells (id, name, description, context, inputs, outputs, state, is_definition, created_at, updated_at, started_at, root_block_id, acts_as_main_bell, main_bell_id) VALUES ('udWPBL3HJZCjY18m0zTU-', 'Finance Approval', NULL, '{}', '{}', '{}', 'Created', false, '2020-07-20 21:37:48.312417+00', '2020-07-20 21:37:48.312417+00', NULL, '7FLJEEKhtR_GAjXP9XtW-', false, '2jB_SkDO3vd9lLNObfm9_');
INSERT INTO m2.block_type (id, category) VALUES ('Sequence', 'Control');
INSERT INTO m2.block_type (id, category) VALUES ('Parallel', 'Control');
INSERT INTO m2.block_type (id, category) VALUES ('FormTask', 'Task');
INSERT INTO m2.block_type (id, category) VALUES ('APIExecutor', 'Executor');
INSERT INTO m2.block_type (id, category) VALUES ('Decorator', 'Decorator');
INSERT INTO m2.block_type (id, category) VALUES ('ConversationalAgent', 'Task');
INSERT INTO m2.block_type (id, category) VALUES ('Goal', 'Control');
INSERT INTO m2.block_type (id, category) VALUES ('BellExecutor', 'Executor');
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, created_at, updated_at, started_at, parent_id, sibling_order, name) VALUES ('zbUDdWDQRqMuEdv7_mCNt', 'zbUDdWDQRqMuEdv7_mCNt', '2jB_SkDO3vd9lLNObfm9_', 'Created', 'FormTask', false, '{}', '2020-07-20 22:01:10.36194+00', '2020-07-20 22:01:10.36194+00', NULL, 'fa2FrFUiBE_zjiYn4Bag3', NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, created_at, updated_at, started_at, parent_id, sibling_order, name) VALUES ('fa2FrFUiBE_zjiYn4Bag3', 'fa2FrFUiBE_zjiYn4Bag3', '2jB_SkDO3vd9lLNObfm9_', 'Created', 'Sequence', false, '{}', '2020-07-20 22:00:06.802138+00', '2020-07-20 22:00:06.802138+00', NULL, NULL, 1, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, created_at, updated_at, started_at, parent_id, sibling_order, name) VALUES ('7FLJEEKhtR_GAjXP9XtW-', '7FLJEEKhtR_GAjXP9XtW-', 'udWPBL3HJZCjY18m0zTU-', 'Created', 'FormTask', false, '{}', '2020-07-20 21:49:29.601438+00', '2020-07-20 21:49:29.601438+00', NULL, NULL, NULL, NULL);
INSERT INTO m2.blocks (id, local_id, bell_id, state, type, is_definition, configs, created_at, updated_at, started_at, parent_id, sibling_order, name) VALUES ('B0ZlcVk452H8Ofq4aCegW', 'B0ZlcVk452H8Ofq4aCegW', '2jB_SkDO3vd9lLNObfm9_', 'Created', 'BellExecutor', false, '{}', '2020-07-20 22:15:48.258462+00', '2020-07-20 22:15:48.258462+00', NULL, 'fa2FrFUiBE_zjiYn4Bag3', 2, NULL);
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('6U0uG2uaSVCOgFW_6RU0G', 'Facilities', '{}', NULL, '2020-07-20 21:32:05.280057+00', '2020-07-20 21:32:05.280057+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('1ibkm0rWaBenw4GvR2_HA', 'Marketing', '{}', NULL, '2020-07-20 21:32:15.007791+00', '2020-07-20 21:32:15.007791+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('5N7DVIvQIV0dBGx89q9r2', 'Finance', '{}', NULL, '2020-07-20 21:32:24.717504+00', '2020-07-20 21:32:24.717504+00');
INSERT INTO m2.bellhops (id, name, metadata, profile_image_url, created_at, updated_at) VALUES ('rSIbpHk-JU4Rca7sF4Z7A', 'Legal', '{}', NULL, '2020-07-20 21:32:32.292195+00', '2020-07-20 21:32:32.292195+00');
INSERT INTO m2.participation_roles (id, attribute) VALUES ('task_assignee', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('bell_initiator', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('bell_owner', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('task_requestor', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('task_follower', NULL);
INSERT INTO m2.participation_roles (id, attribute) VALUES ('bell_follower', NULL);
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id) VALUES ('6U0uG2uaSVCOgFW_6RU0G', '2jB_SkDO3vd9lLNObfm9_', 'bell_owner', 1);
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
INSERT INTO m2.form_tasks (id, type, title, fields, logic, theme) VALUES ('7FLJEEKhtR_GAjXP9XtW-', 'FormTask', 'Spend Request Approval', '{}', '{}', '{}');
INSERT INTO m2.form_tasks (id, type, title, fields, logic, theme) VALUES ('zbUDdWDQRqMuEdv7_mCNt', 'FormTask', 'Gather Info', '{}', '{}', '{}');
INSERT INTO m2.user_bell_participations (user_id, represented_bellhop_id, bell_id, role, id) VALUES ('Google_115419186368884878540', NULL, '2jB_SkDO3vd9lLNObfm9_', 'bell_initiator', 1);
INSERT INTO m2.user_bell_participations (user_id, represented_bellhop_id, bell_id, role, id) VALUES ('Google_115419186368884878540', NULL, '2jB_SkDO3vd9lLNObfm9_', 'bell_follower', 2);
SELECT pg_catalog.setval('m2.bellhop_bell_participations_id_seq', 1, true);
SELECT pg_catalog.setval('m2.bellhop_memberships_id_seq', 10, true);
SELECT pg_catalog.setval('m2.user_bell_participations_id_seq', 2, true);
SELECT pg_catalog.setval('m2.user_task_participations_id_seq', 1, false);

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
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.goals
    ADD CONSTRAINT goals_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.participation_roles
    ADD CONSTRAINT participation_role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.membership_roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participations_pkey PRIMARY KEY (role, user_id, bell_id);
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_pkey PRIMARY KEY (user_id, task_id, role);
ALTER TABLE ONLY m2.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
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
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_type_id_fkey FOREIGN KEY (type, id) REFERENCES m2.blocks(type, id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.goals
    ADD CONSTRAINT goals_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_represented_bellhop_id_fkey FOREIGN KEY (represented_bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_task_id_fkey FOREIGN KEY (task_id) REFERENCES m2.form_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
