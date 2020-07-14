CREATE SCHEMA v2;
CREATE TABLE v2."Block" (
    id text NOT NULL,
    state text NOT NULL,
    type text NOT NULL,
    bell_id text,
    is_definition boolean DEFAULT false NOT NULL,
    configs jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone
);
CREATE TABLE v2."Executor" (
    CONSTRAINT block_type CHECK ((type = 'Executor'::text)) NO INHERIT
)
INHERITS (v2."Block");
CREATE TABLE v2."APIExecutor" (
    CONSTRAINT block_type CHECK ((type = 'APIExecutor'::text)) NO INHERIT
)
INHERITS (v2."Executor");
CREATE TABLE v2."Bell" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    owner_id text NOT NULL,
    initiator_id text NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    inputs jsonb DEFAULT '{}'::jsonb NOT NULL,
    outputs jsonb DEFAULT '{}'::jsonb NOT NULL,
    state text NOT NULL,
    root_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone,
    is_definition boolean DEFAULT false NOT NULL
);
CREATE TABLE v2."BellExecutor" (
    CONSTRAINT block_type CHECK ((type = 'BellExecutor'::text)) NO INHERIT
)
INHERITS (v2."Executor");
CREATE TABLE v2."Bellhop" (
    id text NOT NULL,
    name text NOT NULL,
    "Metadata" jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE v2."BellhopUser" (
    bellhop_id text NOT NULL,
    user_id text NOT NULL,
    role_id text NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE v2."BlockParentChildren" (
    parent_id text NOT NULL,
    child_id text NOT NULL,
    sibling_order integer NOT NULL
);
CREATE SEQUENCE v2."BlockParentChildren_sibling_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE v2."BlockParentChildren_sibling_order_seq" OWNED BY v2."BlockParentChildren".sibling_order;
CREATE TABLE v2."BlockState" (
    state text NOT NULL,
    comment text
);
CREATE TABLE v2."BlockType" (
    type text NOT NULL,
    category text
);
CREATE TABLE v2."Control" (
    CONSTRAINT block_type CHECK ((type = 'Control'::text)) NO INHERIT
)
INHERITS (v2."Block");
CREATE TABLE v2."Decorator" (
    CONSTRAINT block_type CHECK ((type = 'Decorator'::text)) NO INHERIT
)
INHERITS (v2."Block");
CREATE TABLE v2."HumanTask" (
    requestor_id text,
    assignee_id text,
    CONSTRAINT block_type CHECK ((type = 'HumanTask'::text)) NO INHERIT
)
INHERITS (v2."Block");
CREATE TABLE v2."FormTask" (
    title text,
    theme jsonb,
    fields jsonb,
    logic jsonb,
    CONSTRAINT block_type CHECK ((type = 'FormTask'::text)) NO INHERIT
)
INHERITS (v2."HumanTask");
CREATE TABLE v2."Role" (
    id text NOT NULL,
    name text NOT NULL
);
CREATE TABLE v2."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE ONLY v2."APIExecutor" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."APIExecutor" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."APIExecutor" ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE ONLY v2."APIExecutor" ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE ONLY v2."BellExecutor" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."BellExecutor" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."BellExecutor" ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE ONLY v2."BellExecutor" ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE ONLY v2."BlockParentChildren" ALTER COLUMN sibling_order SET DEFAULT nextval('v2."BlockParentChildren_sibling_order_seq"'::regclass);
ALTER TABLE ONLY v2."Control" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."Control" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."Control" ALTER COLUMN created_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."Control" ALTER COLUMN updated_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."Decorator" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."Decorator" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."Decorator" ALTER COLUMN created_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."Decorator" ALTER COLUMN updated_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."Executor" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."Executor" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."Executor" ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE ONLY v2."Executor" ALTER COLUMN updated_at SET DEFAULT now();
ALTER TABLE ONLY v2."FormTask" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."FormTask" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."FormTask" ALTER COLUMN created_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."FormTask" ALTER COLUMN updated_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."HumanTask" ALTER COLUMN is_definition SET DEFAULT false;
ALTER TABLE ONLY v2."HumanTask" ALTER COLUMN configs SET DEFAULT '{}'::jsonb;
ALTER TABLE ONLY v2."HumanTask" ALTER COLUMN created_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."HumanTask" ALTER COLUMN updated_at SET DEFAULT NULL;
ALTER TABLE ONLY v2."Bell"
    ADD CONSTRAINT "Bell_root_id_key" UNIQUE (root_id);
ALTER TABLE ONLY v2."BellhopUser"
    ADD CONSTRAINT "BellhopUser_pkey" PRIMARY KEY (bellhop_id, user_id, role_id);
ALTER TABLE ONLY v2."Bellhop"
    ADD CONSTRAINT "Bellhop_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY v2."BlockParentChildren"
    ADD CONSTRAINT "BlockParentChildren_pkey" PRIMARY KEY (parent_id, child_id);
ALTER TABLE ONLY v2."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY v2."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY v2."Bell"
    ADD CONSTRAINT bell_pkey PRIMARY KEY (id);
ALTER TABLE ONLY v2."BlockState"
    ADD CONSTRAINT "blockState_pkey" PRIMARY KEY (state);
ALTER TABLE ONLY v2."BlockType"
    ADD CONSTRAINT "blockType_pkey" PRIMARY KEY (type);
ALTER TABLE ONLY v2."Block"
    ADD CONSTRAINT block_pkey PRIMARY KEY (id);
ALTER TABLE ONLY v2."Bell"
    ADD CONSTRAINT "Bell_initiator_fkey" FOREIGN KEY (initiator_id) REFERENCES v2."Bellhop"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."Bell"
    ADD CONSTRAINT "Bell_owner_fkey" FOREIGN KEY (owner_id) REFERENCES v2."Bellhop"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."Bell"
    ADD CONSTRAINT "Bell_root_id_fkey" FOREIGN KEY (root_id) REFERENCES v2."Block"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."Bell"
    ADD CONSTRAINT "Bell_state_fkey" FOREIGN KEY (state) REFERENCES v2."BlockState"(state) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."BellhopUser"
    ADD CONSTRAINT "BellhopUser_bellhop_id_fkey" FOREIGN KEY (bellhop_id) REFERENCES v2."Bellhop"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."BellhopUser"
    ADD CONSTRAINT "BellhopUser_role_id_fkey" FOREIGN KEY (role_id) REFERENCES v2."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."BellhopUser"
    ADD CONSTRAINT "BellhopUser_user_id_fkey" FOREIGN KEY (user_id) REFERENCES v2."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."BlockParentChildren"
    ADD CONSTRAINT "BlockParentChildren_child_id_fkey" FOREIGN KEY (child_id) REFERENCES v2."Block"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."BlockParentChildren"
    ADD CONSTRAINT "BlockParentChildren_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES v2."Block"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."Block"
    ADD CONSTRAINT "Block_bell_id_fkey" FOREIGN KEY (bell_id) REFERENCES v2."Bell"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."HumanTask"
    ADD CONSTRAINT "HumanTask_assignee_id_fkey" FOREIGN KEY (assignee_id) REFERENCES v2."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."HumanTask"
    ADD CONSTRAINT "HumanTask_requestor_id_fkey" FOREIGN KEY (requestor_id) REFERENCES v2."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."Block"
    ADD CONSTRAINT block_state_fkey FOREIGN KEY (state) REFERENCES v2."BlockState"(state) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY v2."Block"
    ADD CONSTRAINT block_type_fkey FOREIGN KEY (type) REFERENCES v2."BlockType"(type) ON UPDATE CASCADE ON DELETE CASCADE;
