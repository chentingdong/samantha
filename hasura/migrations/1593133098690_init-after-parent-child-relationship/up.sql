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
    email text NOT NULL
);
ALTER TABLE ONLY public."blockDef_parent_child" ALTER COLUMN sibling_order SET DEFAULT nextval('public."blockDef_parent_child_sibling_order_seq"'::regclass);
ALTER TABLE ONLY public.block_parent_child ALTER COLUMN sibling_order SET DEFAULT nextval('public.block_parent_child_sibling_order_seq'::regclass);
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


INSERT INTO public."blockDefState" (value, comment) VALUES ('Draft', NULL);
INSERT INTO public."blockDefState" (value, comment) VALUES ('Published', NULL);
INSERT INTO public."blockType" (value, category) VALUES ('Form', 'Action');
INSERT INTO public."blockType" (value, category) VALUES ('API', 'Action');
INSERT INTO public."blockType" (value, category) VALUES ('Retry', 'Decorator');
INSERT INTO public."blockType" (value, category) VALUES ('Repeat', 'Decorator');
INSERT INTO public."blockType" (value, category) VALUES ('Inverter', 'Decorator');
INSERT INTO public."blockType" (value, category) VALUES ('Sequence', 'Control');
INSERT INTO public."blockType" (value, category) VALUES ('ParallelAll', 'Control');
INSERT INTO public."blockType" (value, category) VALUES ('ParallelAny', 'Control');
INSERT INTO public."blockType" (value, category) VALUES ('Selector', 'Control');
INSERT INTO public."blockType" (value, category) VALUES ('ManualSelector', 'Control');
INSERT INTO public."blockType" (value, category) VALUES ('BehaviorTree', 'BehaviorTree');
INSERT INTO public."blockType" (value, category) VALUES ('Subtree', 'Action');
INSERT INTO public."blockType" (value, category) VALUES ('Conditional', 'Decorator');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('2vwPj9f5K7a21gjv90AOa', 'SpendRequest', '2. Marketing team spend request form', 'Form', 'Draft', '{}', '2020-06-22 20:30:47.339+00', '2020-06-22 20:30:47.339+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('3GKApRpyTYmgOQ9usbJti', 'SpendRequestApproval', '3. Marketing team spend request approval form for director of perf marketing', 'Form', 'Draft', '{}', '2020-06-22 20:30:47.339+00', '2020-06-22 20:30:47.339+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('u8spNZtyin3aRjZY5WAUC', 'Sequence', '', 'Sequence', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('cc1FHNsIM29O38xtzwl6m', 'ParallelAll', '', 'ParallelAll', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('emRlRT_5ykANhaIvwR4iY', 'ParallelAny', '', 'ParallelAny', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('8kk_uzkWEAOgRKApK-oTX', 'Repeat', '', 'Repeat', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('xqJFRjJlGL5Zct8zPvXqA', 'Retry', '', 'Retry', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('Kx1fiup4aJ83TwMkm2hHZ', 'ManualSelector', '', 'ManualSelector', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('VKfLQPYLg8WQsafGpm9jo', 'SubTree', '', 'Subtree', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('vMDgc5devAzeZMnamBtrx', 'Selector', '', 'Selector', 'Draft', '{}', '2020-06-19 20:30:47.339+00', '2020-06-19 20:30:47.339+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('02zCHdkfBZCSTtFKBKTt4', 'isSpendApprovalRequired', NULL, 'Conditional', 'Draft', '{}', '2020-06-20 00:54:35.738757+00', '2020-06-20 00:54:35.738757+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('4FKApRpyTYmgOQ9usbJth', 'LargeSpendRequestApproval', '4. Marketing team large spend request need approval from VP of marketing', 'Form', 'Draft', '{}', '2020-06-23 20:30:47.339+00', '2020-06-23 20:30:47.339+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 10000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('nc-uiPN2qE3VZRo79NgN2', 'Sequence', '', 'Sequence', 'Draft', '{}', '2020-06-20 01:38:16.428+00', '2020-06-20 01:38:16.428+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('tX5haLNQWFENxeoc-YL3d', 'SpendRequestForm', '', 'Form', 'Draft', '{}', '2020-06-20 01:38:18.453+00', '2020-06-20 01:38:18.453+00', '{}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('5CwwM5Pef77ygZ6qHd6B3', 'FinanceTeamApproval', '5. Finance team Approval sequence wrapper', 'Sequence', 'Draft', '{}', '2020-06-23 20:30:47.339+00', '2020-06-23 20:30:47.339+00', '{}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('6EwwM5Pef77ygZ6qHd6a5', 'CheckTeamBudgetForApproval', '6. Finance Check Team Budget for Approval', 'Form', 'Draft', '{}', '2020-06-23 20:30:47.339+00', '2020-06-23 20:30:47.339+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('7quSzlVKDIC38bfn7LYVn', 'LargeSpendRequestApproval', '7. Finance team Large Spend Request Approval', 'Form', 'Draft', '{}', '2020-06-23 21:30:47.339+00', '2020-06-23 21:30:47.339+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 25000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('8vTzQ089fdxyDDOsJJz3f', 'Retry decorator', 'Retry the following decorated block', 'Retry', 'Draft', '{}', '2020-06-22 20:30:47.339+00', '2020-06-22 20:30:47.339+00', '{"forms": [{"data": {}, "template": "Retry"}]}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('9VqoAzKt77SZRXgxCK2Q5', 'Repeat decorator', 'Repeat the decroated block', 'Repeat', 'Draft', '{}', '2020-06-22 20:30:47.339+00', '2020-06-22 20:30:47.339+00', '{"forms": [{"data": {}, "template": "Repeat"}]}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('10HThzJHtxEiP4KGjvx9J', 'Inverter decorator', 'Invert the children blocks in a sequencial block wrapper.', 'Inverter', 'Draft', '{}', '2020-06-22 20:30:47.339+00', '2020-06-22 20:30:47.339+00', '{"forms": [{"data": {}, "template": "Inverter"}]}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('11HBSOKvg2XV_XQZfFM0d', 'Conditional rules', 'Pre conditional rules for the following decorated block', 'Conditional', 'Draft', '{}', '2020-06-22 20:30:47.339+00', '2020-06-25 17:00:06.357+00', '{"forms": [{"data": {}, "template": "Conditional"}]}', NULL);
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('1skauzkTHAOgRKApKaoTd', 'Marketing Spend Request', '1. Root Bell for Marketing Spend Request', 'Sequence', 'Draft', '{}', '2020-06-23 20:30:47.339+00', '2020-06-25 16:59:54.886+00', '{}', '1skauzkTHAOgRKApKaoTd');
INSERT INTO public."blockDefs" (id, name, description, type, state, props, created_at, last_updated, control, root_id) VALUES ('vMldJyFpeD4rbY4dW5Gb-', 'BehaviorTree 7', 'An empty bell', 'BehaviorTree', 'Draft', '{}', '2020-06-20 01:38:13.263+00', '2020-06-25 16:59:57.986+00', '{}', NULL);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('1skauzkTHAOgRKApKaoTd', '2vwPj9f5K7a21gjv90AOa', 1);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('1skauzkTHAOgRKApKaoTd', '3GKApRpyTYmgOQ9usbJti', 2);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('1skauzkTHAOgRKApKaoTd', '4FKApRpyTYmgOQ9usbJth', 3);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('1skauzkTHAOgRKApKaoTd', '5CwwM5Pef77ygZ6qHd6B3', 4);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('nc-uiPN2qE3VZRo79NgN2', 'tX5haLNQWFENxeoc-YL3d', 6);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('5CwwM5Pef77ygZ6qHd6B3', '6EwwM5Pef77ygZ6qHd6a5', 7);
INSERT INTO public."blockDef_parent_child" (parent_id, child_id, sibling_order) VALUES ('5CwwM5Pef77ygZ6qHd6B3', '7quSzlVKDIC38bfn7LYVn', 8);
INSERT INTO public.users (id, name, email) VALUES ('Google_109551792009621810100', 'Adam Hiatt', 'ahiatt@bellhop.io');
INSERT INTO public.users (id, name, email) VALUES ('Google_115419186368884878540', 'Tingdong Chen', 'tchen@bellhop.io');
INSERT INTO public.users (id, name, email) VALUES ('Google_111918078641246610063', 'Baiji He', 'bhe@bellhop.io');
INSERT INTO public."blockState" (value, comment) VALUES ('Created', NULL);
INSERT INTO public."blockState" (value, comment) VALUES ('Ready', NULL);
INSERT INTO public."blockState" (value, comment) VALUES ('Running', NULL);
INSERT INTO public."blockState" (value, comment) VALUES ('Success', NULL);
INSERT INTO public."blockState" (value, comment) VALUES ('Failure', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('k0RVQXo-iAUzh8HF1J3DK', 'Marketing Spend Request', '1. Root Bell for Marketing Spend Request', 'Sequence', 'Ready', '{}', '{}', '2020-06-25 16:34:08.546+00', '2020-06-25 16:34:08.546+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('2Uznfh2H4wL5f5ySeqRjQ', 'SpendRequest', '2. Marketing team spend request form', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:08.546+00', '2020-06-25 16:34:08.546+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('u80RYGzjns68av9K7a4Pf', 'Retry', NULL, 'Retry', 'Created', '{}', '{}', '2020-06-24 00:23:29.483+00', '2020-06-24 00:23:29.483+00', '{"retryLimit": 3}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('sTosDgQNx9_cSQC0NNtUy', 'SpendRequestApproval', '3. Marketing team spend request approval form for director of perf marketing', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:08.546+00', '2020-06-25 16:34:08.546+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('4EdOADilV48F_gWvlGmrX', 'Marking Spend VP Approval', NULL, 'Form', 'Created', '{}', '{}', '2020-06-25 01:49:19.478701+00', '2020-06-25 05:55:13.469+00', '{}', 'aX04fOy-hy3e5ubdzWMoa');
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('6U7ZDhGDwpVpscslVR3Vo', 'LargeSpendRequestApproval', '4. Marketing team large spend request need approval from VP of marketing', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:08.546+00', '2020-06-25 16:34:08.546+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 10000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('s4FYVlMY1jhiSp6mm-lRg', 'FinanceTeamApproval', '5. Finance team Approval sequence wrapper', 'Sequence', 'Ready', '{}', '{}', '2020-06-25 16:34:08.546+00', '2020-06-25 16:34:08.546+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('v-0UMh-PeE44FANWaMElT', 'Marking Spend Request Form', NULL, 'Form', 'Success', '{}', '{}', '2020-06-24 00:23:29.483+00', '2020-06-25 05:57:43.887+00', '{}', 'aX04fOy-hy3e5ubdzWMoa');
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('kot3OMJLYtCVIuFjxuwRI', 'CheckTeamBudgetForApproval', '6. Finance Check Team Budget for Approval', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:08.546+00', '2020-06-25 16:34:08.546+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('TXaTQFne5sL-NxQSVlVVm', 'Form', NULL, 'Form', 'Created', '{}', '{}', '2020-06-24 00:23:29.483+00', '2020-06-24 00:23:29.483+00', '{}', 'u80RYGzjns68av9K7a4Pf');
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('_VjDclfI_H9bU6jvFGYSZ', 'Marking Spend Approval', NULL, 'Form', 'Failure', '{}', '{}', '2020-06-24 00:23:29.483+00', '2020-06-25 05:57:54.924+00', '{}', 'aX04fOy-hy3e5ubdzWMoa');
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('aX04fOy-hy3e5ubdzWMoa', 'Sequence', NULL, 'Sequence', 'Failure', '{}', '{}', '2020-06-24 00:23:29.483+00', '2020-06-25 05:58:18.018+00', '{}', 'aX04fOy-hy3e5ubdzWMoa');
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('vLJZx4MKLzAtz3g_vZthW', 'LargeSpendRequestApproval', '7. Finance team Large Spend Request Approval', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:08.547+00', '2020-06-25 16:34:08.547+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 25000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('FoxvXKCyTf-K36q8rBZVK', 'Marketing Spend Request', '1. Root Bell for Marketing Spend Request', 'Sequence', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('YnBRb47jepoJrhXOt7ZAx', 'SpendRequest', '2. Marketing team spend request form', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('vR_OcOJ3imNt1rRmlTM2K', 'SpendRequestApproval', '3. Marketing team spend request approval form for director of perf marketing', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('MxZ4rV40jQZC9EkWChwwX', 'LargeSpendRequestApproval', '4. Marketing team large spend request need approval from VP of marketing', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 10000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('Ipc8dicX7wDTNg1hJXmpW', 'FinanceTeamApproval', '5. Finance team Approval sequence wrapper', 'Sequence', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('Yt-knixYLfq0Cy6LL_xyg', 'CheckTeamBudgetForApproval', '6. Finance Check Team Budget for Approval', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('1rl1qJjz7L-3HxkKVsI4C', 'LargeSpendRequestApproval', '7. Finance team Large Spend Request Approval', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:34:33.656+00', '2020-06-25 16:34:33.656+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 25000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('bD7709OWBX-eZaPJqhgKL', 'Marketing Spend Request', '1. Root Bell for Marketing Spend Request', 'Sequence', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('NdhtES6hM41l6KBQUOfQX', 'SpendRequest', '2. Marketing team spend request form', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('6S8NwyB_8E1OPLDBFBkir', 'SpendRequestApproval', '3. Marketing team spend request approval form for director of perf marketing', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('7KDEFVU1aTeO8Ismj-kU_', 'LargeSpendRequestApproval', '4. Marketing team large spend request need approval from VP of marketing', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 10000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('wEzSVpEru04cew3HsUZs2', 'FinanceTeamApproval', '5. Finance team Approval sequence wrapper', 'Sequence', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('ztvTa2WOcDapIEOpDFMZL', 'CheckTeamBudgetForApproval', '6. Finance Check Team Budget for Approval', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('U18oRK_CmAY68xKzoIfEq', 'LargeSpendRequestApproval', '7. Finance team Large Spend Request Approval', 'Form', 'Ready', '{}', '{}', '2020-06-25 16:35:05.451+00', '2020-06-25 16:35:05.451+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 25000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('QUWwqsQZv2C5fE-y5gr6v', 'SpendRequestApproval', '3. Marketing team spend request approval form for director of perf marketing', 'Form', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 16:56:55.85+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('SFHEr8z6gb4hlfxVnKQa1', 'SpendRequest', '2. Marketing team spend request form', 'Form', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 16:56:55.857+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('tJCdkQJAjUTxrewAGcDXt', 'LargeSpendRequestApproval', '4. Marketing team large spend request need approval from VP of marketing', 'Form', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 16:56:55.86+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 10000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('g5uXtSJ_WJOHND7bj-_2l', 'CheckTeamBudgetForApproval', '6. Finance Check Team Budget for Approval', 'Form', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 16:56:55.864+00', '{"forms": [{"data": {}, "template": "SpendRequestApproval"}]}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('vUxuS1FmNaduZ3_0V5K2O', 'Marketing Spend Request', '1. Root Bell for Marketing Spend Request', 'Sequence', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 16:57:11.35+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('UtsDGMfnTcRuu5okw9UDb', 'FinanceTeamApproval', '5. Finance team Approval sequence wrapper', 'Sequence', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 17:31:02.274+00', '{}', NULL);
INSERT INTO public.blocks (id, name, description, type, state, context, props, created_at, last_updated, control, root_id) VALUES ('ffu_jXHStddazcbZsxpCL', 'LargeSpendRequestApproval', '7. Finance team Large Spend Request Approval', 'Form', 'Success', '{}', '{}', '2020-06-25 16:56:32.5+00', '2020-06-25 17:31:15.791+00', '{"forms": [{"data": {"name": "Spend Request Approval", "description": "Need approval"}, "template": "SpendRequest"}], "decorators": [{"data": [{"all": [{"fact": "SpendRequest.spend", "value": 25000, "operator": "greaterThan"}]}], "template": "Conditional"}]}', NULL);
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('SFHEr8z6gb4hlfxVnKQa1', 'Google_111918078641246610063');
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('QUWwqsQZv2C5fE-y5gr6v', 'Google_111918078641246610063');
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('tJCdkQJAjUTxrewAGcDXt', 'Google_111918078641246610063');
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('g5uXtSJ_WJOHND7bj-_2l', 'Google_111918078641246610063');
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('ffu_jXHStddazcbZsxpCL', 'Google_111918078641246610063');
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('UtsDGMfnTcRuu5okw9UDb', 'Google_111918078641246610063');
INSERT INTO public.block_requestor (block_id, user_id) VALUES ('vUxuS1FmNaduZ3_0V5K2O', 'Google_111918078641246610063');
INSERT INTO public.block_responder (block_id, user_id) VALUES ('vUxuS1FmNaduZ3_0V5K2O', 'Google_111918078641246610063');
INSERT INTO public.block_responder (block_id, user_id) VALUES ('UtsDGMfnTcRuu5okw9UDb', 'Google_111918078641246610063');
INSERT INTO public.block_responder (block_id, user_id) VALUES ('ffu_jXHStddazcbZsxpCL', 'Google_111918078641246610063');
SELECT pg_catalog.setval('public."blockDef_parent_child_sibling_order_seq"', 8, true);
SELECT pg_catalog.setval('public.block_parent_child_sibling_order_seq', 1, false);
