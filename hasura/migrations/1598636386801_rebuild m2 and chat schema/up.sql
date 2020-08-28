DROP SCHEMA IF EXISTS m2 CASCADE;
DROP SCHEMA IF EXISTS chat CASCADE;
CREATE SCHEMA chat;
CREATE SCHEMA m2;
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
CREATE TABLE chat.message_attachments (
  id text NOT NULL,
  message_id text NOT NULL,
  attachment_id text NOT NULL
);
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
COMMENT ON TABLE chat.messages IS 'chat messages';
CREATE TABLE chat.room_sources (id text NOT NULL, description text);
CREATE TABLE chat.rooms (
  created_at timestamp without time zone DEFAULT now() NOT NULL,
  name text,
  last_post_at timestamp with time zone,
  ended_at timestamp with time zone DEFAULT now(),
  last_visited_at timestamp with time zone,
  source text NOT NULL,
  id text NOT NULL
);
COMMENT ON TABLE chat.rooms IS 'chat conversations';
CREATE TABLE chat.user_room_participations (
  user_id text NOT NULL,
  last_seen_at timestamp with time zone NOT NULL,
  last_typed_at timestamp with time zone DEFAULT now() NOT NULL,
  room_id text NOT NULL,
  joined_at timestamp with time zone DEFAULT now() NOT NULL,
  role text NOT NULL
);
CREATE TABLE m2.bell_executors (
  id text NOT NULL,
  type text NOT NULL,
  bell_id text,
  context jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT block_type CHECK ((type = 'BellExecutor'::text))
);
CREATE TABLE m2.bellhop_bell_participations (
  bellhop_id text NOT NULL,
  bell_id text NOT NULL,
  role text NOT NULL,
  id integer NOT NULL,
  CONSTRAINT bellhop_bell_role CHECK (
    (
      (role = 'bell_owner'::text)
      OR (role = 'bell_initiator'::text)
    )
  )
);
CREATE SEQUENCE m2.bellhop_bell_participations_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE m2.bellhop_bell_participations_id_seq OWNED BY m2.bellhop_bell_participations.id;
CREATE TABLE m2.bellhop_memberships (
  bellhop_id text NOT NULL,
  user_id text NOT NULL,
  role text NOT NULL,
  joined_at timestamp with time zone DEFAULT now() NOT NULL,
  id integer NOT NULL
);
CREATE SEQUENCE m2.bellhop_memberships_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE m2.bellhop_memberships_id_seq OWNED BY m2.bellhop_memberships.id;
CREATE TABLE m2.bellhops (
  id text NOT NULL,
  name text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
  profile_image_url text,
  created_at text DEFAULT now() NOT NULL,
  updated_at text DEFAULT now() NOT NULL,
  description text
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
  acts_as_main_bell boolean DEFAULT true NOT NULL,
  main_bell_id text,
  ended_at timestamp with time zone
);
CREATE TABLE m2.block_state (id text NOT NULL, attribute text);
CREATE TABLE m2.block_type (
  id text NOT NULL,
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
  parent_id text,
  sibling_order integer,
  name text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  started_at timestamp with time zone,
  ended_at timestamp with time zone
);
CREATE TABLE m2.goals (
  id text NOT NULL,
  type text NOT NULL,
  goal_name text,
  success_conditions jsonb DEFAULT '{}'::jsonb NOT NULL,
  CONSTRAINT block_type CHECK ((type = 'Goal'::text))
);
CREATE TABLE m2.membership_roles (id text NOT NULL, attribute text);
CREATE TABLE m2.participation_roles (id text NOT NULL, attribute text);
CREATE TABLE m2.tasks (
  id text NOT NULL,
  type text NOT NULL,
  title text,
  fields jsonb DEFAULT '{}'::jsonb NOT NULL,
  CONSTRAINT block_type CHECK ((type = 'Task'::text))
);
CREATE TABLE m2.user_bell_participations (
  user_id text NOT NULL,
  represented_bellhop_id text,
  bell_id text NOT NULL,
  role text NOT NULL,
  id integer NOT NULL,
  CONSTRAINT user_bell_role CHECK (
    (
      (role = 'bell_initiator'::text)
      OR (role = 'bell_follower'::text)
    )
  )
);
CREATE SEQUENCE m2.user_bell_participations_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE m2.user_bell_participations_id_seq OWNED BY m2.user_bell_participations.id;
CREATE TABLE m2.user_block_participations (
  user_id text NOT NULL,
  block_id text NOT NULL,
  role text NOT NULL,
  id integer NOT NULL
);
CREATE SEQUENCE m2.user_block_participations_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE m2.user_block_participations_id_seq OWNED BY m2.user_block_participations.id;
CREATE TABLE m2.users (
  id text NOT NULL,
  name text NOT NULL,
  email text,
  family_name text,
  given_name text,
  picture text
);
INSERT INTO chat.room_sources (id, description)
VALUES ('bell', NULL);
INSERT INTO chat.room_sources (id, description)
VALUES ('block', NULL);
INSERT INTO chat.room_sources (id, description)
VALUES ('goal', NULL);
INSERT INTO chat.room_sources (id, description)
VALUES ('bellhop', NULL);
INSERT INTO chat.room_sources (id, description)
VALUES ('direct_message', NULL);
INSERT INTO chat.room_sources (id, description)
VALUES ('task', NULL);
INSERT INTO chat.rooms (
    created_at,
    name,
    last_post_at,
    ended_at,
    last_visited_at,
    source,
    id
  )
VALUES (
    '2020-08-27 06:34:53.384972',
    '(demo def) Facilities Purchase Request',
    NULL,
    '2020-08-27 06:34:53.384972+00',
    NULL,
    'bell',
    'uKCjhrV-wGSxofiIRi5il'
  );
INSERT INTO chat.rooms (
    created_at,
    name,
    last_post_at,
    ended_at,
    last_visited_at,
    source,
    id
  )
VALUES (
    '2020-08-27 21:01:33.488751',
    '(demo def) Large Spend Approval Request ',
    NULL,
    '2020-08-27 21:01:33.488751+00',
    NULL,
    'bell',
    'hZYDVHXXk_uvWWWB9vgpU'
  );
INSERT INTO chat.rooms (
    created_at,
    name,
    last_post_at,
    ended_at,
    last_visited_at,
    source,
    id
  )
VALUES (
    '2020-08-27 22:10:24.308103',
    '(demo) M2.0 bug tracking',
    NULL,
    '2020-08-27 22:10:24.308103+00',
    NULL,
    'bell',
    'KT5VZpZMR5RVGscTjcY4w'
  );
INSERT INTO chat.rooms (
    created_at,
    name,
    last_post_at,
    ended_at,
    last_visited_at,
    source,
    id
  )
VALUES (
    '2020-08-27 22:12:00.534015',
    'Goal (Finance Team Spend Approval)',
    NULL,
    '2020-08-27 22:12:00.534015+00',
    NULL,
    'goal',
    'ur7ngwkbwjyMFwz5aSpDN'
  );
INSERT INTO chat.rooms (
    created_at,
    name,
    last_post_at,
    ended_at,
    last_visited_at,
    source,
    id
  )
VALUES (
    '2020-08-28 04:46:13.955274',
    '(demo def) Facilities Purchase Request',
    NULL,
    '2020-08-28 04:46:13.955274+00',
    NULL,
    'bell',
    'CdS4SDB_fvUxcIXDZL6NC'
  );
INSERT INTO m2.users (
    id,
    name,
    email,
    family_name,
    given_name,
    picture
  )
VALUES (
    'Google_113132363560941198349',
    'Ben Werther',
    'bwerther@bellhop.io',
    'Werther',
    'Ben',
    'https://lh3.googleusercontent.com/a-/AOh14GiBUMCJtUOa3-tU490ZvIEDVrq93riaTc-iWg9P=s96-c'
  );
INSERT INTO m2.users (
    id,
    name,
    email,
    family_name,
    given_name,
    picture
  )
VALUES (
    'Google_108096699587682538913',
    'One Bellman',
    'bellman1@bellhop.io',
    'Bellman',
    'One',
    'https://lh4.googleusercontent.com/-y6TTPnnnUF0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclr10Y3gHjmWEUJu5fipVniuLM2Ew/s96-c/photo.jpg'
  );
INSERT INTO m2.users (
    id,
    name,
    email,
    family_name,
    given_name,
    picture
  )
