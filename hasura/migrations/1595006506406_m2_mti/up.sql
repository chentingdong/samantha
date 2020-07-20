DROP SCHEMA v2 CASCADE;
CREATE SCHEMA m2;
CREATE TABLE m2.bellhop_membership (
    bellhop_id text NOT NULL,
    user_id text NOT NULL,
    role_id text NOT NULL,
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
    bellhop_owner_id text NOT NULL,
    bellhop_initiator_id text,
    user_initiator_id text,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    inputs jsonb DEFAULT '{}'::jsonb NOT NULL,
    outputs jsonb DEFAULT '{}'::jsonb NOT NULL,
    state text DEFAULT 'Draft'::text NOT NULL,
    is_definition boolean DEFAULT false NOT NULL,
    private boolean DEFAULT false NOT NULL,
    menu_order integer,
    can_act_as_subbell boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone,
    root_block_id text
);
CREATE TABLE m2.block_composition (
    parent_id text NOT NULL,
    child_id text NOT NULL,
    sibling_order text,
    created_at text DEFAULT now() NOT NULL
);
CREATE TABLE m2.block_state (
    state text NOT NULL,
    comment text
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
    started_at text
);
CREATE TABLE m2.form_tasks (
    id text NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    fields jsonb DEFAULT '{}'::jsonb NOT NULL,
    logic jsonb DEFAULT '{}'::jsonb NOT NULL,
    theme jsonb DEFAULT '{}'::jsonb NOT NULL,
    user_requestor_id text,
    user_assignee_id text,
    CONSTRAINT block_type CHECK ((type = 'FormTask'::text))
);
CREATE TABLE m2.roles (
    id text NOT NULL,
    name text NOT NULL
);
CREATE TABLE m2.users (
    id text NOT NULL,
    name text NOT NULL,
    email text,
    family_name text,
    given_name text,
    picture text
);
ALTER TABLE ONLY m2.bellhop_membership
    ADD CONSTRAINT bellhop_membership_pkey PRIMARY KEY (bellhop_id, user_id, role_id);
ALTER TABLE ONLY m2.bellhops
    ADD CONSTRAINT bellhops_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_root_block_id_key UNIQUE (root_block_id);
ALTER TABLE ONLY m2.block_composition
    ADD CONSTRAINT block_composition_pkey PRIMARY KEY (parent_id, child_id);
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
    ADD CONSTRAINT form_tasks_pkey PRIMARY KEY (id, type);
ALTER TABLE ONLY m2.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.bellhop_membership
    ADD CONSTRAINT bellhop_membership_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_membership
    ADD CONSTRAINT bellhop_membership_role_id_fkey FOREIGN KEY (role_id) REFERENCES m2.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_membership
    ADD CONSTRAINT bellhop_membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_bellhop_initiator_id_fkey FOREIGN KEY (bellhop_initiator_id) REFERENCES m2.bellhops(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_bellhop_owner_id_fkey FOREIGN KEY (bellhop_owner_id) REFERENCES m2.bellhops(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_root_block_id_fkey FOREIGN KEY (root_block_id) REFERENCES m2.blocks(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(state) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bells
    ADD CONSTRAINT bells_user_initiator_id_fkey FOREIGN KEY (user_initiator_id) REFERENCES m2.users(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.block_composition
    ADD CONSTRAINT block_composition_child_id_fkey FOREIGN KEY (child_id) REFERENCES m2.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.block_composition
    ADD CONSTRAINT block_composition_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES m2.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(state) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
    ADD CONSTRAINT blocks_type_fkey FOREIGN KEY (type) REFERENCES m2.block_type(type) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_type_id_fkey FOREIGN KEY (type, id) REFERENCES m2.blocks(type, id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_user_assignee_id_fkey FOREIGN KEY (user_assignee_id) REFERENCES m2.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.form_tasks
    ADD CONSTRAINT form_tasks_user_requestor_id_fkey FOREIGN KEY (user_requestor_id) REFERENCES m2.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

