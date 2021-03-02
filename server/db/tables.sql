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

CREATE TABLE public.users (
  "_id" serial NOT NULL,
  "username" varchar NOT NULL,
  "display_name" varchar,
  "photo_url" varchar,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.jobs (
  "_id" serial NOT NULL,
  "user_id" bigint NOT NULL,
  "position" varchar NOT NULL,
  "company" varchar NOT NULL,
  "listing" varchar,
  "status" varchar NOT NULL,
  "questions" varchar,
  "notes" varchar,
  CONSTRAINT "jobs_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.jobs ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
