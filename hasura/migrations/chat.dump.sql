--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12.3 (Debian 12.3-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: chat; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA chat;


ALTER SCHEMA chat OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attachments; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.attachments (
    id text NOT NULL,
    type text,
    url text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    message_id text NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);


ALTER TABLE chat.attachments OWNER TO postgres;

--
-- Name: room_bookings; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.room_bookings (
    source_id text NOT NULL,
    room_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    visit_count integer NOT NULL,
    source text NOT NULL,
    renewed_at timestamp with time zone DEFAULT now()
);


ALTER TABLE chat.room_bookings OWNER TO postgres;

--
-- Name: bell_room_bookings_id_seq; Type: SEQUENCE; Schema: chat; Owner: postgres
--

CREATE SEQUENCE chat.bell_room_bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chat.bell_room_bookings_id_seq OWNER TO postgres;

--
-- Name: bell_room_bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: chat; Owner: postgres
--

ALTER SEQUENCE chat.bell_room_bookings_id_seq OWNED BY chat.room_bookings.visit_count;


--
-- Name: message_attachments; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.message_attachments (
    id text NOT NULL,
    message_id text NOT NULL,
    attachment_id text NOT NULL
);


ALTER TABLE chat.message_attachments OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.messages (
    id text NOT NULL,
    type text DEFAULT 'chat'::text,
    room_id text NOT NULL,
    content text NOT NULL,
    from_user_id text NOT NULL,
    to_user_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE chat.messages OWNER TO postgres;

--
-- Name: TABLE messages; Type: COMMENT; Schema: chat; Owner: postgres
--

COMMENT ON TABLE chat.messages IS 'chat messages';


--
-- Name: room_sources; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.room_sources (
    id text NOT NULL,
    description text
);


ALTER TABLE chat.room_sources OWNER TO postgres;

--
-- Name: rooms; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.rooms (
    id text NOT NULL,
    type text DEFAULT 'chat'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name text,
    last_post_at timestamp without time zone,
    ended_at timestamp with time zone DEFAULT now(),
    last_visited_at timestamp with time zone
);


ALTER TABLE chat.rooms OWNER TO postgres;

--
-- Name: TABLE rooms; Type: COMMENT; Schema: chat; Owner: postgres
--

COMMENT ON TABLE chat.rooms IS 'chat conversations';


--
-- Name: user_room_participations; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.user_room_participations (
    user_id text NOT NULL,
    last_seen_at timestamp with time zone DEFAULT now() NOT NULL,
    last_typed_at timestamp with time zone DEFAULT now() NOT NULL,
    room_id text NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL,
    role text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE chat.user_room_participations OWNER TO postgres;

--
-- Name: user_room_participations_id_seq; Type: SEQUENCE; Schema: chat; Owner: postgres
--

CREATE SEQUENCE chat.user_room_participations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE chat.user_room_participations_id_seq OWNER TO postgres;

--
-- Name: user_room_participations_id_seq; Type: SEQUENCE OWNED BY; Schema: chat; Owner: postgres
--

ALTER SEQUENCE chat.user_room_participations_id_seq OWNED BY chat.user_room_participations.id;


--
-- Name: room_bookings visit_count; Type: DEFAULT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.room_bookings ALTER COLUMN visit_count SET DEFAULT nextval('chat.bell_room_bookings_id_seq'::regclass);


--
-- Name: user_room_participations id; Type: DEFAULT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations ALTER COLUMN id SET DEFAULT nextval('chat.user_room_participations_id_seq'::regclass);


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.attachments (id, type, url, created_at, updated_at, message_id, name, title, description) FROM stdin;
\.


--
-- Data for Name: message_attachments; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.message_attachments (id, message_id, attachment_id) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.messages (id, type, room_id, content, from_user_id, to_user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: room_bookings; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.room_bookings (source_id, room_id, created_at, visit_count, source, renewed_at) FROM stdin;
11OPQ53T10ju7GYERgBOP	11OPQ53T10ju7GYERgBOP	2020-08-23 02:32:09.302218+00	3	block	2020-08-23 02:32:09.302218+00
\.


--
-- Data for Name: room_sources; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.room_sources (id, description) FROM stdin;
bell	\N
block	\N
goal	\N
bellhop	\N
direct_message	\N
task	\N
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.rooms (id, type, created_at, name, last_post_at, ended_at, last_visited_at) FROM stdin;
11OPQ53T10ju7GYERgBOP	chat	2020-08-23 02:32:09.302218	Main Goal (Facilities Spend Request)	\N	2020-08-23 02:32:09.302218+00	\N
\.


--
-- Data for Name: user_room_participations; Type: TABLE DATA; Schema: chat; Owner: postgres
--

COPY chat.user_room_participations (user_id, last_seen_at, last_typed_at, room_id, joined_at, role, id) FROM stdin;
Google_115419186368884878540	2020-08-23 02:32:09.442661+00	2020-08-23 02:32:09.302218+00	11OPQ53T10ju7GYERgBOP	2020-08-23 02:32:09.26+00	goal_assignee	1
Google_113132363560941198349	2020-08-23 02:32:09.442661+00	2020-08-23 02:32:09.302218+00	11OPQ53T10ju7GYERgBOP	2020-08-23 02:32:09.26+00	goal_follower	2
\.


--
-- Name: bell_room_bookings_id_seq; Type: SEQUENCE SET; Schema: chat; Owner: postgres
--

SELECT pg_catalog.setval('chat.bell_room_bookings_id_seq', 3, true);


--
-- Name: user_room_participations_id_seq; Type: SEQUENCE SET; Schema: chat; Owner: postgres
--

SELECT pg_catalog.setval('chat.user_room_participations_id_seq', 6, true);


--
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);


--
-- Name: room_bookings bell_room_bookings_id_key; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.room_bookings
    ADD CONSTRAINT bell_room_bookings_id_key UNIQUE (visit_count);


--
-- Name: message_attachments message_attachments_attachment_id_key; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_attachment_id_key UNIQUE (attachment_id);


--
-- Name: message_attachments message_attachments_message_id_key; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_message_id_key UNIQUE (message_id);


--
-- Name: message_attachments message_attachments_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: room_bookings room_bookings_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.room_bookings
    ADD CONSTRAINT room_bookings_pkey PRIMARY KEY (source, source_id);


--
-- Name: room_sources room_sources_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.room_sources
    ADD CONSTRAINT room_sources_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: user_room_participations user_room_participations_id_key; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_id_key UNIQUE (id);


--
-- Name: user_room_participations user_room_participations_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_pkey PRIMARY KEY (user_id, room_id);


--
-- Name: attachments attachments_message_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.attachments
    ADD CONSTRAINT attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES chat.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: room_bookings bell_room_bookings_room_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.room_bookings
    ADD CONSTRAINT bell_room_bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: message_attachments message_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES chat.attachments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: message_attachments message_attachments_message_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES chat.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages messages_from_user_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages messages_room_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages messages_to_user_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: room_bookings room_bookings_source_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.room_bookings
    ADD CONSTRAINT room_bookings_source_fkey FOREIGN KEY (source) REFERENCES chat.room_sources(id) ON UPDATE SET DEFAULT ON DELETE SET DEFAULT;


--
-- Name: user_room_participations user_room_participations_role_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_room_participations user_room_participations_room_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_room_participations user_status_user_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_status_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

