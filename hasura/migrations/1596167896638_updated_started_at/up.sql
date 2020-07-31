CREATE OR REPLACE FUNCTION update_started_at() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.started_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blocks_started_at 
BEFORE UPDATE ON m2.blocks 
FOR EACH ROW 
WHEN (OLD.state in ('Created', 'Drafted') AND NEW.state in ('Running'))
EXECUTE PROCEDURE update_started_at();

CREATE TRIGGER update_bells_started_at 
BEFORE UPDATE ON m2.bells 
FOR EACH ROW 
WHEN (OLD.state in ('Created', 'Drafted') AND NEW.state in ('Running'))
EXECUTE PROCEDURE update_started_at();
