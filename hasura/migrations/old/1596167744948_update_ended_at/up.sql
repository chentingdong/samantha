CREATE OR REPLACE FUNCTION update_ended_at() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.ended_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blocks_ended_at 
BEFORE UPDATE ON m2.blocks 
FOR EACH ROW 
WHEN (OLD.state in ('Running') AND NEW.state in ('Success', 'Failure'))
EXECUTE PROCEDURE update_ended_at();

CREATE TRIGGER update_bells_ended_at 
BEFORE UPDATE ON m2.bells 
FOR EACH ROW 
WHEN (OLD.state in ('Running') AND NEW.state in ('Success', 'Failure'))
EXECUTE PROCEDURE update_ended_at();
