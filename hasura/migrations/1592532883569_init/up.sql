CREATE TABLE public."blockDefState" (
    value text NOT NULL,
    comment text
);
CREATE TABLE public."blockDefs" (
    id text NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''''::text NOT NULL,
    type text NOT NULL,
    state text NOT NULL,
    props jsonb DEFAULT '{}'::jsonb NOT NULL,
    parent_id text,
    created_at timestamp with time zone NOT NULL,
    last_updated timestamp with time zone NOT NULL
);
CREATE TABLE public."blockState" (
    value text NOT NULL,
    comment text
);
CREATE TABLE public."blockType" (
    value text NOT NULL,
    comment text
);
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
    description text DEFAULT ''''::text NOT NULL,
    type text NOT NULL,
    state text NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    props jsonb DEFAULT '{}'::jsonb NOT NULL,
    parent_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    last_updated timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL
);
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
    ADD CONSTRAINT blockstate_fkey FOREIGN KEY (state) REFERENCES public."blockState"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocktype_fkey FOREIGN KEY (type) REFERENCES public."blockType"(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
