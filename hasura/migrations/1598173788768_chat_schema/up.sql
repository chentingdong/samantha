
drop schema chat cascade;

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
--;

alter table "chat"."user_room_participations"
           add constraint "user_room_participations_user_id_fkey"
           foreign key ("user_id")
           references "m2"."users"
           ("id") on update cascade on delete cascade;

DROP TABLE "chat"."room_bookings";

DROP TABLE "chat"."room_bookings";

DROP TABLE "chat"."room_bookings";

DROP TABLE "chat"."room_bookings";

DROP TABLE "chat"."room_bookings";

alter table "chat"."room_bookings" drop constraint "bell_room_bookings_room_id_fkey";

DROP TABLE "chat"."room_bookings";

alter table "chat"."room_bookings" drop constraint "room_bookings_source_fkey";

DROP TABLE "chat"."room_bookings";

alter table "chat"."room_bookings" drop constraint "room_bookings_source_fkey";

DROP TABLE "chat"."room_bookings";

ALTER TABLE "chat"."rooms" ADD COLUMN "source" Text NULL;

ALTER TABLE "chat"."rooms" ADD COLUMN "source_id" text NULL;

alter table "chat"."rooms"
           add constraint "rooms_source_id_fkey"
           foreign key ("source_id")
           references "chat"."room_sources"
           ("id") on update cascade on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_id_fkey",
             add constraint "rooms_source_fkey"
             foreign key ("source")
             references "chat"."room_sources"
             ("id") on update cascade on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_id_fkey",
             add constraint "rooms_source_fkey"
             foreign key ("source")
             references "chat"."room_sources"
             ("id") on update cascade on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_id_fkey",
             add constraint "rooms_source_fkey"
             foreign key ("source")
             references "chat"."room_sources"
             ("id") on update cascade on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_id_fkey",
             add constraint "rooms_source_fkey"
             foreign key ("source")
             references "chat"."room_sources"
             ("id") on update cascade on delete cascade;

alter table "chat"."rooms" drop constraint "rooms_source_id_fkey",
             add constraint "rooms_source_fkey"
             foreign key ("source")
             references "chat"."room_sources"
             ("id") on update cascade on delete cascade;

alter table "chat"."rooms" add constraint "rooms_id_source_source_id_key" unique ("id", "source", "source_id");

ALTER TABLE "chat"."rooms" DROP COLUMN "type" CASCADE;

ALTER TABLE ONLY "chat"."rooms" ALTER COLUMN "last_visited_at" SET DEFAULT now();

ALTER TABLE "chat"."rooms" ALTER COLUMN "last_visited_at" DROP DEFAULT;

ALTER TABLE "chat"."user_room_participations" DROP COLUMN "id" CASCADE;

alter table "chat"."messages" drop constraint "messages_room_id_fkey";

alter table "chat"."user_room_participations" drop constraint "user_room_participations_room_id_fkey";

alter table "chat"."user_room_participations" drop constraint "user_room_participations_pkey";
alter table "chat"."user_room_participations"
    add constraint "user_room_participations_pkey" 
    primary key ( "user_id", "room_id" );

alter table "chat"."rooms" drop constraint "rooms_pkey";
alter table "chat"."rooms"
    add constraint "rooms_pkey" 
    primary key ( "id", "source" );

alter table "chat"."rooms" drop constraint "rooms_pkey";
alter table "chat"."rooms"
    add constraint "rooms_pkey" 
    primary key ( "id", "source", "source_id" );

alter table "chat"."rooms" drop constraint "rooms_pkey";

ALTER TABLE "chat"."rooms" DROP COLUMN "id" CASCADE;

alter table "chat"."rooms"
    add constraint "rooms_pkey" 
    primary key ( "source_id" );

alter table "chat"."rooms" drop constraint "rooms_source_fkey";

alter table "chat"."rooms" rename column "source_id" to "id";

alter table "chat"."user_room_participations"
           add constraint "user_room_participations_room_id_fkey"
           foreign key ("room_id")
           references "chat"."rooms"
           ("id") on update cascade on delete cascade;

ALTER TABLE "chat"."rooms" ALTER COLUMN "last_post_at" TYPE timestamptz;

alter table "chat"."messages"
           add constraint "messages_room_id_fkey"
           foreign key ("room_id")
           references "chat"."rooms"
           ("id") on update restrict on delete restrict;