VALUES (
    'nightwatch',
    'nightwatch',
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO m2.users (
    id,
    name,
    email,
    family_name,
    given_name,
    picture
  )
VALUES (
    'Google_115419186368884878540',
    'Tingdong Chen',
    'tchen@bellhop.io',
    'Chen',
    'Tingdong',
    'https://lh3.googleusercontent.com/a-/AOh14GiewYead-zagD_r1jSjTcZ4QCoIW9GQoc_Bzb3m=s96-c'
  );
INSERT INTO m2.users (
    id,
    name,
    email,
    family_name,
    given_name,
    picture
  )
VALUES (
    'Google_111918078641246610063',
    'Baiji He',
    'bhe@bellhop.io',
    'He',
    'Baiji',
    'https://lh3.googleusercontent.com/a-/AOh14Ghb68OwaaY2L8jaT0shFyIHT4ZaukDMnyPyUCnY=s96-c'
  );
INSERT INTO m2.users (
    id,
    name,
    email,
    family_name,
    given_name,
    picture
  )
VALUES (
    'Google_109551792009621810100',
    'Adam Hiatt',
    'ahiatt@bellhop.io',
    'Hiatt',
    'Adam',
    'https://lh6.googleusercontent.com/-c-UyBv5uH2E/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn0pRn1sP_ehaZlcruXojR5zShqFA/s96-c/photo.jpg'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'mqNllLWcwqLevJqvlE-wY',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p>hi</p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 06:35:01.711921+00',
    '2020-08-27 06:35:01.711921+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'dNSdGl_SvRhfZ5g6cksza',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p><strong>sdf</strong></p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 06:46:20.233637+00',
    '2020-08-27 06:46:20.233637+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'VoB4t8iulAzIIesD1HL70',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<ul><li>asdf</li><li><br></li></ul>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 06:46:50.167192+00',
    '2020-08-27 06:46:50.167192+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'FzFkl2thq8fb7OxyGHGcr',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<ul><li>asdf</li><li><br></li></ul>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 06:46:54.845141+00',
    '2020-08-27 06:46:54.845141+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'ZGMLZUK2GfbuxFYyPPrMG',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<ul><li>asdfasdf</li><li><br></li><li>asdf</li></ul>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 06:48:37.99336+00',
    '2020-08-27 06:48:37.99336+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'Zx6v3DVExUsT4rB3ARHiQ',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<ol><li>asdf</li><li><br></li><li>asdf</li></ol>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 06:48:55.916604+00',
    '2020-08-27 06:48:55.916604+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'j1ZzeGJJQP7kXJ16HkmWa',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p>aaa</p><p>asdfb</p><p>asdf</p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 07:07:41.096985+00',
    '2020-08-27 07:07:41.096985+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'YYXw4cWk4uuVteHb7fgcD',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<ol><li>asdf</li><li>asdf</li><li><br></li><li>asdf </li></ol>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 07:07:50.941756+00',
    '2020-08-27 07:07:50.941756+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'aQWMxNRzmqJwZAol5Ns6i',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p><u>asdf</u></p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 07:18:22.518587+00',
    '2020-08-27 07:18:22.518587+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'IFI9FVdwdrutgutYSlRhz',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<pre class="ql-syntax" spellcheck="false">
asdf
</pre>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 07:18:48.493938+00',
    '2020-08-27 07:18:48.493938+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'uaVwbyHlL-Py_0paXcL2X',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p><s><u>sdfa</u></s></p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 07:38:39.934895+00',
    '2020-08-27 07:38:39.934895+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    '7jWhMCDsvdGPnodw7EcXv',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p>asdfasdf</p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 07:41:29.424983+00',
    '2020-08-27 07:41:29.424983+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'pMVZrGkEK6EdOOr8GSrRT',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<pre class="ql-syntax" spellcheck="false">
</pre>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 19:35:40.789558+00',
    '2020-08-27 19:35:40.789558+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'A3fOHqFzWIpIXtUvGin-4',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<pre class="ql-syntax" spellcheck="false">asdfasdfasdf
</pre>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 19:36:11.240589+00',
    '2020-08-27 19:36:11.240589+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'N9Z9K36VTfCDubgF47Qg4',
    'chat',
    'hZYDVHXXk_uvWWWB9vgpU',
    '<p>hi</p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-27 21:01:36.470956+00',
    '2020-08-27 21:01:36.470956+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'v-7ivJRhIoQLvSYINCzNV',
    'chat',
    'KT5VZpZMR5RVGscTjcY4w',
    '<p>test</p>',
    'Google_109551792009621810100',
    NULL,
    '2020-08-27 22:10:32.67184+00',
    '2020-08-27 22:10:32.67184+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    '_fD7eK26dpMP92XymvxYV',
    'chat',
    'KT5VZpZMR5RVGscTjcY4w',
    '<pre class="ql-syntax" spellcheck="false">dsfa
</pre>',
    'Google_109551792009621810100',
    NULL,
    '2020-08-27 22:10:51.352628+00',
    '2020-08-27 22:10:51.352628+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'NdxoZkdgUUB2SIKDZwPUo',
    'chat',
    'KT5VZpZMR5RVGscTjcY4w',
    '<pre class="ql-syntax" spellcheck="false">fdf
</pre>',
    'Google_109551792009621810100',
    NULL,
    '2020-08-27 22:10:58.618803+00',
    '2020-08-27 22:10:58.618803+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'mkxRlCndD_2AS9U03KawI',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '<p>asdf</p><p><br></p>',
    'Google_115419186368884878540',
    NULL,
    '2020-08-28 07:55:24.339612+00',
    '2020-08-28 07:55:24.339612+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    '9fioddMVlmM482-VXdVd-',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '',
    'Google_115419186368884878540',
    NULL,
    '2020-08-28 16:46:48.062662+00',
    '2020-08-28 16:46:48.062662+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    '2p5kuK0BIQtkxur3OVfD8',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '',
    'Google_115419186368884878540',
    NULL,
    '2020-08-28 16:46:55.066862+00',
    '2020-08-28 16:46:55.066862+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    'Tihms0OYHeQzWftVtMsOf',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '',
    'Google_115419186368884878540',
    NULL,
    '2020-08-28 16:58:46.585924+00',
    '2020-08-28 16:58:46.585924+00'
  );
INSERT INTO chat.messages (
    id,
    type,
    room_id,
    content,
    from_user_id,
    to_user_id,
    created_at,
    updated_at
  )
VALUES (
    '2jHViD1FWD6461JtGhKN7',
    'chat',
    'uKCjhrV-wGSxofiIRi5il',
    '',
    'Google_115419186368884878540',
    NULL,
    '2020-08-28 16:59:19.964051+00',
    '2020-08-28 16:59:19.964051+00'
  );
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('task_assignee', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('bell_initiator', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('bell_owner', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('task_requestor', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('task_follower', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('bell_follower', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('goal_assignee', NULL);
INSERT INTO m2.participation_roles (id, attribute)
VALUES ('goal_follower', NULL);
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_108096699587682538913',
    '2020-08-27 06:34:53.265+00',
    '2020-08-27 06:34:53.384972+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-27 06:34:53.265+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_115419186368884878540',
    '2020-08-27 06:34:53.265+00',
    '2020-08-27 06:34:53.384972+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-27 06:34:53.265+00',
    'bell_initiator'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_113132363560941198349',
    '2020-08-27 06:34:53.265+00',
    '2020-08-27 06:34:53.384972+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-27 06:34:53.265+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_109551792009621810100',
    '2020-08-27 06:34:53.265+00',
    '2020-08-27 06:34:53.384972+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-27 06:34:53.265+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_109551792009621810100',
    '2020-08-27 21:01:33.187+00',
    '2020-08-27 21:01:33.488751+00',
    'hZYDVHXXk_uvWWWB9vgpU',
    '2020-08-27 21:01:33.187+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_115419186368884878540',
    '2020-08-27 21:01:33.187+00',
    '2020-08-27 21:01:33.488751+00',
    'hZYDVHXXk_uvWWWB9vgpU',
    '2020-08-27 21:01:33.187+00',
    'bell_initiator'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_111918078641246610063',
    '2020-08-27 21:01:33.187+00',
    '2020-08-27 21:01:33.488751+00',
    'hZYDVHXXk_uvWWWB9vgpU',
    '2020-08-27 21:01:33.187+00',
    'bell_initiator'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_108096699587682538913',
    '2020-08-27 21:01:33.187+00',
    '2020-08-27 21:01:33.488751+00',
    'hZYDVHXXk_uvWWWB9vgpU',
    '2020-08-27 21:01:33.187+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_109551792009621810100',
    '2020-08-27 22:10:24.222+00',
    '2020-08-27 22:10:24.308103+00',
    'KT5VZpZMR5RVGscTjcY4w',
    '2020-08-27 22:10:24.222+00',
    'bell_initiator'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_115419186368884878540',
    '2020-08-27 22:10:24.222+00',
    '2020-08-27 22:10:24.308103+00',
    'KT5VZpZMR5RVGscTjcY4w',
    '2020-08-27 22:10:24.222+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_108096699587682538913',
    '2020-08-27 22:10:24.222+00',
    '2020-08-27 22:10:24.308103+00',
    'KT5VZpZMR5RVGscTjcY4w',
    '2020-08-27 22:10:24.222+00',
    'bell_initiator'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_115419186368884878540',
    '2020-08-27 22:12:00.451+00',
    '2020-08-27 22:12:00.534015+00',
    'ur7ngwkbwjyMFwz5aSpDN',
    '2020-08-27 22:12:00.451+00',
    'goal_assignee'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_108096699587682538913',
    '2020-08-28 04:46:13.896+00',
    '2020-08-28 04:46:13.955274+00',
    'CdS4SDB_fvUxcIXDZL6NC',
    '2020-08-28 04:46:13.896+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_109551792009621810100',
    '2020-08-28 04:46:13.896+00',
    '2020-08-28 04:46:13.955274+00',
    'CdS4SDB_fvUxcIXDZL6NC',
    '2020-08-28 04:46:13.896+00',
    'bell_follower'
  );
INSERT INTO chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES (
    'Google_115419186368884878540',
    '2020-08-28 04:46:13.896+00',
    '2020-08-28 04:46:13.955274+00',
    'CdS4SDB_fvUxcIXDZL6NC',
    '2020-08-28 04:46:13.896+00',
    'bell_initiator'
  );
INSERT INTO m2.block_state (id, attribute)
VALUES ('Created', NULL);
INSERT INTO m2.block_state (id, attribute)
VALUES ('Running', NULL);
INSERT INTO m2.block_state (id, attribute)
VALUES ('Success', NULL);
INSERT INTO m2.block_state (id, attribute)
VALUES ('Failure', NULL);
INSERT INTO m2.block_state (id, attribute)
VALUES ('Draft', NULL);
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    's4Uq5-3xUX5bljHUIJMLW',
    'Facilities Purchase Request',
    'Get purchase request, have dept. leads approve, and have Finance approve.',
    '{"artifacts": [{"url": "https://samantha-assets.s3.amazonaws.com/artifacts/HVAC+Permit.pdf", "title": "Submission of city for HVAC approval", "filename": "HVAC Permit.pdf"}, {"url": "https://www.standardheating.com/wp-cms/wp-content/uploads/2015/09/HVACdiagram2-1024x634.png", "title": "HVAC system", "filename": "HVAC system diagram.png"}]}',
    '{}',
    '{}',
    'Running',
    true,
    '2020-07-30 07:37:49.40117+00',
    '2020-07-30 07:37:49.40117+00',
    '2020-08-04 05:36:50.33183+00',
    '11OPQ53T10ju7GYERgBOP',
    true,
    NULL,
    '2020-08-05 00:08:25.929326+00'
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'Mz1t1IwyheFE5oVYwkJPW',
    'Large Spend Approval Request',
    'Large Spend Approval Request description',
    '{}',
    '{}',
    '{}',
    'Created',
    true,
    '2020-07-31 17:37:10.704903+00',
    '2020-07-31 17:37:10.704903+00',
    NULL,
    'QwnivOlovwLzVHcCN1wZF',
    false,
    's4Uq5-3xUX5bljHUIJMLW',
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'uKCjhrV-wGSxofiIRi5il',
    '(demo def) Facilities Purchase Request',
    'Get purchase request, have dept. leads approve, and have Finance approve.',
    '{}',
    '{}',
    '{}',
    'Running',
    false,
    '2020-08-15 07:48:47.388027+00',
    '2020-08-15 07:48:47.388027+00',
    NULL,
    '8-qMZR1PGMgp0OFUv2aYa',
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'hZYDVHXXk_uvWWWB9vgpU',
    '(demo def) Large Spend Approval Request ',
    'Large Spend Approval Request description',
    '{}',
    '{}',
    '{}',
    'Created',
    false,
    '2020-08-15 07:48:47.831572+00',
    '2020-08-15 07:48:47.831572+00',
    NULL,
    'ur7ngwkbwjyMFwz5aSpDN',
    false,
    'uKCjhrV-wGSxofiIRi5il',
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'CdS4SDB_fvUxcIXDZL6NC',
    '(demo def) Facilities Purchase Request',
    'Get purchase request, have dept. leads approve, and have Finance approve.',
    '{}',
    '{}',
    '{}',
    'Running',
    false,
    '2020-08-19 05:04:24.590527+00',
    '2020-08-19 05:04:24.590527+00',
    NULL,
    '9btZCx4q6v9CCHo-J6Nog',
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    '9kV6WSZqyE8QqJDsC4PjZ',
    '(demo def) Large Spend Approval Request ',
    'Large Spend Approval Request description',
    '{}',
    '{}',
    '{}',
    'Created',
    false,
    '2020-08-19 05:04:24.961698+00',
    '2020-08-19 05:04:24.961698+00',
    NULL,
    'pmYcxnnEEHJSbWT920VZW',
    false,
    'CdS4SDB_fvUxcIXDZL6NC',
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    '543EWZglrNCjit2QjbBBN',
    '(demo def) Large Spend Approval Request ',
    'Large Spend Approval Request description',
    '{}',
    '{}',
    '{}',
    'Running',
    false,
    '2020-08-27 22:13:16.542297+00',
    '2020-08-27 22:13:16.542297+00',
    NULL,
    'KZ6QoD2b_gjM5OsazBuPB',
    false,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'k6rrYge8SLUEOCss4u3nA',
    '(demo def) Facilities Purchase Request',
    'Get purchase request, have dept. leads approve, and have Finance approve.',
    '{}',
    '{}',
    '{}',
    'Running',
    false,
    '2020-08-27 22:13:17.758761+00',
    '2020-08-27 22:13:17.758761+00',
    NULL,
    'H1BoW-HU_5IbNMwLJSAsB',
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'xw-eN78E-9k4-GlYXm5IL',
    '(demo def) Large Spend Approval Request ',
    'Large Spend Approval Request description',
    '{}',
    '{}',
    '{}',
    'Created',
    false,
    '2020-08-27 22:13:18.292592+00',
    '2020-08-27 22:13:18.292592+00',
    NULL,
    '3Iku-NzBVz9KAzbiVgctf',
    false,
    'k6rrYge8SLUEOCss4u3nA',
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'FWLMKIsDI2JubB-TdTFjU',
    'M2.0 bug tracking',
    NULL,
    '{}',
    '{}',
    '{}',
    'Running',
    false,
    '2020-08-27 22:13:19.473676+00',
    '2020-08-27 22:13:19.473676+00',
    NULL,
    NULL,
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'OkC2sgekFlFu--8G_hkZ_',
    'M2.0 bug tracking',
    NULL,
    '{}',
    '{}',
    '{}',
    'Running',
    false,
    '2020-08-27 22:13:19.474644+00',
    '2020-08-27 22:13:19.474644+00',
    NULL,
    NULL,
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'ZO9oteJL_Xoi-97C2rz41',
    '(demo def) Facilities Purchase Request',
    'Get purchase request, have dept. leads approve, and have Finance approve.',
    '{}',
    '{}',
    '{}',
    'Running',
    true,
    '2020-08-14 01:38:24.835536+00',
    '2020-08-14 01:38:24.835536+00',
    '2020-08-14 02:00:16.179544+00',
    'sGnla9TNTZL8GzE0crXrC',
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'OkJQM-s-wCrTjCGbA0GJi',
    '(demo def) Large Spend Approval Request ',
    'Large Spend Approval Request description',
    '{}',
    '{}',
    '{}',
    'Running',
    true,
    '2020-08-14 01:38:25.296164+00',
    '2020-08-14 01:38:25.296164+00',
    '2020-08-14 02:49:15.668918+00',
    'naHj1Ss8X7HgDu5iZUxZI',
    false,
    'ZO9oteJL_Xoi-97C2rz41',
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    'KT5VZpZMR5RVGscTjcY4w',
    '(demo) M2.0 bug tracking',
    NULL,
    '{}',
    '{}',
    '{}',
    'Created',
    false,
    '2020-08-07 02:07:36.538775+00',
    '2020-08-07 02:07:36.538775+00',
    NULL,
    NULL,
    true,
    NULL,
    NULL
  );
INSERT INTO m2.bells (
    id,
    name,
    description,
    context,
    inputs,
    outputs,
    state,
    is_definition,
    created_at,
    updated_at,
    started_at,
    root_block_id,
    acts_as_main_bell,
    main_bell_id,
    ended_at
  )
VALUES (
    '7OMupCxKZRNaBatCjKRb_',
    'M2.0 bug tracking',
    NULL,
    '{}',
    '{}',
    '{}',
    'Created',
    true,
    '2020-08-14 01:37:58.715796+00',
    '2020-08-14 01:37:58.715796+00',
    NULL,
    NULL,
    true,
    NULL,
    NULL
  );
INSERT INTO m2.block_type (id, category)
VALUES ('APIExecutor', 'Executor');
INSERT INTO m2.block_type (id, category)
VALUES ('BellExecutor', 'Executor');
INSERT INTO m2.block_type (id, category)
VALUES ('Task', 'Task');
INSERT INTO m2.block_type (id, category)
VALUES ('Goal', 'Goal');
INSERT INTO m2.block_type (id, category)
VALUES ('Notification', 'Executor');
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'QwnivOlovwLzVHcCN1wZF',
    'VIwcpLa_dfw0jBLlU6rK0',
    'Mz1t1IwyheFE5oVYwkJPW',
    'Created',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Goal (Finance Team Spend Approval)',
    '2020-07-31 17:42:28.149388+00',
    '2020-07-31 17:42:28.149388+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'w7WjLJgmw-8IcoJPwymUV',
    'sTOp8e44a9NdJweWr828_',
    's4Uq5-3xUX5bljHUIJMLW',
    'Created',
    'APIExecutor',
    false,
    '{"API": {"input": {"bellhop_id": "$(Context.Global.Bellhop_Initiator.ID)"}}}',
    'bVeXuHvMlUVpbM2e4zMy9',
    1,
    'API (Lookup Cost Center by Initiator''s Bellhop ID)',
    '2020-07-30 08:17:15.205561+00',
    '2020-07-30 08:17:15.205561+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '05rDLPiegRuF7-f72D-PK',
    'Fw2rwZaa27CIyilQKNqge',
    's4Uq5-3xUX5bljHUIJMLW',
    'Success',
    'Task',
    false,
    '{}',
    'bVeXuHvMlUVpbM2e4zMy9',
    2,
    'Task (What categories describe this purchase?)',
    '2020-07-30 08:17:57.465675+00',
    '2020-07-30 08:17:57.465675+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'G-M8ECueR0697Gx8buehJ',
    'vuJeHylhqX0YbTVtgDsZ7',
    's4Uq5-3xUX5bljHUIJMLW',
    'Success',
    'Task',
    false,
    '{}',
    'bVeXuHvMlUVpbM2e4zMy9',
    3,
    'Task (How much do you need to budget?)',
    '2020-07-30 08:19:26.854575+00',
    '2020-07-30 08:19:26.854575+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '11OPQ53T10ju7GYERgBOP',
    'H2_a_Rk3ay03OozK5aeyK',
    's4Uq5-3xUX5bljHUIJMLW',
    'Created',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Main Goal (Facilities Spend Request)',
    '2020-07-30 07:39:47.197711+00',
    '2020-07-30 07:39:47.197711+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'emfJCl6E2Dc32GXQtf4FO',
    'Qa9j-wSS3YZFMPcKiy7rM',
    'Mz1t1IwyheFE5oVYwkJPW',
    'Created',
    'Task',
    false,
    '{}',
    'QwnivOlovwLzVHcCN1wZF',
    1,
    'Task (Dir. of FP&A Approval)',
    '2020-07-31 17:46:39.466706+00',
    '2020-07-31 17:46:39.466706+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'QWhbnWC7Esg2UwIVIbbfG',
    '8o_yyJjEDKmhsRA1gIlv7',
    's4Uq5-3xUX5bljHUIJMLW',
    'Success',
    'Task',
    false,
    '{}',
    '0vNN_nHW0jc87jo-s8XPd',
    NULL,
    'Task (Head of Facilities Approval)',
    '2020-07-30 08:47:52.045784+00',
    '2020-07-30 08:47:52.045784+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'f9-D98KF8ZHvNn5GIhBGw',
    '2tAIiTBtJXmVC2xF_Wcr4',
    's4Uq5-3xUX5bljHUIJMLW',
    'Created',
    'APIExecutor',
    false,
    '{}',
    '790hOnMXtRMBWhiZetAIK',
    NULL,
    'API (Update Netsuite/SAP)',
    '2020-07-30 08:52:04.838542+00',
    '2020-07-30 08:52:04.838542+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'tuqfR-7bTIsyHXgiq8XSP',
    'qzUHD8X2uc6Qomg2Oh7iM',
    's4Uq5-3xUX5bljHUIJMLW',
    'Created',
    'BellExecutor',
    false,
    '{}',
    '0vNN_nHW0jc87jo-s8XPd',
    NULL,
    'Sub Bell (Finance Approval) (bell_id incomplete)',
    '2020-07-30 08:49:50.491672+00',
    '2020-07-30 08:49:50.491672+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'QwpfcdLPH_iQqzbz7nFg-',
    'ZKinThbIS7TwdHA49RpZp',
    's4Uq5-3xUX5bljHUIJMLW',
    'Running',
    'Task',
    false,
    '{}',
    'bVeXuHvMlUVpbM2e4zMy9',
    4,
    'Optional Task (Is it capitalizable?)',
    '2020-07-30 08:20:08.788528+00',
    '2020-07-30 08:20:08.788528+00',
    NULL,
    '2020-07-31 08:20:08.788528+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '790hOnMXtRMBWhiZetAIK',
    '38CVmndMM-H1xXEIkWvrH',
    's4Uq5-3xUX5bljHUIJMLW',
    'Success',
    'Goal',
    false,
    '{}',
    '11OPQ53T10ju7GYERgBOP',
    2,
    'Goal (Execute Purchase)',
    '2020-07-30 08:51:25.1418+00',
    '2020-07-30 08:51:25.1418+00',
    NULL,
    '2020-07-30 09:51:25.1418+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'ZmafozjAljqxYe5jn4voG',
    'OfuLt7QWe8HTV5ArYLjza',
    's4Uq5-3xUX5bljHUIJMLW',
    'Success',
    'Notification',
    false,
    '{"recipients": [], "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'bVeXuHvMlUVpbM2e4zMy9',
    6,
    'UI Notification (Summarize Purchase Information)',
    '2020-07-30 08:37:42.861179+00',
    '2020-07-30 08:37:42.861179+00',
    NULL,
    '2020-08-05 20:20:29.928067+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'dsobfMA_-Bm_hfa4OJ7kC',
    'NnYT4CUJgPEZexz0Io4JL',
    'Mz1t1IwyheFE5oVYwkJPW',
    'Success',
    'Notification',
    false,
    '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'QwnivOlovwLzVHcCN1wZF',
    0,
    'UI Notification (Summarize Spend Information)',
    '2020-07-31 17:44:29.45459+00',
    '2020-07-31 17:44:29.45459+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '0vNN_nHW0jc87jo-s8XPd',
    '7Q1HhUA6rtEsZQVLIsSCk',
    's4Uq5-3xUX5bljHUIJMLW',
    'Created',
    'Goal',
    false,
    '{"control_type": "Parallel", "pre_conditions": {"0": null, "all": [{"fact": "context", "path": "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response", "value": 10000, "operator": "greaterThan"}]}}',
    '11OPQ53T10ju7GYERgBOP',
    1,
    'Conditional Goal (Get All Approvals)',
    '2020-07-30 08:41:13.975206+00',
    '2020-07-30 08:41:13.975206+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'WWazDMHYOxCXCgTyND2js',
    'zFi6jh6a-pkIEXi1_8-md',
    's4Uq5-3xUX5bljHUIJMLW',
    'Created',
    'Task',
    false,
    '{"pre_conditions": {"0": null, "all": [{"fact": "context", "path": "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response", "value": "Yes", "operator": "equal"}]}}',
    'bVeXuHvMlUVpbM2e4zMy9',
    5,
    'Conditional Task: (What is the depreciation period?)',
    '2020-07-30 08:29:20.515691+00',
    '2020-07-30 08:29:20.515691+00',
    NULL,
    '2020-08-01 08:29:20.515691+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'rMj2v1zRwMxFZ6GVDfyFA',
    'cB5whD7WRobLcNngNM95x',
    'KT5VZpZMR5RVGscTjcY4w',
    'Running',
    'Goal',
    false,
    '{}',
    NULL,
    NULL,
    'main goal, fix all the bugs',
    '2020-08-07 02:11:52.050721+00',
    '2020-08-07 02:11:52.050721+00',
    '2020-08-07 02:14:09.140183+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'bVeXuHvMlUVpbM2e4zMy9',
    'rJnhPkEpzbL_KnF6uBBD1',
    's4Uq5-3xUX5bljHUIJMLW',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    '11OPQ53T10ju7GYERgBOP',
    0,
    'Goal (Get Purchasing Information)',
    '2020-07-30 07:41:03.980018+00',
    '2020-07-30 07:41:03.980018+00',
    '2020-08-02 18:51:23.776224+00',
    '2020-08-03 04:23:53.760417+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'gYNgpxQV30mqqX_ZkeC_P',
    'rJnhPkEpzbL_KnF6uBBD1',
    'ZO9oteJL_Xoi-97C2rz41',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    'sGnla9TNTZL8GzE0crXrC',
    0,
    '1. Goal (Get Purchasing Information)',
    '2020-08-14 01:38:24.977074+00',
    '2020-08-14 02:48:27.657+00',
    '2020-08-14 02:13:05.196051+00',
    '2020-08-14 02:48:27.662291+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'Ls_12oQFy5tJh-_0zu46T',
    'ZKinThbIS7TwdHA49RpZp',
    'ZO9oteJL_Xoi-97C2rz41',
    'Success',
    'Task',
    false,
    '{}',
    'gYNgpxQV30mqqX_ZkeC_P',
    4,
    '1.4. Optional Task (Is it capitalizable?)',
    '2020-08-14 01:38:25.07962+00',
    '2020-08-14 03:53:39.812+00',
    '2020-08-14 03:53:39.818471+00',
    '2020-08-14 03:53:44.840354+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'a8-3faq7joeAaLbEp2Dn9',
    'vuJeHylhqX0YbTVtgDsZ7',
    'ZO9oteJL_Xoi-97C2rz41',
    'Success',
    'Task',
    false,
    '{}',
    'gYNgpxQV30mqqX_ZkeC_P',
    3,
    '1.3. Task (How much do you need to budget?)',
    '2020-08-14 01:38:25.056749+00',
    '2020-08-14 03:53:20.751+00',
    '2020-08-14 03:53:20.760232+00',
    '2020-08-14 03:53:39.551037+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'sGnla9TNTZL8GzE0crXrC',
    'H2_a_Rk3ay03OozK5aeyK',
    'ZO9oteJL_Xoi-97C2rz41',
    'Created',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    '0. Main Goal (Facilities Spend Request)',
    '2020-08-14 01:38:24.886838+00',
    '2020-08-14 01:38:24.886838+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'FClaHQb39vKG4bezVpQ8w',
    'Fw2rwZaa27CIyilQKNqge',
    'ZO9oteJL_Xoi-97C2rz41',
    'Success',
    'Task',
    false,
    '{}',
    'gYNgpxQV30mqqX_ZkeC_P',
    2,
    '1.2. Task (What categories describe this purchase?)',
    '2020-08-14 01:38:25.030498+00',
    '2020-08-14 03:49:34.035+00',
    '2020-08-14 03:49:34.04452+00',
    '2020-08-14 03:53:20.355288+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'IrI92WHVMdN1xCB9IxPQI',
    '38CVmndMM-H1xXEIkWvrH',
    'ZO9oteJL_Xoi-97C2rz41',
    'Created',
    'Goal',
    false,
    '{}',
    'sGnla9TNTZL8GzE0crXrC',
    2,
    '3. Goal (Execute Purchase)',
    '2020-08-14 01:38:24.918275+00',
    '2020-08-14 01:38:24.918275+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'T6gKggSMxB5jFUMQUq_pe',
    'cO64qn3wioY6O7h_LOi-L',
    'ZO9oteJL_Xoi-97C2rz41',
    'Success',
    'Task',
    false,
    '{}',
    'gYNgpxQV30mqqX_ZkeC_P',
    1,
    '1.1. Task (What are you purchasing?) ',
    '2020-08-14 01:38:25.110318+00',
    '2020-08-14 03:10:03.746+00',
    '2020-08-14 02:00:49.111615+00',
    '2020-08-14 03:49:33.626057+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '4xSL4lJUd6ZR9wZqtv7Wm',
    'OfuLt7QWe8HTV5ArYLjza',
    'ZO9oteJL_Xoi-97C2rz41',
    'Running',
    'Notification',
    false,
    '{"recipients": [], "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'gYNgpxQV30mqqX_ZkeC_P',
    6,
    '1.6. UI Notification (Summarize Purchase Information)',
    '2020-08-14 01:38:25.145523+00',
    '2020-08-14 03:53:49.881+00',
    '2020-08-14 02:36:38.466651+00',
    '2020-08-14 02:48:26.871458+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'HttfA2gqDC5Uek_WD-rpn',
    'cO64qn3wioY6O7h_LOi-L',
    's4Uq5-3xUX5bljHUIJMLW',
    'Success',
    'Task',
    false,
    '{}',
    'bVeXuHvMlUVpbM2e4zMy9',
    0,
    'Task (What are you purchasing?)',
    '2020-07-30 07:42:49.683987+00',
    '2020-07-30 07:42:49.683987+00',
    '2020-07-30 07:42:49.683987+00',
    '2020-08-04 07:56:09.051986+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'OrGy7nY4t8iSPisJA8qSD',
    'h2lPysEY94l-mzVjkgJj2',
    'KT5VZpZMR5RVGscTjcY4w',
    'Running',
    'Task',
    false,
    '{}',
    'rMj2v1zRwMxFZ6GVDfyFA',
    5,
    'Task View: The Participants version of the Task View should have the Goal displayed between the Bell information and Task information (see M2 Mockups 5.c)',
    '2020-08-06 20:47:38.922571+00',
    '2020-08-07 20:47:38.922571+00',
    NULL,
    '2020-08-07 20:47:38.922571+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'BmdTLSuhY_1vctztXxuTk',
    'uc7DhSvSkIC7w3ro79uBW',
    'KT5VZpZMR5RVGscTjcY4w',
    'Success',
    'Task',
    false,
    '{}',
    'rMj2v1zRwMxFZ6GVDfyFA',
    1,
    'Search: highlight the sub-string characters that matched in the results',
    '2020-08-07 12:10:16.571863+00',
    '2020-08-07 12:10:16.571863+00',
    '2020-08-07 13:26:22.00077+00',
    '2020-08-14 06:15:05.805445+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'goG3kPIYpOYhmlqR67B6i',
    '0I4_ps2rZG85IqAS8cMJx',
    'KT5VZpZMR5RVGscTjcY4w',
    'Running',
    'Task',
    false,
    '{}',
    'rMj2v1zRwMxFZ6GVDfyFA',
    2,
    'Running Bell Page: For Bell "Started At"',
    '2020-08-07 07:29:42.791142+00',
    '2020-08-14 06:15:05.842+00',
    '2020-08-07 07:29:59.158287+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'bN_ggtdisDjUrtrvTe-0F',
    'tMcJVxjsmZ6y8e-7rzNa-',
    'KT5VZpZMR5RVGscTjcY4w',
    'Success',
    'Task',
    false,
    '{}',
    'rMj2v1zRwMxFZ6GVDfyFA',
    3,
    'Running Bell Page: Participant Followers need to be de-duplicated from the Assignees (both on drop down and in the circles)',
    '2020-08-07 08:05:22.952451+00',
    '2020-08-07 08:05:22.952451+00',
    NULL,
    '2020-08-14 06:15:18.380979+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'PxmmZKPVGbmTDo1U-QAul',
    'DZ-e3g0QvyK2fqFUrRfGX',
    'KT5VZpZMR5RVGscTjcY4w',
    'Running',
    'Task',
    false,
    '{}',
    'rMj2v1zRwMxFZ6GVDfyFA',
    4,
    'Running Bell Page: In Activities, if a Task is selected, scroll to the correct Task.',
    '2020-08-07 20:03:17.859806+00',
    '2020-08-14 06:15:18.877+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '4wrAAgcKX7JCat1CgG1kX',
    'ZKinThbIS7TwdHA49RpZp',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Task',
    false,
    '{}',
    '1hUGXy4Hj34U4Cu-bW1tD',
    4,
    '1.4. Optional Task (Is it capitalizable?)',
    '2020-08-15 07:48:47.524263+00',
    '2020-08-15 07:48:47.524263+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'hIFqCcVcgefRZxL2iZvdb',
    'vuJeHylhqX0YbTVtgDsZ7',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Task',
    false,
    '{}',
    '1hUGXy4Hj34U4Cu-bW1tD',
    3,
    '1.3. Task (How much do you need to budget?)',
    '2020-08-15 07:48:47.562748+00',
    '2020-08-15 07:48:47.562748+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'UnyxsXiacCnXdY5fEtNwj',
    'Fw2rwZaa27CIyilQKNqge',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Task',
    false,
    '{}',
    '1hUGXy4Hj34U4Cu-bW1tD',
    2,
    '1.2. Task (What categories describe this purchase?)',
    '2020-08-15 07:48:47.59009+00',
    '2020-08-15 07:48:47.59009+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'dlSv1H4X6pS0sr91C4r_v',
    'OfuLt7QWe8HTV5ArYLjza',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Notification',
    false,
    '{"recipients": [], "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    '1hUGXy4Hj34U4Cu-bW1tD',
    6,
    '1.6. UI Notification (Summarize Purchase Information)',
    '2020-08-15 07:48:47.643104+00',
    '2020-08-15 07:48:47.643104+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'BbRhIal9rnUSCqqzDA_bn',
    'zFi6jh6a-pkIEXi1_8-md',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Task',
    false,
    '{"pre_conditions": {"all": [{"fact": "context", "path": "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response", "value": "Yes", "operator": "equal"}]}}',
    '1hUGXy4Hj34U4Cu-bW1tD',
    5,
    '1.5. Conditional Task: (What is the depreciation period?)',
    '2020-08-15 07:48:47.657309+00',
    '2020-08-15 07:48:47.657309+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'c_JjJApcPi2EO6uL-IwwF',
    '38CVmndMM-H1xXEIkWvrH',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Goal',
    false,
    '{}',
    '8-qMZR1PGMgp0OFUv2aYa',
    2,
    '3. Goal (Execute Purchase)',
    '2020-08-15 07:48:47.683671+00',
    '2020-08-15 07:48:47.683671+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'i-5cleEPOAcprCeFpS71q',
    '7Q1HhUA6rtEsZQVLIsSCk',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Goal',
    false,
    '{"control_type": "Parallel", "pre_conditions": {"all": [{"fact": "context", "path": "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response", "value": 10000, "operator": "greaterThan"}]}}',
    '8-qMZR1PGMgp0OFUv2aYa',
    1,
    '2. Conditional Goal (Get All Approvals)',
    '2020-08-15 07:48:47.721661+00',
    '2020-08-15 07:48:47.721661+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'yNqfj3sp2TZLkqOxe2LNj',
    'zFi6jh6a-pkIEXi1_8-md',
    'ZO9oteJL_Xoi-97C2rz41',
    'Success',
    'Task',
    false,
    '{"pre_conditions": {"all": [{"fact": "context", "path": "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response", "value": "Yes", "operator": "equal"}]}}',
    'gYNgpxQV30mqqX_ZkeC_P',
    5,
    '1.5. Conditional Task: (What is the depreciation period?)',
    '2020-08-14 01:38:25.159792+00',
    '2020-08-14 03:53:45.848+00',
    '2020-08-14 03:53:45.852963+00',
    '2020-08-14 03:53:49.334525+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '8-qMZR1PGMgp0OFUv2aYa',
    'H2_a_Rk3ay03OozK5aeyK',
    'uKCjhrV-wGSxofiIRi5il',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    '0. Main Goal (Facilities Spend Request)',
    '2020-08-15 07:48:47.4522+00',
    '2020-08-15 07:48:47.802+00',
    '2020-08-15 07:48:47.807982+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'ur7ngwkbwjyMFwz5aSpDN',
    'VIwcpLa_dfw0jBLlU6rK0',
    'hZYDVHXXk_uvWWWB9vgpU',
    'Created',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Goal (Finance Team Spend Approval)',
    '2020-08-15 07:48:47.892437+00',
    '2020-08-15 07:48:47.892437+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '5rT7UZYfFY-8Ip_EsN3Ks',
    'Qa9j-wSS3YZFMPcKiy7rM',
    'hZYDVHXXk_uvWWWB9vgpU',
    'Created',
    'Task',
    false,
    '{}',
    'ur7ngwkbwjyMFwz5aSpDN',
    1,
    'Task (Dir. of FP&A Approval)',
    '2020-08-15 07:48:47.920263+00',
    '2020-08-15 07:48:47.920263+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '1hUGXy4Hj34U4Cu-bW1tD',
    'rJnhPkEpzbL_KnF6uBBD1',
    'uKCjhrV-wGSxofiIRi5il',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    '8-qMZR1PGMgp0OFUv2aYa',
    0,
    '1. Goal (Get Purchasing Information)',
    '2020-08-15 07:48:47.486542+00',
    '2020-08-15 07:48:48.773+00',
    '2020-08-15 07:48:48.777807+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'KygK0xZuy-JncT9VwTmWf',
    'cO64qn3wioY6O7h_LOi-L',
    'uKCjhrV-wGSxofiIRi5il',
    'Running',
    'Task',
    false,
    '{}',
    '1hUGXy4Hj34U4Cu-bW1tD',
    1,
    '1.1. Task (What are you purchasing?) ',
    '2020-08-15 07:48:47.61577+00',
    '2020-08-15 07:48:49.776+00',
    '2020-08-15 07:48:49.780875+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '9PHQ9CG7qx73qpoqFgbza',
    'ZKinThbIS7TwdHA49RpZp',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'Task',
    false,
    '{}',
    'NKDd5z-6oupnk0xYxehp5',
    4,
    '1.4. Optional Task (Is it capitalizable?)',
    '2020-08-19 05:04:24.696536+00',
    '2020-08-19 05:04:24.696536+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '9btZCx4q6v9CCHo-J6Nog',
    'H2_a_Rk3ay03OozK5aeyK',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    '0. Main Goal (Facilities Spend Request)',
    '2020-08-19 05:04:24.644377+00',
    '2020-08-19 05:04:24.934+00',
    '2020-08-19 05:04:24.940198+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'pmYcxnnEEHJSbWT920VZW',
    'VIwcpLa_dfw0jBLlU6rK0',
    '9kV6WSZqyE8QqJDsC4PjZ',
    'Created',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Goal (Finance Team Spend Approval)',
    '2020-08-19 05:04:25.010393+00',
    '2020-08-19 05:04:25.010393+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'KwBXpNHaP5-MygHrgFfRx',
    'Qa9j-wSS3YZFMPcKiy7rM',
    '9kV6WSZqyE8QqJDsC4PjZ',
    'Created',
    'Task',
    false,
    '{}',
    'pmYcxnnEEHJSbWT920VZW',
    1,
    'Task (Dir. of FP&A Approval)',
    '2020-08-19 05:04:25.030937+00',
    '2020-08-19 05:04:25.030937+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'mtX7J4plBOtgU4A1QutVM',
    'NnYT4CUJgPEZexz0Io4JL',
    '9kV6WSZqyE8QqJDsC4PjZ',
    'Created',
    'Notification',
    false,
    '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'pmYcxnnEEHJSbWT920VZW',
    0,
    'UI Notification (Summarize Spend Information)',
    '2020-08-19 05:04:25.051774+00',
    '2020-08-19 05:04:25.051774+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'NKDd5z-6oupnk0xYxehp5',
    'rJnhPkEpzbL_KnF6uBBD1',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    '9btZCx4q6v9CCHo-J6Nog',
    0,
    '1. Goal (Get Purchasing Information)',
    '2020-08-19 05:04:24.667626+00',
    '2020-08-19 05:04:25.73+00',
    '2020-08-19 05:04:25.734611+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'Ptp8DRwlJ9U_q3DoJE0Ls',
    'ZKinThbIS7TwdHA49RpZp',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Task',
    false,
    '{}',
    'T5ghs1jpEW20UNE-QQzxJ',
    4,
    '1.4. Optional Task (Is it capitalizable?)',
    '2020-08-27 22:13:17.908238+00',
    '2020-08-27 22:13:17.908238+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'CFshVQun7tDJGruDE3VCp',
    'vuJeHylhqX0YbTVtgDsZ7',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Task',
    false,
    '{}',
    'T5ghs1jpEW20UNE-QQzxJ',
    3,
    '1.3. Task (How much do you need to budget?)',
    '2020-08-27 22:13:17.955911+00',
    '2020-08-27 22:13:17.955911+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '6Y0ovqcUJiuyP1QhAGXeK',
    'Fw2rwZaa27CIyilQKNqge',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Task',
    false,
    '{}',
    'T5ghs1jpEW20UNE-QQzxJ',
    2,
    '1.2. Task (What categories describe this purchase?)',
    '2020-08-27 22:13:17.999722+00',
    '2020-08-27 22:13:17.999722+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'PS9EVT0evEVXeoXgfvP__',
    '7Q1HhUA6rtEsZQVLIsSCk',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Goal',
    false,
    '{"control_type": "Parallel", "pre_conditions": {"all": [{"fact": "context", "path": "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response", "value": 10000, "operator": "greaterThan"}]}}',
    'H1BoW-HU_5IbNMwLJSAsB',
    1,
    '2. Conditional Goal (Get All Approvals)',
    '2020-08-27 22:13:18.174494+00',
    '2020-08-27 22:13:18.174494+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '3fBc5o_xXF9yAnN04ZQoS',
    'qzUHD8X2uc6Qomg2Oh7iM',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'BellExecutor',
    false,
    '{}',
    'PS9EVT0evEVXeoXgfvP__',
    NULL,
    'Sub Bell (Finance Approval) (bell_id incomplete)',
    '2020-08-27 22:13:18.216973+00',
    '2020-08-27 22:13:18.216973+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'KUq4SN1qUrBezCs_9IzMb',
    '8o_yyJjEDKmhsRA1gIlv7',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Task',
    false,
    '{}',
    'PS9EVT0evEVXeoXgfvP__',
    NULL,
    '2.1. Task (Head of Facilities Approval)',
    '2020-08-27 22:13:18.24193+00',
    '2020-08-27 22:13:18.24193+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'H1BoW-HU_5IbNMwLJSAsB',
    'H2_a_Rk3ay03OozK5aeyK',
    'k6rrYge8SLUEOCss4u3nA',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    '0. Main Goal (Facilities Spend Request)',
    '2020-08-27 22:13:17.826916+00',
    '2020-08-27 22:13:18.266+00',
    '2020-08-27 22:13:18.272982+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '3Iku-NzBVz9KAzbiVgctf',
    'VIwcpLa_dfw0jBLlU6rK0',
    'xw-eN78E-9k4-GlYXm5IL',
    'Created',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Goal (Finance Team Spend Approval)',
    '2020-08-27 22:13:18.355996+00',
    '2020-08-27 22:13:18.355996+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'taOJ6DjO-Y0GIv82XqAL7',
    'Qa9j-wSS3YZFMPcKiy7rM',
    'xw-eN78E-9k4-GlYXm5IL',
    'Created',
    'Task',
    false,
    '{}',
    '3Iku-NzBVz9KAzbiVgctf',
    1,
    'Task (Dir. of FP&A Approval)',
    '2020-08-27 22:13:18.394468+00',
    '2020-08-27 22:13:18.394468+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'CBMCNZYkg5u191HW1ViRe',
    'NnYT4CUJgPEZexz0Io4JL',
    'xw-eN78E-9k4-GlYXm5IL',
    'Created',
    'Notification',
    false,
    '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    '3Iku-NzBVz9KAzbiVgctf',
    0,
    'UI Notification (Summarize Spend Information)',
    '2020-08-27 22:13:18.421654+00',
    '2020-08-27 22:13:18.421654+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'T5ghs1jpEW20UNE-QQzxJ',
    'rJnhPkEpzbL_KnF6uBBD1',
    'k6rrYge8SLUEOCss4u3nA',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    'H1BoW-HU_5IbNMwLJSAsB',
    0,
    '1. Goal (Get Purchasing Information)',
    '2020-08-27 22:13:17.864782+00',
    '2020-08-27 22:13:19.036+00',
    '2020-08-27 22:13:19.048189+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'AKgCv2E6NavZv1UKsR3I2',
    'qzUHD8X2uc6Qomg2Oh7iM',
    'ZO9oteJL_Xoi-97C2rz41',
    'Created',
    'BellExecutor',
    false,
    '{}',
    'ko2M_qb02qAeg-JZyW6hE',
    NULL,
    'Sub Bell (Finance Approval) (bell_id incomplete)',
    '2020-08-14 01:38:25.250216+00',
    '2020-08-14 01:38:25.250216+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'ZK6Y-kaoCQxeIer-UJXqM',
    'qzUHD8X2uc6Qomg2Oh7iM',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'BellExecutor',
    false,
    '{}',
    'i-5cleEPOAcprCeFpS71q',
    NULL,
    'Sub Bell (Finance Approval) (bell_id incomplete)',
    '2020-08-15 07:48:47.758622+00',
    '2020-08-15 07:48:47.758622+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '-nhqNc7bKzM7bF5fD4Wxj',
    '8o_yyJjEDKmhsRA1gIlv7',
    'uKCjhrV-wGSxofiIRi5il',
    'Created',
    'Task',
    false,
    '{}',
    'i-5cleEPOAcprCeFpS71q',
    NULL,
    '2.1. Task (Head of Facilities Approval)',
    '2020-08-15 07:48:47.781183+00',
    '2020-08-15 07:48:47.781183+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '0WZhUKBwkNkiS3CKO079i',
    'NnYT4CUJgPEZexz0Io4JL',
    'hZYDVHXXk_uvWWWB9vgpU',
    'Created',
    'Notification',
    false,
    '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'ur7ngwkbwjyMFwz5aSpDN',
    0,
    'UI Notification (Summarize Spend Information)',
    '2020-08-15 07:48:47.948903+00',
    '2020-08-15 07:48:47.948903+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'rrDfXP5TiKvXOiP0Bz-Wc',
    'OfuLt7QWe8HTV5ArYLjza',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'Notification',
    false,
    '{"recipients": [], "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'NKDd5z-6oupnk0xYxehp5',
    6,
    '1.6. UI Notification (Summarize Purchase Information)',
    '2020-08-19 05:04:24.809015+00',
    '2020-08-19 05:04:24.809015+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'eP2PeAtQ2kYk6qMGfhOk-',
    'zFi6jh6a-pkIEXi1_8-md',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'Task',
    false,
    '{"pre_conditions": {"all": [{"fact": "context", "path": "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response", "value": "Yes", "operator": "equal"}]}}',
    'NKDd5z-6oupnk0xYxehp5',
    5,
    '1.5. Conditional Task: (What is the depreciation period?)',
    '2020-08-19 05:04:24.817717+00',
    '2020-08-19 05:04:24.817717+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'ko2M_qb02qAeg-JZyW6hE',
    '7Q1HhUA6rtEsZQVLIsSCk',
    'ZO9oteJL_Xoi-97C2rz41',
    'Created',
    'Goal',
    false,
    '{"control_type": "Parallel", "pre_conditions": {"all": [{"fact": "context", "path": "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response", "value": 10000, "operator": "greaterThan"}]}}',
    'sGnla9TNTZL8GzE0crXrC',
    1,
    '2. Conditional Goal (Get All Approvals)',
    '2020-08-14 01:38:25.192047+00',
    '2020-08-14 01:38:25.192047+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '2sJve7kAgSlvY60fIfkEk',
    '8o_yyJjEDKmhsRA1gIlv7',
    'ZO9oteJL_Xoi-97C2rz41',
    'Created',
    'Task',
    false,
    '{}',
    'ko2M_qb02qAeg-JZyW6hE',
    NULL,
    '2.1. Task (Head of Facilities Approval)',
    '2020-08-14 01:38:25.227558+00',
    '2020-08-14 01:38:25.227558+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'lJJWY_MFd1hQmsoIcWJho',
    '38CVmndMM-H1xXEIkWvrH',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'Goal',
    false,
    '{}',
    '9btZCx4q6v9CCHo-J6Nog',
    2,
    '3. Goal (Execute Purchase)',
    '2020-08-19 05:04:24.839203+00',
    '2020-08-19 05:04:24.839203+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'XUJkpznZI-7QOhTrK2Vy3',
    '7Q1HhUA6rtEsZQVLIsSCk',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'Goal',
    false,
    '{"control_type": "Parallel", "pre_conditions": {"all": [{"fact": "context", "path": "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response", "value": 10000, "operator": "greaterThan"}]}}',
    '9btZCx4q6v9CCHo-J6Nog',
    1,
    '2. Conditional Goal (Get All Approvals)',
    '2020-08-19 05:04:24.867999+00',
    '2020-08-19 05:04:24.867999+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'oTivAd96fvTERuMQ1jBlX',
    'qzUHD8X2uc6Qomg2Oh7iM',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'BellExecutor',
    false,
    '{}',
    'XUJkpznZI-7QOhTrK2Vy3',
    NULL,
    'Sub Bell (Finance Approval) (bell_id incomplete)',
    '2020-08-19 05:04:24.899403+00',
    '2020-08-19 05:04:24.899403+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '5Zp5_AQZ5XyPqat5lXj2L',
    '8o_yyJjEDKmhsRA1gIlv7',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Created',
    'Task',
    false,
    '{}',
    'XUJkpznZI-7QOhTrK2Vy3',
    NULL,
    '2.1. Task (Head of Facilities Approval)',
    '2020-08-19 05:04:24.915775+00',
    '2020-08-19 05:04:24.915775+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'Z2tmNY1WzJiB-N8v8ipCH',
    'cO64qn3wioY6O7h_LOi-L',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Success',
    'Task',
    false,
    '{}',
    'NKDd5z-6oupnk0xYxehp5',
    1,
    '1.1. Task (What are you purchasing?) ',
    '2020-08-19 05:04:24.784777+00',
    '2020-08-19 05:04:26.74+00',
    '2020-08-19 05:04:26.745235+00',
    '2020-08-19 05:04:45.732518+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'ujABtyULwWuR87m56fqlh',
    'OfuLt7QWe8HTV5ArYLjza',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Notification',
    false,
    '{"recipients": [], "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'T5ghs1jpEW20UNE-QQzxJ',
    6,
    '1.6. UI Notification (Summarize Purchase Information)',
    '2020-08-27 22:13:18.08485+00',
    '2020-08-27 22:13:18.08485+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'UcjAh7TxMfo7siW2t1faO',
    'Fw2rwZaa27CIyilQKNqge',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Success',
    'Task',
    false,
    '{}',
    'NKDd5z-6oupnk0xYxehp5',
    2,
    '1.2. Task (What categories describe this purchase?)',
    '2020-08-19 05:04:24.761414+00',
    '2020-08-19 05:04:45.81+00',
    '2020-08-19 05:04:45.814573+00',
    '2020-08-19 05:04:53.740941+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '7d1nU1-avYM9_g8ZK1MBo',
    'vuJeHylhqX0YbTVtgDsZ7',
    'CdS4SDB_fvUxcIXDZL6NC',
    'Running',
    'Task',
    false,
    '{}',
    'NKDd5z-6oupnk0xYxehp5',
    3,
    '1.3. Task (How much do you need to budget?)',
    '2020-08-19 05:04:24.734389+00',
    '2020-08-19 05:04:53.842+00',
    '2020-08-19 05:04:53.846119+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'KZ6QoD2b_gjM5OsazBuPB',
    'VIwcpLa_dfw0jBLlU6rK0',
    '543EWZglrNCjit2QjbBBN',
    'Running',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Goal (Finance Team Spend Approval)',
    '2020-08-27 22:13:16.632318+00',
    '2020-08-27 22:13:16.702+00',
    '2020-08-27 22:13:16.710792+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'HcqH59ttZjzlbVg-0v2-Y',
    'cO64qn3wioY6O7h_LOi-L',
    'k6rrYge8SLUEOCss4u3nA',
    'Running',
    'Task',
    false,
    '{}',
    'T5ghs1jpEW20UNE-QQzxJ',
    1,
    '1.1. Task (What are you purchasing?) ',
    '2020-08-27 22:13:18.054673+00',
    '2020-08-27 22:13:20.047+00',
    '2020-08-27 22:13:20.055884+00',
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    't5wlLNL6ow_oWNi179dtc',
    'NnYT4CUJgPEZexz0Io4JL',
    '543EWZglrNCjit2QjbBBN',
    'Success',
    'Notification',
    false,
    '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'KZ6QoD2b_gjM5OsazBuPB',
    0,
    'UI Notification (Summarize Spend Information)',
    '2020-08-27 22:13:16.695818+00',
    '2020-08-27 22:13:18.028+00',
    '2020-08-27 22:13:17.023296+00',
    '2020-08-27 22:13:18.039294+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'hOj13Wvlt71TA2Vs54wHV',
    'zFi6jh6a-pkIEXi1_8-md',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Task',
    false,
    '{"pre_conditions": {"all": [{"fact": "context", "path": "$.task.ZKinThbIS7TwdHA49RpZp.fields[0].response", "value": "Yes", "operator": "equal"}]}}',
    'T5ghs1jpEW20UNE-QQzxJ',
    5,
    '1.5. Conditional Task: (What is the depreciation period?)',
    '2020-08-27 22:13:18.104607+00',
    '2020-08-27 22:13:18.104607+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'uJgxtf3nsWeW1GTv5Nkkv',
    'Qa9j-wSS3YZFMPcKiy7rM',
    'OkJQM-s-wCrTjCGbA0GJi',
    'Success',
    'Task',
    false,
    '{}',
    'naHj1Ss8X7HgDu5iZUxZI',
    1,
    'Task (Dir. of FP&A Approval)',
    '2020-08-14 01:38:25.380111+00',
    '2020-08-14 01:38:25.380111+00',
    '2020-08-14 02:52:04.080355+00',
    '2020-08-14 03:05:14.881421+00'
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '_MaaDLrC8u-PGq0LKG5h4',
    'NnYT4CUJgPEZexz0Io4JL',
    'OkJQM-s-wCrTjCGbA0GJi',
    'Success',
    'Notification',
    false,
    '{"recipients": "everyone", "display_text": "<<TEMPLATED TEXT THAT CAN REFER TO VARIABLES>>", "context_display": true}',
    'naHj1Ss8X7HgDu5iZUxZI',
    0,
    'UI Notification (Summarize Spend Information)',
    '2020-08-14 01:38:25.394317+00',
    '2020-08-14 01:38:25.394317+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'naHj1Ss8X7HgDu5iZUxZI',
    'VIwcpLa_dfw0jBLlU6rK0',
    'OkJQM-s-wCrTjCGbA0GJi',
    'Success',
    'Goal',
    false,
    '{"control_type": "Sequential"}',
    NULL,
    NULL,
    'Goal (Finance Team Spend Approval)',
    '2020-08-14 01:38:25.350153+00',
    '2020-08-14 01:38:25.350153+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    '6KTeoTKj0mo39gBlAxVg4',
    '38CVmndMM-H1xXEIkWvrH',
    'k6rrYge8SLUEOCss4u3nA',
    'Created',
    'Goal',
    false,
    '{}',
    'H1BoW-HU_5IbNMwLJSAsB',
    2,
    '3. Goal (Execute Purchase)',
    '2020-08-27 22:13:18.136899+00',
    '2020-08-27 22:13:18.136899+00',
    NULL,
    NULL
  );
INSERT INTO m2.blocks (
    id,
    local_id,
    bell_id,
    state,
    type,
    is_definition,
    configs,
    parent_id,
    sibling_order,
    name,
    created_at,
    updated_at,
    started_at,
    ended_at
  )
VALUES (
    'vRXPdbij3gwhjohUpF9HZ',
    'Qa9j-wSS3YZFMPcKiy7rM',
    '543EWZglrNCjit2QjbBBN',
    'Running',
    'Task',
    false,
    '{}',
    'KZ6QoD2b_gjM5OsazBuPB',
    1,
    'Task (Dir. of FP&A Approval)',
    '2020-08-27 22:13:16.664998+00',
    '2020-08-27 22:13:19.044+00',
    '2020-08-27 22:13:19.121412+00',
    NULL
  );
INSERT INTO m2.bell_executors (id, type, bell_id, context)
VALUES (
    'tuqfR-7bTIsyHXgiq8XSP',
    'BellExecutor',
    'Mz1t1IwyheFE5oVYwkJPW',
    '{}'
  );
INSERT INTO m2.bell_executors (id, type, bell_id, context)
VALUES (
    'AKgCv2E6NavZv1UKsR3I2',
    'BellExecutor',
    'OkJQM-s-wCrTjCGbA0GJi',
    '{}'
  );
INSERT INTO m2.bell_executors (id, type, bell_id, context)
VALUES (
    'ZK6Y-kaoCQxeIer-UJXqM',
    'BellExecutor',
    'hZYDVHXXk_uvWWWB9vgpU',
    '{}'
  );
INSERT INTO m2.bell_executors (id, type, bell_id, context)
VALUES (
    'oTivAd96fvTERuMQ1jBlX',
    'BellExecutor',
    '9kV6WSZqyE8QqJDsC4PjZ',
    '{}'
  );
INSERT INTO m2.bell_executors (id, type, bell_id, context)
VALUES (
    '3fBc5o_xXF9yAnN04ZQoS',
    'BellExecutor',
    'xw-eN78E-9k4-GlYXm5IL',
    '{}'
  );
INSERT INTO m2.bellhops (
    id,
    name,
    metadata,
    profile_image_url,
    created_at,
    updated_at,
    description
  )
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    'Engineering & Product',
    '{}',
    'https://samantha-assets.s3.amazonaws.com/images/eng.png',
    '2020-07-31 21:27:56.344245+00',
    '2020-07-31 21:27:56.344245+00',
    'building cool product!'
  );
INSERT INTO m2.bellhops (
    id,
    name,
    metadata,
    profile_image_url,
    created_at,
    updated_at,
    description
  )
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'Purchasing Team',
    '{}',
    'https://samantha-assets.s3.amazonaws.com/images/purchasing.png',
    '2020-07-30 07:22:44.257982+00',
    '2020-07-30 07:22:44.257982+00',
    'We handle the logistics of purchasing!'
  );
INSERT INTO m2.bellhops (
    id,
    name,
    metadata,
    profile_image_url,
    created_at,
    updated_at,
    description
  )
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'Facilities',
    '{}',
    'https://samantha-assets.s3.amazonaws.com/images/facilities.png',
    '2020-07-20 21:32:05.280057+00',
    '2020-07-20 21:32:05.280057+00',
    'We keep our facilities in working order!'
  );
INSERT INTO m2.bellhops (
    id,
    name,
    metadata,
    profile_image_url,
    created_at,
    updated_at,
    description
  )
VALUES (
    '1ibkm0rWaBenw4GvR2_HA',
    'Marketing',
    '{}',
    'https://samantha-assets.s3.amazonaws.com/images/marketing.png',
    '2020-07-20 21:32:15.007791+00',
    '2020-07-20 21:32:15.007791+00',
    'We tell our story!'
  );
INSERT INTO m2.bellhops (
    id,
    name,
    metadata,
    profile_image_url,
    created_at,
    updated_at,
    description
  )
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'Finance',
    '{}',
    'https://samantha-assets.s3.amazonaws.com/images/finance.png',
    '2020-07-20 21:32:24.717504+00',
    '2020-07-20 21:32:24.717504+00',
    'We make sure that we are responsible with our money!'
  );
