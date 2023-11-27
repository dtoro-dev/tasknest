DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tasknestdb') THEN
        EXECUTE 'CREATE DATABASE tasknestdb';
    END IF;
END
$$;