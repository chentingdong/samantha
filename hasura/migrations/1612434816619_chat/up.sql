INSERT INTO
  chat.room_sources (id, description)
VALUES
  ('bell', NULL);

INSERT INTO
  chat.room_sources (id, description)
VALUES
  ('block', NULL);

INSERT INTO
  chat.room_sources (id, description)
VALUES
  ('goal', NULL);

INSERT INTO
  chat.room_sources (id, description)
VALUES
  ('bellhop', NULL);

INSERT INTO
  chat.room_sources (id, description)
VALUES
  ('direct_message', NULL);

INSERT INTO
  chat.room_sources (id, description)
VALUES
  ('task', NULL);

INSERT INTO
  chat.rooms (
    created_at,
    name,
    last_post_at,
    ended_at,
    last_visited_at,
    source,
    id
  )
VALUES
  (
    '2020-08-26 18:09:55.633195',
    NULL,
    NULL,
    '2020-08-26 18:09:55.633195+00',
    NULL,
    'bell',
    'uKCjhrV-wGSxofiIRi5il'
  );

INSERT INTO
  chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES
  (
    'Google_108096699587682538913',
    '2020-08-26 19:16:54.178+00',
    '2020-08-26 19:16:54.425511+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-26 19:16:54.178+00',
    'bell_follower'
  );

INSERT INTO
  chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES
  (
    'Google_115419186368884878540',
    '2020-08-26 19:16:54.178+00',
    '2020-08-26 19:16:54.425511+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-26 19:16:54.178+00',
    'bell_initiator'
  );

INSERT INTO
  chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES
  (
    'Google_113132363560941198349',
    '2020-08-26 19:16:54.178+00',
    '2020-08-26 19:16:54.425511+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-26 19:16:54.178+00',
    'bell_follower'
  );

INSERT INTO
  chat.user_room_participations (
    user_id,
    last_seen_at,
    last_typed_at,
    room_id,
    joined_at,
    role
  )
VALUES
  (
    'Google_109551792009621810100',
    '2020-08-26 19:16:54.178+00',
    '2020-08-26 19:16:54.425511+00',
    'uKCjhrV-wGSxofiIRi5il',
    '2020-08-26 19:16:54.178+00',
    'bell_follower'
  );