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
-- Name: bell_room_bookings; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.bell_room_bookings (
    id text NOT NULL,
    bell_id text NOT NULL,
    room_id text NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE chat.bell_room_bookings OWNER TO postgres;

--
-- Name: block_room_bookings; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.block_room_bookings (
    id text NOT NULL,
    block_id text NOT NULL,
    room_id text NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE chat.block_room_bookings OWNER TO postgres;

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
-- Name: rooms; Type: TABLE; Schema: chat; Owner: postgres
--

CREATE TABLE chat.rooms (
    id text NOT NULL,
    type text DEFAULT 'chat'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name text,
    last_post_at timestamp without time zone,
    ended_at timestamp with time zone DEFAULT now()
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
-- Name: user_room_participations id; Type: DEFAULT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations ALTER COLUMN id SET DEFAULT nextval('chat.user_room_participations_id_seq'::regclass);


--
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);


--
-- Name: bell_room_bookings bell_room_bookings_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.bell_room_bookings
    ADD CONSTRAINT bell_room_bookings_pkey PRIMARY KEY (id);


--
-- Name: block_room_bookings block_room_bookings_pkey; Type: CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.block_room_bookings
    ADD CONSTRAINT block_room_bookings_pkey PRIMARY KEY (id);


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
-- Name: attachments attachments_message_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.attachments
    ADD CONSTRAINT attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES chat.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bell_room_bookings bell_room_bookings_bell_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.bell_room_bookings
    ADD CONSTRAINT bell_room_bookings_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bell_room_bookings bell_room_bookings_room_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.bell_room_bookings
    ADD CONSTRAINT bell_room_bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: block_room_bookings block_room_bookings_block_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.block_room_bookings
    ADD CONSTRAINT block_room_bookings_block_id_fkey FOREIGN KEY (block_id) REFERENCES m2.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: block_room_bookings block_room_bookings_room_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.block_room_bookings
    ADD CONSTRAINT block_room_bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: user_room_participations user_room_participations_role_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_room_participations user_room_participations_room_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user_room_participations user_status_user_id_fkey; Type: FK CONSTRAINT; Schema: chat; Owner: postgres
--

ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_status_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--;