INSERT INTO m2.bellhops (
    id,
    name,
    metadata,
    profile_image_url,
    created_at,
    updated_at,
    description
  )
VALUES (
    'rSIbpHk-JU4Rca7sF4Z7A',
    'Legal',
    '{}',
    'https://samantha-assets.s3.amazonaws.com/images/legal.png',
    '2020-07-20 21:32:32.292195+00',
    '2020-07-20 21:32:32.292195+00',
    'We keep us from doing anything stupid!'
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    's4Uq5-3xUX5bljHUIJMLW',
    'bell_owner',
    2
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    's4Uq5-3xUX5bljHUIJMLW',
    'bell_initiator',
    3
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'Mz1t1IwyheFE5oVYwkJPW',
    'bell_owner',
    4
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'Mz1t1IwyheFE5oVYwkJPW',
    'bell_initiator',
    5
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    'KT5VZpZMR5RVGscTjcY4w',
    'bell_owner',
    10
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    '7OMupCxKZRNaBatCjKRb_',
    'bell_owner',
    11
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'ZO9oteJL_Xoi-97C2rz41',
    'bell_owner',
    12
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'ZO9oteJL_Xoi-97C2rz41',
    'bell_initiator',
    13
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'OkJQM-s-wCrTjCGbA0GJi',
    'bell_owner',
    14
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'OkJQM-s-wCrTjCGbA0GJi',
    'bell_initiator',
    15
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'uKCjhrV-wGSxofiIRi5il',
    'bell_owner',
    106
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'uKCjhrV-wGSxofiIRi5il',
    'bell_initiator',
    107
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'hZYDVHXXk_uvWWWB9vgpU',
    'bell_owner',
    108
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'hZYDVHXXk_uvWWWB9vgpU',
    'bell_initiator',
    109
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'CdS4SDB_fvUxcIXDZL6NC',
    'bell_owner',
    110
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'CdS4SDB_fvUxcIXDZL6NC',
    'bell_initiator',
    111
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    '9kV6WSZqyE8QqJDsC4PjZ',
    'bell_owner',
    112
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    '9kV6WSZqyE8QqJDsC4PjZ',
    'bell_initiator',
    113
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    '543EWZglrNCjit2QjbBBN',
    'bell_owner',
    114
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    '543EWZglrNCjit2QjbBBN',
    'bell_initiator',
    115
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'k6rrYge8SLUEOCss4u3nA',
    'bell_owner',
    116
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'k6rrYge8SLUEOCss4u3nA',
    'bell_initiator',
    117
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'xw-eN78E-9k4-GlYXm5IL',
    'bell_owner',
    118
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'xw-eN78E-9k4-GlYXm5IL',
    'bell_initiator',
    119
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    'FWLMKIsDI2JubB-TdTFjU',
    'bell_owner',
    120
  );
