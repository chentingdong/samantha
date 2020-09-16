DROP TABLE IF EXISTS "m2"."integration";

CREATE TABLE "m2"."api_integration"("id" text NOT NULL, "app_id" text NOT NULL, "app_secret" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("app_id") REFERENCES "m2"."bells"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("app_id"), UNIQUE ("app_secret"));

INSERT INTO "m2"."api_integration" (id, app_id, app_secret) VALUES ('FTzNAuJWthWGfQbWwV_k3', 'FTzNAuJWthWGfQbWwV_k3', 'f17tUIcN9otAqdvaxpz3i')
INSERT INTO "m2"."api_integration" (id, app_id, app_secret) VALUES ('vEEtd2z7ItOYmdSDrcbB_', 'vEEtd2z7ItOYmdSDrcbB_', 'Wx0q0leQlUeAbvWmwGcQE')
