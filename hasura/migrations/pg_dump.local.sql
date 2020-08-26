CREATE SCHEMA chat;
ALTER SCHEMA chat OWNER TO postgres;
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
CREATE TABLE chat.message_attachments (
    id text NOT NULL,
    message_id text NOT NULL,
    attachment_id text NOT NULL
);
ALTER TABLE chat.message_attachments OWNER TO postgres;
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
COMMENT ON TABLE chat.messages IS 'chat messages';
CREATE TABLE chat.room_sources (
    id text NOT NULL,
    description text
);
ALTER TABLE chat.room_sources OWNER TO postgres;
CREATE TABLE chat.rooms (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    name text,
    last_post_at timestamp with time zone,
    ended_at timestamp with time zone DEFAULT now(),
    last_visited_at timestamp with time zone,
    source text NOT NULL,
    id text NOT NULL
);
ALTER TABLE chat.rooms OWNER TO postgres;
COMMENT ON TABLE chat.rooms IS 'chat conversations';
CREATE TABLE chat.user_room_participations (
    user_id text NOT NULL,
    last_seen_at timestamp with time zone NOT NULL,
    last_typed_at timestamp with time zone DEFAULT now() NOT NULL,
    room_id text NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL,
    role text NOT NULL
);
ALTER TABLE chat.user_room_participations OWNER TO postgres;
ALTER TABLE ONLY chat.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_attachment_id_key UNIQUE (attachment_id);
ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_message_id_key UNIQUE (message_id);
ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY chat.room_sources
    ADD CONSTRAINT room_sources_pkey PRIMARY KEY (id);
ALTER TABLE ONLY chat.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_pkey PRIMARY KEY (user_id, room_id);
ALTER TABLE ONLY chat.attachments
    ADD CONSTRAINT attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES chat.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES chat.attachments(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.message_attachments
    ADD CONSTRAINT message_attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES chat.messages(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.messages
    ADD CONSTRAINT messages_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.rooms
    ADD CONSTRAINT rooms_source_fkey FOREIGN KEY (source) REFERENCES chat.room_sources(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE SET DEFAULT ON DELETE SET DEFAULT;
ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.user_room_participations
    ADD CONSTRAINT user_room_participations_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