INSERT INTO m2.bellhop_bell_participations (bellhop_id, bell_id, role, id)
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    'OkC2sgekFlFu--8G_hkZ_',
    'bell_owner',
    121
  );
INSERT INTO m2.membership_roles (id, attribute)
VALUES ('admin', NULL);
INSERT INTO m2.membership_roles (id, attribute)
VALUES ('approver', NULL);
INSERT INTO m2.membership_roles (id, attribute)
VALUES ('member', NULL);
INSERT INTO m2.membership_roles (id, attribute)
VALUES ('manager', NULL);
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'Google_111918078641246610063',
    'member',
    '2020-07-20 21:33:29.122427+00',
    1
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '1ibkm0rWaBenw4GvR2_HA',
    'Google_109551792009621810100',
    'approver',
    '2020-07-20 21:33:50.181203+00',
    2
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'Google_109551792009621810100',
    'approver',
    '2020-07-20 21:33:57.904538+00',
    3
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'Google_113132363560941198349',
    'member',
    '2020-07-24 03:20:28.987126+00',
    9
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'Google_111918078641246610063',
    'manager',
    '2020-07-24 22:15:41.394778+00',
    10
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'Google_111918078641246610063',
    'manager',
    '2020-07-30 07:23:07.551902+00',
    11
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    'Google_115419186368884878540',
    'admin',
    '2020-08-05 05:45:37.399866+00',
    12
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '5N7DVIvQIV0dBGx89q9r2',
    'Google_115419186368884878540',
    'admin',
    '2020-08-05 05:46:30.679836+00',
    13
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    '6U0uG2uaSVCOgFW_6RU0G',
    'Google_115419186368884878540',
    'member',
    '2020-07-22 05:38:08.557555+00',
    5
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    'kK70A5g3BM9mjbHQoYnjL',
    'Google_115419186368884878540',
    'member',
    '2020-08-14 06:38:33.95484+00',
    15
  );
