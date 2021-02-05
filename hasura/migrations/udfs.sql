CREATE OR REPLACE FUNCTION public.update_ended_at ()
  RETURNS TRIGGER
  AS $update_ended_at$
BEGIN
  UPDATE
    table_name
  SET
    ended_at = NOW();
  COMMIT;
END;
$update_ended_at$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_started_at ()
  RETURNS TRIGGER
  AS $update_started_at$
BEGIN
  UPDATE
    table_name
  SET
    rted_at = NOW();
  COMMIT;
END;
$update_started_at$
LANGUAGE plpgsql;

