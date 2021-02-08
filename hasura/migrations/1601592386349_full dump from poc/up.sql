CREATE FUNCTION public.update_ended_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.ended_at = now();
    RETURN NEW; 
END;
$$;
CREATE FUNCTION public.update_started_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.started_at = now();
    RETURN NEW; 
END;
$$;
CREATE TABLE public.bells (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    state text NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_updated timestamp with time zone DEFAULT now() NOT NULL,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    root_block_id text
);
CREATE TABLE public."blockDefState" (
    value text NOT NULL,
    comment text
);
CREATE TABLE public."blockDef_parent_child" (
    parent_id text NOT NULL,
    child_id text NOT NULL,
    sibling_order integer NOT NULL
);
CREATE SEQUENCE public."blockDef_parent_child_sibling_order_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."blockDef_parent_child_sibling_order_seq" OWNED BY public."blockDef_parent_child".sibling_order;
CREATE TABLE public."blockDef_requestor" (
    "blockDef_id" text NOT NULL,
    user_id text NOT NULL
);
CREATE TABLE public."blockDef_responder" (
    "blockDef_id" text NOT NULL,
    user_id text NOT NULL
);
CREATE TABLE public."blockDefs" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    type text NOT NULL,
    state text NOT NULL,
    props jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_updated timestamp with time zone DEFAULT now() NOT NULL,
    control jsonb DEFAULT '{}'::jsonb NOT NULL,
    root_id text
);
CREATE TABLE public."blockState" (
    value text NOT NULL,
    comment text
);
CREATE TABLE public."blockType" (
    value text NOT NULL,
    category text
);
CREATE TABLE public.block_parent_child (
    parent_id text NOT NULL,
    child_id text NOT NULL,
    sibling_order integer NOT NULL
);
CREATE SEQUENCE public.block_parent_child_sibling_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.block_parent_child_sibling_order_seq OWNED BY public.block_parent_child.sibling_order;
CREATE TABLE public.block_requestor (
    block_id text NOT NULL,
    user_id text NOT NULL
);
CREATE TABLE public.block_responder (
    block_id text NOT NULL,
    user_id text NOT NULL
);
CREATE TABLE public.blocks (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    type text NOT NULL,
    state text NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    props jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_updated timestamp with time zone DEFAULT now() NOT NULL,
    control jsonb DEFAULT '{}'::jsonb NOT NULL,
    root_id text
);
CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    family_name text,
    given_name text,
    picture text
);
ALTER TABLE ONLY public."blockDef_parent_child" ALTER COLUMN sibling_order SET DEFAULT nextval('public."blockDef_parent_child_sibling_order_seq"'::regclass);
ALTER TABLE ONLY public.block_parent_child ALTER COLUMN sibling_order SET DEFAULT nextval('public.block_parent_child_sibling_order_seq'::regclass);
ALTER TABLE ONLY public.bells
    ADD CONSTRAINT bells_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."blockDef_parent_child"
    ADD CONSTRAINT "blockDef_parent_child_pkey" PRIMARY KEY (parent_id, child_id);
ALTER TABLE ONLY public."blockDef_requestor"
    ADD CONSTRAINT "blockDef_requestor_pkey" PRIMARY KEY ("blockDef_id", user_id);
ALTER TABLE ONLY public."blockDef_responder"
    ADD CONSTRAINT "blockDef_responder_pkey" PRIMARY KEY ("blockDef_id", user_id);
ALTER TABLE ONLY public.block_parent_child
    ADD CONSTRAINT block_parent_child_pkey PRIMARY KEY (parent_id, child_id);
ALTER TABLE ONLY public.block_requestor
    ADD CONSTRAINT block_requestors_pkey PRIMARY KEY (block_id, user_id);
ALTER TABLE ONLY public.block_responder
    ADD CONSTRAINT block_responders_pkey PRIMARY KEY (block_id, user_id);
ALTER TABLE ONLY public."blockDefs"
    ADD CONSTRAINT blockdefs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."blockDefState"
    ADD CONSTRAINT blockdefstate_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public."blockState"
    ADD CONSTRAINT blockstate_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public."blockType"
    ADD CONSTRAINT blocktype_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.bells
    ADD CONSTRAINT bells_root_block_id_fkey FOREIGN KEY (root_block_id) REFERENCES public.blocks(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bells
    ADD CONSTRAINT bells_state_fkey FOREIGN KEY (state) REFERENCES public."blockState"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."blockDef_parent_child"
    ADD CONSTRAINT "blockDef_parent_child_child_id_fkey" FOREIGN KEY (child_id) REFERENCES public."blockDefs"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDef_parent_child"
    ADD CONSTRAINT "blockDef_parent_child_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public."blockDefs"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDef_requestor"
    ADD CONSTRAINT "blockDef_requestor_blockDef_id_fkey" FOREIGN KEY ("blockDef_id") REFERENCES public."blockDefs"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDef_requestor"
    ADD CONSTRAINT "blockDef_requestor_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDef_responder"
    ADD CONSTRAINT "blockDef_responder_blockDef_id_fkey" FOREIGN KEY ("blockDef_id") REFERENCES public."blockDefs"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDef_responder"
    ADD CONSTRAINT "blockDef_responder_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDefs"
    ADD CONSTRAINT "blockDefs_root_id_fkey" FOREIGN KEY (root_id) REFERENCES public."blockDefs"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.block_parent_child
    ADD CONSTRAINT block_parent_child_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.block_parent_child
    ADD CONSTRAINT block_parent_child_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.block_requestor
    ADD CONSTRAINT block_requestor_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.block_requestor
    ADD CONSTRAINT block_requestor_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.block_responder
    ADD CONSTRAINT block_responder_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.block_responder
    ADD CONSTRAINT block_responder_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."blockDefs"
    ADD CONSTRAINT blockdefstate_fkey FOREIGN KEY (state) REFERENCES public."blockDefState"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."blockDefs"
    ADD CONSTRAINT blockdeftype_fkey FOREIGN KEY (type) REFERENCES public."blockType"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_root_id_fkey FOREIGN KEY (root_id) REFERENCES public.blocks(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blockstate_fkey FOREIGN KEY (state) REFERENCES public."blockState"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocktype_fkey FOREIGN KEY (type) REFERENCES public."blockType"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