INSERT INTO m2.bellhop_memberships (bellhop_id, user_id, role, joined_at, id)
VALUES (
    'PG4zNBGpm_MNfVU0tMNwt',
    'Google_108096699587682538913',
    'member',
    '2020-08-14 09:19:53.424823+00',
    16
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '11OPQ53T10ju7GYERgBOP',
    'Goal',
    'Facilities Spend Request',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'bVeXuHvMlUVpbM2e4zMy9',
    'Goal',
    'Get Purchase Information',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '0vNN_nHW0jc87jo-s8XPd',
    'Goal',
    'Get All Approvals',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '790hOnMXtRMBWhiZetAIK',
    'Goal',
    'Execute Purchase',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'QwnivOlovwLzVHcCN1wZF',
    'Goal',
    'Finance Team Spend Approval',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'sGnla9TNTZL8GzE0crXrC',
    'Goal',
    'Facilities Spend Request',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'IrI92WHVMdN1xCB9IxPQI',
    'Goal',
    'Execute Purchase',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'gYNgpxQV30mqqX_ZkeC_P',
    'Goal',
    'Get Purchase Information',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'ko2M_qb02qAeg-JZyW6hE',
    'Goal',
    'Get All Approvals',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'naHj1Ss8X7HgDu5iZUxZI',
    'Goal',
    'Finance Team Spend Approval',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '8-qMZR1PGMgp0OFUv2aYa',
    'Goal',
    'Facilities Spend Request',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '1hUGXy4Hj34U4Cu-bW1tD',
    'Goal',
    'Get Purchase Information',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'c_JjJApcPi2EO6uL-IwwF',
    'Goal',
    'Execute Purchase',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'i-5cleEPOAcprCeFpS71q',
    'Goal',
    'Get All Approvals',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'ur7ngwkbwjyMFwz5aSpDN',
    'Goal',
    'Finance Team Spend Approval',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '9btZCx4q6v9CCHo-J6Nog',
    'Goal',
    'Facilities Spend Request',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'NKDd5z-6oupnk0xYxehp5',
    'Goal',
    'Get Purchase Information',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'lJJWY_MFd1hQmsoIcWJho',
    'Goal',
    'Execute Purchase',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'XUJkpznZI-7QOhTrK2Vy3',
    'Goal',
    'Get All Approvals',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'pmYcxnnEEHJSbWT920VZW',
    'Goal',
    'Finance Team Spend Approval',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'KZ6QoD2b_gjM5OsazBuPB',
    'Goal',
    'Finance Team Spend Approval',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'H1BoW-HU_5IbNMwLJSAsB',
    'Goal',
    'Facilities Spend Request',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'T5ghs1jpEW20UNE-QQzxJ',
    'Goal',
    'Get Purchase Information',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '6KTeoTKj0mo39gBlAxVg4',
    'Goal',
    'Execute Purchase',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    'PS9EVT0evEVXeoXgfvP__',
    'Goal',
    'Get All Approvals',
    '{}'
  );
