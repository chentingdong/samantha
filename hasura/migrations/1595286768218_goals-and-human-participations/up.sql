DROP SCHEMA m2 CASCADE;

CREATE SCHEMA m2;
CREATE TABLE m2.bellhop_bell_participations (
    bellhop_id text NOT NULL,
    bell_id text NOT NULL,
    role text NOT NULL,
    CONSTRAINT bellhop_bell_role CHECK (((role = 'bell_owner'::text) OR (role = 'bell_initiator'::text)))
);
CREATE TABLE m2.bellhop_memberships (
    bellhop_id text NOT NULL,
    user_id text NOT NULL,
    role text NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL
);
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
    goal_name text NOT NULL,
    acts_as_main_bell boolean DEFAULT true NOT NULL,
    main_bell_id text,
    goal_order integer DEFAULT 0 NOT NULL,
    success_conditions jsonb DEFAULT '{}'::jsonb NOT NULL
);
CREATE TABLE m2.block_state (
    state text NOT NULL,
    attribute text
);
CREATE TABLE m2.block_type (
    type text NOT NULL,
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
    sibling_order integer
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
CREATE TABLE m2.goal_executors (
    id text NOT NULL,
    type text NOT NULL,
    goal_id text NOT NULL,
    CONSTRAINT block_type CHECK ((type = 'GoalExecutor'::text))
);
CREATE TABLE m2.membership_roles (
    role text NOT NULL,
    attribute text
);
CREATE TABLE m2.participation_roles (
    role text NOT NULL,
    attribute text
);
CREATE TABLE m2.user_bell_participations (
    user_id text NOT NULL,
    represented_bellhop_id text,
    bell_id text NOT NULL,
    role text NOT NULL,
    CONSTRAINT user_bell_role CHECK (((role = 'bell_initiator'::text) OR (role = 'bell_follower'::text)))
);
CREATE TABLE m2.user_task_participations (
    user_id text NOT NULL,
    task_id text NOT NULL,
    role text NOT NULL,
    CONSTRAINT user_task_role CHECK (((role = 'task_requestor'::text) OR (role = 'task_assignee'::text) OR (role = 'task_follower'::text)))
);
CREATE TABLE m2.users (
    id text NOT NULL,
    name text NOT NULL,
    email text,
    family_name text,
    given_name text,
    picture text
);
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
    ADD CONSTRAINT block_state_pkey PRIMARY KEY (state);
ALTER TABLE ONLY m2.block_type
    ADD CONSTRAINT block_type_pkey PRIMARY KEY (type);
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
ALTER TABLE ONLY m2.goal_executors
    ADD CONSTRAINT goal_executors_goal_id_key UNIQUE (goal_id);
ALTER TABLE ONLY m2.goal_executors
    ADD CONSTRAINT goal_executors_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.goal_executors
    ADD CONSTRAINT goal_executors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.participation_roles
    ADD CONSTRAINT participation_role_pkey PRIMARY KEY (role);
ALTER TABLE ONLY m2.membership_roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role);
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participations_pkey PRIMARY KEY (role, user_id, bell_id);
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_pkey PRIMARY KEY (user_id, task_id, role);
ALTER TABLE ONLY m2.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
    ADD CONSTRAINT bellhop_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(role) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_role_fkey FOREIGN KEY (role) REFERENCES m2.membership_roles(role) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bellhop_memberships
    ADD CONSTRAINT bellhop_membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_main_bell_id_fkey FOREIGN KEY (main_bell_id) REFERENCES m2.bells(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_root_block_id_fkey FOREIGN KEY (root_block_id) REFERENCES m2.blocks(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(state) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES m2.blocks(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(state) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_type_fkey FOREIGN KEY (type) REFERENCES m2.block_type(type) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_type_id_fkey FOREIGN KEY (type, id) REFERENCES m2.blocks(type, id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.goal_executors
    ADD CONSTRAINT goal_executors_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.goal_executors
    ADD CONSTRAINT goal_executors_type_id_fkey FOREIGN KEY (type, id) REFERENCES m2.blocks(type, id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_represented_bellhop_id_fkey FOREIGN KEY (represented_bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(role) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_bell_participations
    ADD CONSTRAINT user_bell_participation_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(role) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_task_id_fkey FOREIGN KEY (task_id) REFERENCES m2.form_tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_task_participations
    ADD CONSTRAINT user_task_participations_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