INSERT INTO m2.goals (id, type, goal_name, success_conditions)
VALUES (
    '3Iku-NzBVz9KAzbiVgctf',
    'Goal',
    'Finance Team Spend Approval',
    '{}'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'QWhbnWC7Esg2UwIVIbbfG',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'QwpfcdLPH_iQqzbz7nFg-',
    'Task',
    NULL,
    '[{"optional": true, "question": "Is it capitalizable?", "response": "No", "response_type": "SingleSelect", "select_options": ["Yes", "No"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'WWazDMHYOxCXCgTyND2js',
    'Task',
    NULL,
    '[{"optional": true, "question": "What is the depreciation period", "response": "10+ years", "response_type": "SingleSelect", "select_options": ["<5 years", "5-10 years", "10+ years"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'G-M8ECueR0697Gx8buehJ',
    'Task',
    NULL,
    '[{"optional": false, "question": "How much do you need to budget in dollars?", "response": 1234, "min_value": 0, "response_type": "Decimal"}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'HttfA2gqDC5Uek_WD-rpn',
    'Task',
    NULL,
    '[{"optional": false, "question": "What are you purchasing?", "response": "A new HVAC machine", "response_type": "Text", "max_field_size": 128, "min_field_size": 4}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '05rDLPiegRuF7-f72D-PK',
    'Task',
    NULL,
    '[{"optional": false, "question": "What categories describe this purchase?", "response": "Heating/Cooling", "response_type": "MultiSelect", "select_options": ["Heating/Cooling", "services", "other"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'OrGy7nY4t8iSPisJA8qSD',
    'Task',
    'title?',
    '[{"optional": false, "question": "Task View: The Participants version of the Task View should have the Goal displayed between the Bell information and Task information (see M2 Mockups 5.c).", "response": "fixed", "response_type": "SingleSelect", "select_options": ["Mark as fixed", "Not reproducible", "Correct behavior", "Postpone"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'PxmmZKPVGbmTDo1U-QAul',
    'Task',
    NULL,
    '[{"optional": false, "question": "Running Bell Page: In Activities, if a Task is selected, scroll to the correct Task.", "description": "Postponed to M2.1.", "response_type": "SingleSelect", "select_options": ["Mark as fixed", "Not reproducible", "Correct behavior", "Postpone"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'goG3kPIYpOYhmlqR67B6i',
    'Task',
    NULL,
    '[{"optional": false, "question": "Running Bell Page: For Bell Started At", "description": ["User Only (bell_initiator that is a User but not a bell_initiator that is a Bellhop)", "Started by: Tingdong Chen", "User + Bellhop (both a bell_initiator that is a User and a bell_initiator that is a Bellhop)", "Started by: Tingdong Chen (Finance)", "Bellhop Only  (not a bell_initiator that is a User but a bell_initiator that is a Bellhop)", "Started by: Finance"], "response_type": "SingleSelect", "select_options": ["Mark as fixed", "Not reproducible", "Correct behavior", "Postpone"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '2sJve7kAgSlvY60fIfkEk',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '4wrAAgcKX7JCat1CgG1kX',
    'Task',
    NULL,
    '[{"optional": true, "question": "Is it capitalizable?", "response": null, "response_type": "SingleSelect", "select_options": ["Yes", "No"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'hIFqCcVcgefRZxL2iZvdb',
    'Task',
    NULL,
    '[{"optional": false, "question": "How much do you need to budget in dollars?", "response": null, "min_value": 0, "response_type": "Decimal"}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'UnyxsXiacCnXdY5fEtNwj',
    'Task',
    NULL,
    '[{"optional": false, "question": "What categories describe this purchase?", "response": null, "response_type": "MultiSelect", "select_options": ["Heating/Cooling", "services", "other"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'KygK0xZuy-JncT9VwTmWf',
    'Task',
    NULL,
    '[{"optional": false, "question": "What are you purchasing?", "response": null, "response_type": "Text", "max_field_size": 128, "min_field_size": 4}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'BbRhIal9rnUSCqqzDA_bn',
    'Task',
    NULL,
    '[{"optional": true, "question": "What is the depreciation period", "response": null, "response_type": "SingleSelect", "select_options": ["<5 years", "5-10 years", "10+ years"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '9PHQ9CG7qx73qpoqFgbza',
    'Task',
    NULL,
    '[{"optional": true, "question": "Is it capitalizable?", "response": null, "response_type": "SingleSelect", "select_options": ["Yes", "No"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '7d1nU1-avYM9_g8ZK1MBo',
    'Task',
    NULL,
    '[{"optional": false, "question": "How much do you need to budget in dollars?", "response": null, "min_value": 0, "response_type": "Decimal"}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'BmdTLSuhY_1vctztXxuTk',
    'Task',
    NULL,
    '[{"optional": false, "question": "Search: highlight the sub-string characters that matched in the results", "response": "Postpone", "response_type": "SingleSelect", "select_options": ["Mark as fixed", "Not reproducible", "Correct behavior", "Postpone"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'bN_ggtdisDjUrtrvTe-0F',
    'Task',
    NULL,
    '[{"optional": false, "question": "Running Bell Page: Participant Followers need to be de-duplicated from the Assignees (both on drop down and in the circles)", "response": "Mark as fixed", "response_type": "SingleSelect", "select_options": ["Mark as fixed", "Not reproducible", "Correct behavior", "Postpone"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'eP2PeAtQ2kYk6qMGfhOk-',
    'Task',
    NULL,
    '[{"optional": true, "question": "What is the depreciation period", "response": null, "response_type": "SingleSelect", "select_options": ["<5 years", "5-10 years", "10+ years"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '5Zp5_AQZ5XyPqat5lXj2L',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'Z2tmNY1WzJiB-N8v8ipCH',
    'Task',
    NULL,
    '[{"optional": false, "question": "What are you purchasing?", "response": "test", "response_type": "Text", "max_field_size": 128, "min_field_size": 4}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'vRXPdbij3gwhjohUpF9HZ',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '6Y0ovqcUJiuyP1QhAGXeK',
    'Task',
    NULL,
    '[{"optional": false, "question": "What categories describe this purchase?", "response": null, "response_type": "MultiSelect", "select_options": ["Heating/Cooling", "services", "other"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'a8-3faq7joeAaLbEp2Dn9',
    'Task',
    NULL,
    '[{"optional": false, "question": "How much do you need to budget in dollars?", "response": "1231", "min_value": 0, "response_type": "Decimal"}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'Ls_12oQFy5tJh-_0zu46T',
    'Task',
    NULL,
    '[{"optional": true, "question": "Is it capitalizable?", "response": "Yes", "response_type": "SingleSelect", "select_options": ["Yes", "No"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'T6gKggSMxB5jFUMQUq_pe',
    'Task',
    NULL,
    '[{"optional": false, "question": "What are you purchasing?", "response": "test", "response_type": "Text", "max_field_size": 128, "min_field_size": 4}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'FClaHQb39vKG4bezVpQ8w',
    'Task',
    NULL,
    '[{"optional": false, "question": "What categories describe this purchase?", "response": ["Heating/Cooling", "services"], "response_type": "MultiSelect", "select_options": ["Heating/Cooling", "services", "other"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'yNqfj3sp2TZLkqOxe2LNj',
    'Task',
    NULL,
    '[{"optional": true, "question": "What is the depreciation period", "response": "5-10 years", "response_type": "SingleSelect", "select_options": ["<5 years", "5-10 years", "10+ years"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '-nhqNc7bKzM7bF5fD4Wxj',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    '5rT7UZYfFY-8Ip_EsN3Ks',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'KwBXpNHaP5-MygHrgFfRx',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'UcjAh7TxMfo7siW2t1faO',
    'Task',
    NULL,
    '[{"optional": false, "question": "What categories describe this purchase?", "response": ["Heating/Cooling", "services"], "response_type": "MultiSelect", "select_options": ["Heating/Cooling", "services", "other"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'Ptp8DRwlJ9U_q3DoJE0Ls',
    'Task',
    NULL,
    '[{"optional": true, "question": "Is it capitalizable?", "response": null, "response_type": "SingleSelect", "select_options": ["Yes", "No"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'CFshVQun7tDJGruDE3VCp',
    'Task',
    NULL,
    '[{"optional": false, "question": "How much do you need to budget in dollars?", "response": null, "min_value": 0, "response_type": "Decimal"}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'HcqH59ttZjzlbVg-0v2-Y',
    'Task',
    NULL,
    '[{"optional": false, "question": "What are you purchasing?", "response": null, "response_type": "Text", "max_field_size": 128, "min_field_size": 4}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'hOj13Wvlt71TA2Vs54wHV',
    'Task',
    NULL,
    '[{"optional": true, "question": "What is the depreciation period", "response": null, "response_type": "SingleSelect", "select_options": ["<5 years", "5-10 years", "10+ years"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'KUq4SN1qUrBezCs_9IzMb',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'taOJ6DjO-Y0GIv82XqAL7',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": null, "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.tasks (id, type, title, fields)
VALUES (
    'uJgxtf3nsWeW1GTv5Nkkv',
    'Task',
    NULL,
    '[{"optional": false, "question": "Do you approve this purchase?", "response": "Approve", "response_type": "SingleSelect", "select_options": ["Approve", "Reject", "Reject for Edit"]}]'
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    's4Uq5-3xUX5bljHUIJMLW',
    'bell_follower',
    4
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    's4Uq5-3xUX5bljHUIJMLW',
    'bell_initiator',
    3
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'Mz1t1IwyheFE5oVYwkJPW',
    'bell_follower',
    8
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'Mz1t1IwyheFE5oVYwkJPW',
    'bell_initiator',
    5
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_111918078641246610063',
    NULL,
    'Mz1t1IwyheFE5oVYwkJPW',
    'bell_initiator',
    9
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'KT5VZpZMR5RVGscTjcY4w',
    'bell_initiator',
    17
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'KT5VZpZMR5RVGscTjcY4w',
    'bell_follower',
    18
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    '7OMupCxKZRNaBatCjKRb_',
    'bell_initiator',
    19
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    '7OMupCxKZRNaBatCjKRb_',
    'bell_follower',
    20
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'OkJQM-s-wCrTjCGbA0GJi',
    'bell_follower',
    23
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'OkJQM-s-wCrTjCGbA0GJi',
    'bell_initiator',
    24
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_111918078641246610063',
    NULL,
    'OkJQM-s-wCrTjCGbA0GJi',
    'bell_initiator',
    25
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'ZO9oteJL_Xoi-97C2rz41',
    'bell_follower',
    50
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'OkJQM-s-wCrTjCGbA0GJi',
    'bell_follower',
    51
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'uKCjhrV-wGSxofiIRi5il',
    'bell_follower',
    171
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'uKCjhrV-wGSxofiIRi5il',
    'bell_initiator',
    173
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'hZYDVHXXk_uvWWWB9vgpU',
    'bell_follower',
    174
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'hZYDVHXXk_uvWWWB9vgpU',
    'bell_initiator',
    175
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_111918078641246610063',
    NULL,
    'hZYDVHXXk_uvWWWB9vgpU',
    'bell_initiator',
    176
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'hZYDVHXXk_uvWWWB9vgpU',
    'bell_follower',
    177
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'CdS4SDB_fvUxcIXDZL6NC',
    'bell_follower',
    178
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'CdS4SDB_fvUxcIXDZL6NC',
    'bell_follower',
    179
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'CdS4SDB_fvUxcIXDZL6NC',
    'bell_initiator',
    180
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    '9kV6WSZqyE8QqJDsC4PjZ',
    'bell_follower',
    181
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    '9kV6WSZqyE8QqJDsC4PjZ',
    'bell_initiator',
    182
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_111918078641246610063',
    NULL,
    '9kV6WSZqyE8QqJDsC4PjZ',
    'bell_initiator',
    183
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'ZO9oteJL_Xoi-97C2rz41',
    'bell_follower',
    22
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'ZO9oteJL_Xoi-97C2rz41',
    'bell_initiator',
    21
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'KT5VZpZMR5RVGscTjcY4w',
    'bell_initiator',
    52
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    '9kV6WSZqyE8QqJDsC4PjZ',
    'bell_follower',
    184
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_113132363560941198349',
    NULL,
    'uKCjhrV-wGSxofiIRi5il',
    'bell_follower',
    186
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'uKCjhrV-wGSxofiIRi5il',
    'bell_follower',
    188
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    '543EWZglrNCjit2QjbBBN',
    'bell_follower',
    190
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    '543EWZglrNCjit2QjbBBN',
    'bell_initiator',
    191
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_111918078641246610063',
    NULL,
    '543EWZglrNCjit2QjbBBN',
    'bell_initiator',
    192
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    '543EWZglrNCjit2QjbBBN',
    'bell_follower',
    193
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'k6rrYge8SLUEOCss4u3nA',
    'bell_follower',
    194
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'k6rrYge8SLUEOCss4u3nA',
    'bell_follower',
    195
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'k6rrYge8SLUEOCss4u3nA',
    'bell_initiator',
    196
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'xw-eN78E-9k4-GlYXm5IL',
    'bell_follower',
    197
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'xw-eN78E-9k4-GlYXm5IL',
    'bell_initiator',
    198
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_111918078641246610063',
    NULL,
    'xw-eN78E-9k4-GlYXm5IL',
    'bell_initiator',
    199
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_108096699587682538913',
    NULL,
    'xw-eN78E-9k4-GlYXm5IL',
    'bell_follower',
    200
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'OkC2sgekFlFu--8G_hkZ_',
    'bell_initiator',
    201
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_109551792009621810100',
    NULL,
    'FWLMKIsDI2JubB-TdTFjU',
    'bell_initiator',
    202
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'OkC2sgekFlFu--8G_hkZ_',
    'bell_follower',
    203
  );
INSERT INTO m2.user_bell_participations (
    user_id,
    represented_bellhop_id,
    bell_id,
    role,
    id
  )
VALUES (
    'Google_115419186368884878540',
    NULL,
    'FWLMKIsDI2JubB-TdTFjU',
    'bell_follower',
    204
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'HttfA2gqDC5Uek_WD-rpn',
    'task_assignee',
    1
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'QwpfcdLPH_iQqzbz7nFg-',
    'task_follower',
    2
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '790hOnMXtRMBWhiZetAIK',
    'task_follower',
    3
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '11OPQ53T10ju7GYERgBOP',
    'goal_assignee',
    4
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'bVeXuHvMlUVpbM2e4zMy9',
    'goal_assignee',
    5
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    '0vNN_nHW0jc87jo-s8XPd',
    'goal_follower',
    6
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '0vNN_nHW0jc87jo-s8XPd',
    'task_follower',
    7
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    '790hOnMXtRMBWhiZetAIK',
    'goal_follower',
    8
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'QwnivOlovwLzVHcCN1wZF',
    'goal_assignee',
    9
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'BmdTLSuhY_1vctztXxuTk',
    'task_assignee',
    19
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'BmdTLSuhY_1vctztXxuTk',
    'goal_follower',
    20
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'sGnla9TNTZL8GzE0crXrC',
    'goal_assignee',
    21
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'IrI92WHVMdN1xCB9IxPQI',
    'task_follower',
    22
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'IrI92WHVMdN1xCB9IxPQI',
    'goal_follower',
    23
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'gYNgpxQV30mqqX_ZkeC_P',
    'goal_assignee',
    24
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'Ls_12oQFy5tJh-_0zu46T',
    'task_follower',
    25
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'T6gKggSMxB5jFUMQUq_pe',
    'task_assignee',
    26
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'ko2M_qb02qAeg-JZyW6hE',
    'goal_follower',
    27
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'ko2M_qb02qAeg-JZyW6hE',
    'task_follower',
    28
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'naHj1Ss8X7HgDu5iZUxZI',
    'goal_assignee',
    29
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '0vNN_nHW0jc87jo-s8XPd',
    'task_assignee',
    96
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'FClaHQb39vKG4bezVpQ8w',
    'task_assignee',
    106
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'uJgxtf3nsWeW1GTv5Nkkv',
    'task_assignee',
    107
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'a8-3faq7joeAaLbEp2Dn9',
    'task_assignee',
    108
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'Ls_12oQFy5tJh-_0zu46T',
    'task_assignee',
    109
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'yNqfj3sp2TZLkqOxe2LNj',
    'task_assignee',
    110
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '2sJve7kAgSlvY60fIfkEk',
    'task_assignee',
    111
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_108096699587682538913',
    'gYNgpxQV30mqqX_ZkeC_P',
    'goal_follower',
    113
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '8-qMZR1PGMgp0OFUv2aYa',
    'goal_assignee',
    380
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '1hUGXy4Hj34U4Cu-bW1tD',
    'goal_assignee',
    381
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_108096699587682538913',
    '1hUGXy4Hj34U4Cu-bW1tD',
    'goal_follower',
    382
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '4wrAAgcKX7JCat1CgG1kX',
    'task_follower',
    383
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '4wrAAgcKX7JCat1CgG1kX',
    'task_assignee',
    384
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'hIFqCcVcgefRZxL2iZvdb',
    'task_assignee',
    385
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'UnyxsXiacCnXdY5fEtNwj',
    'task_assignee',
    386
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'KygK0xZuy-JncT9VwTmWf',
    'task_assignee',
    387
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'BbRhIal9rnUSCqqzDA_bn',
    'task_assignee',
    388
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'c_JjJApcPi2EO6uL-IwwF',
    'task_follower',
    389
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'c_JjJApcPi2EO6uL-IwwF',
    'goal_follower',
    390
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'i-5cleEPOAcprCeFpS71q',
    'goal_follower',
    391
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'i-5cleEPOAcprCeFpS71q',
    'task_follower',
    392
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '-nhqNc7bKzM7bF5fD4Wxj',
    'task_assignee',
    393
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'ur7ngwkbwjyMFwz5aSpDN',
    'goal_assignee',
    394
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '5rT7UZYfFY-8Ip_EsN3Ks',
    'task_assignee',
    395
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '9btZCx4q6v9CCHo-J6Nog',
    'goal_assignee',
    396
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'NKDd5z-6oupnk0xYxehp5',
    'goal_assignee',
    397
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_108096699587682538913',
    'NKDd5z-6oupnk0xYxehp5',
    'goal_follower',
    398
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '9PHQ9CG7qx73qpoqFgbza',
    'task_follower',
    399
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '9PHQ9CG7qx73qpoqFgbza',
    'task_assignee',
    400
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '7d1nU1-avYM9_g8ZK1MBo',
    'task_assignee',
    401
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'UcjAh7TxMfo7siW2t1faO',
    'task_assignee',
    402
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'Z2tmNY1WzJiB-N8v8ipCH',
    'task_assignee',
    403
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'eP2PeAtQ2kYk6qMGfhOk-',
    'task_assignee',
    404
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'lJJWY_MFd1hQmsoIcWJho',
    'task_follower',
    405
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'lJJWY_MFd1hQmsoIcWJho',
    'goal_follower',
    406
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'XUJkpznZI-7QOhTrK2Vy3',
    'goal_follower',
    407
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'XUJkpznZI-7QOhTrK2Vy3',
    'task_follower',
    408
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '5Zp5_AQZ5XyPqat5lXj2L',
    'task_assignee',
    409
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'pmYcxnnEEHJSbWT920VZW',
    'goal_assignee',
    410
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'KwBXpNHaP5-MygHrgFfRx',
    'task_assignee',
    411
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'KZ6QoD2b_gjM5OsazBuPB',
    'goal_assignee',
    412
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'vRXPdbij3gwhjohUpF9HZ',
    'task_assignee',
    413
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'H1BoW-HU_5IbNMwLJSAsB',
    'goal_assignee',
    414
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'T5ghs1jpEW20UNE-QQzxJ',
    'goal_assignee',
    415
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_108096699587682538913',
    'T5ghs1jpEW20UNE-QQzxJ',
    'goal_follower',
    416
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'Ptp8DRwlJ9U_q3DoJE0Ls',
    'task_follower',
    417
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'Ptp8DRwlJ9U_q3DoJE0Ls',
    'task_assignee',
    418
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'CFshVQun7tDJGruDE3VCp',
    'task_assignee',
    419
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '6Y0ovqcUJiuyP1QhAGXeK',
    'task_assignee',
    420
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'HcqH59ttZjzlbVg-0v2-Y',
    'task_assignee',
    421
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'hOj13Wvlt71TA2Vs54wHV',
    'task_assignee',
    422
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    '6KTeoTKj0mo39gBlAxVg4',
    'task_follower',
    423
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    '6KTeoTKj0mo39gBlAxVg4',
    'goal_follower',
    424
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_111918078641246610063',
    'PS9EVT0evEVXeoXgfvP__',
    'goal_follower',
    425
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'PS9EVT0evEVXeoXgfvP__',
    'task_follower',
    426
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_109551792009621810100',
    'KUq4SN1qUrBezCs_9IzMb',
    'task_assignee',
    427
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    '3Iku-NzBVz9KAzbiVgctf',
    'goal_assignee',
    428
  );
INSERT INTO m2.user_block_participations (user_id, block_id, role, id)
VALUES (
    'Google_115419186368884878540',
    'taOJ6DjO-Y0GIv82XqAL7',
    'task_assignee',
    429
  );
SELECT pg_catalog.setval(
    'm2.bellhop_bell_participations_id_seq',
    121,
    true
  );
SELECT pg_catalog.setval('m2.bellhop_memberships_id_seq', 16, true);
SELECT pg_catalog.setval('m2.user_bell_participations_id_seq', 204, true);
SELECT pg_catalog.setval('m2.user_block_participations_id_seq', 429, true);
ALTER TABLE ONLY m2.bellhop_bell_participations
ALTER COLUMN id
SET DEFAULT nextval(
    'm2.bellhop_bell_participations_id_seq'::regclass
  );
ALTER TABLE ONLY m2.bellhop_memberships
ALTER COLUMN id
SET DEFAULT nextval('m2.bellhop_memberships_id_seq'::regclass);
ALTER TABLE ONLY m2.user_bell_participations
ALTER COLUMN id
SET DEFAULT nextval('m2.user_bell_participations_id_seq'::regclass);
ALTER TABLE ONLY m2.user_block_participations
ALTER COLUMN id
SET DEFAULT nextval('m2.user_block_participations_id_seq'::regclass);
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
ALTER TABLE ONLY m2.bell_executors
ADD CONSTRAINT bell_executors_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.bell_executors
ADD CONSTRAINT bell_executors_pkey PRIMARY KEY (id);
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
ADD CONSTRAINT block_state_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.block_type
ADD CONSTRAINT block_type_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_bell_id_local_id_key UNIQUE (bell_id, local_id);
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.goals
ADD CONSTRAINT goals_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.goals
ADD CONSTRAINT goals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.participation_roles
ADD CONSTRAINT participation_role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.membership_roles
ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.tasks
ADD CONSTRAINT tasks_id_type_key UNIQUE (id, type);
ALTER TABLE ONLY m2.tasks
ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY m2.user_bell_participations
ADD CONSTRAINT user_bell_participations_pkey PRIMARY KEY (role, user_id, bell_id);
ALTER TABLE ONLY m2.user_block_participations
ADD CONSTRAINT user_block_participations_pkey PRIMARY KEY (user_id, block_id, role);
ALTER TABLE ONLY m2.users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE TRIGGER update_bells_ended_at BEFORE
UPDATE ON m2.bells FOR EACH ROW
  WHEN (
    (
      (old.state = 'Running'::text)
      AND (
        new.state = ANY (ARRAY ['Success'::text, 'Failure'::text])
      )
    )
  ) EXECUTE PROCEDURE public.update_ended_at();
CREATE TRIGGER update_bells_started_at BEFORE
UPDATE ON m2.bells FOR EACH ROW
  WHEN (
    (
      (
        old.state = ANY (ARRAY ['Created'::text, 'Drafted'::text])
      )
      AND (new.state = 'Running'::text)
    )
  ) EXECUTE PROCEDURE public.update_started_at();
CREATE TRIGGER update_blocks_ended_at BEFORE
UPDATE ON m2.blocks FOR EACH ROW
  WHEN (
    (
      (old.state = 'Running'::text)
      AND (
        new.state = ANY (ARRAY ['Success'::text, 'Failure'::text])
      )
    )
  ) EXECUTE PROCEDURE public.update_ended_at();
CREATE TRIGGER update_blocks_started_at BEFORE
UPDATE ON m2.blocks FOR EACH ROW
  WHEN (
    (
      (
        old.state = ANY (ARRAY ['Created'::text, 'Drafted'::text])
      )
      AND (new.state = 'Running'::text)
    )
  ) EXECUTE PROCEDURE public.update_started_at();
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
ADD CONSTRAINT user_room_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE
SET DEFAULT ON DELETE
SET DEFAULT;
ALTER TABLE ONLY chat.user_room_participations
ADD CONSTRAINT user_room_participations_room_id_fkey FOREIGN KEY (room_id) REFERENCES chat.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY chat.user_room_participations
ADD CONSTRAINT user_room_participations_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bell_executors
ADD CONSTRAINT bell_executors_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE
SET NULL ON DELETE
SET NULL;
ALTER TABLE ONLY m2.bell_executors
ADD CONSTRAINT bell_executors_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
ADD CONSTRAINT bellhop_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
ADD CONSTRAINT bellhop_bell_participation_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_bell_participations
ADD CONSTRAINT bellhop_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bellhop_memberships
ADD CONSTRAINT bellhop_membership_bellhop_id_fkey FOREIGN KEY (bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bellhop_memberships
ADD CONSTRAINT bellhop_membership_role_fkey FOREIGN KEY (role) REFERENCES m2.membership_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.bellhop_memberships
ADD CONSTRAINT bellhop_membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.bells
ADD CONSTRAINT bells_main_bell_id_fkey FOREIGN KEY (main_bell_id) REFERENCES m2.bells(id) ON UPDATE
SET NULL ON DELETE
SET NULL;
ALTER TABLE ONLY m2.bells
ADD CONSTRAINT bells_root_block_id_fkey FOREIGN KEY (root_block_id) REFERENCES m2.blocks(id) ON UPDATE
SET NULL ON DELETE
SET NULL;
ALTER TABLE ONLY m2.bells
ADD CONSTRAINT bells_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES m2.blocks(id) ON UPDATE
SET NULL ON DELETE
SET NULL;
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_state_fkey FOREIGN KEY (state) REFERENCES m2.block_state(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.blocks
ADD CONSTRAINT blocks_type_fkey FOREIGN KEY (type) REFERENCES m2.block_type(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.goals
ADD CONSTRAINT goals_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.tasks
ADD CONSTRAINT tasks_id_type_fkey FOREIGN KEY (id, type) REFERENCES m2.blocks(id, type) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
ADD CONSTRAINT user_bell_participation_bell_id_fkey FOREIGN KEY (bell_id) REFERENCES m2.bells(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_bell_participations
ADD CONSTRAINT user_bell_participation_represented_bellhop_id_fkey FOREIGN KEY (represented_bellhop_id) REFERENCES m2.bellhops(id) ON UPDATE
SET NULL ON DELETE
SET NULL;
ALTER TABLE ONLY m2.user_bell_participations
ADD CONSTRAINT user_bell_participation_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_bell_participations
ADD CONSTRAINT user_bell_participation_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_block_participations
ADD CONSTRAINT user_block_participations_block_id_fkey FOREIGN KEY (block_id) REFERENCES m2.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY m2.user_block_participations
ADD CONSTRAINT user_block_participations_role_fkey FOREIGN KEY (role) REFERENCES m2.participation_roles(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY m2.user_block_participations
ADD CONSTRAINT user_block_participations_user_id_fkey FOREIGN KEY (user_id) REFERENCES m2.users(id) ON UPDATE CASCADE ON DELETE CASCADE;