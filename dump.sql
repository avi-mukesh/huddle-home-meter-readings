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


CREATE TYPE public."UtilityType" AS ENUM (
    'ELECTRICITY',
    'GAS'
);
ALTER TYPE public."UtilityType" OWNER TO postgres;

SET default_tablespace = '';
SET default_table_access_method = heap;


CREATE TABLE public."City" (
    id integer NOT NULL,
	"name" character varying
);
ALTER TABLE public."City" OWNER TO postgres;



CREATE TABLE public."Address" (
    id integer NOT NULL,
	"cityId" integer,
	"streetAddress" character varying
);
ALTER TABLE public."Address" OWNER TO postgres;



CREATE TABLE public."House" (
    id integer NOT NULL,
	"addressId" integer
);
ALTER TABLE public."House" OWNER TO postgres;
ALTER TABLE ONLY public."House"
	ADD CONSTRAINT "House_addressId_key" UNIQUE ("addressId");


CREATE TABLE public."Reading" (
    id integer NOT NULL,
	"date" timestamp with time zone,
	"houseId" integer,
	"readingValue" integer,
	"type" public."UtilityType"
);
ALTER TABLE public."Reading" OWNER TO postgres;



COPY public."City" (id, "name") FROM stdin;
1	London
2	Oxford
3	Gillingham
\.


COPY public."Address" (id, "cityId", "streetAddress") FROM stdin;
1	1	'1 Test Road'
2	1	'2 Test Road'
3	1	'3 Test Road'
4	2	'4 Test Road'
5	2	'5 Test Road'
6	3	'6 Test Road'
7	3	'7 Test Road'
8	3	'8 Test Road'
9	3	'9 Test Road'
10	3	'10 Test Road'
\.


COPY public."House" (id, "addressId") FROM stdin;
1	1
2	2
3	3
4	4
5	5
6	6
7	7
8	8
9	9
10	10
\.


COPY public."Reading" (id, "date", "houseId", "readingValue", "type") FROM stdin;
1	2024-01-01	1	1000	ELECTRICITY
2	2024-02-01	1	500	ELECTRICITY
3	2024-03-01	1	500	ELECTRICITY
4	2024-04-01	1	500	GAS
5	2024-05-01	1	500	GAS
6	2023-10-02	2	500	GAS
7	2023-11-02	2	500	GAS
8	2023-12-02	2	500	GAS
9	2024-01-02	2	500	GAS
10	2024-02-02	2	500	GAS
11	2024-03-02	2	500	GAS
12	2023-12-03	3	500	GAS
13	2024-01-03	3	500	GAS
14	2024-02-03	3	500	GAS
15	2024-03-03	3	500	GAS
16	2024-04-03	3	500	GAS
\.


ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "House_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Reading"
    ADD CONSTRAINT "Reading_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_houseContractId_utilityType_key" UNIQUE ("houseContractId", "utilityType");


ALTER TABLE ONLY public."House"
    ADD CONSTRAINT "House_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public."Address"(id);

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."City"(id);

ALTER TABLE ONLY public."Reading"
    ADD CONSTRAINT "Reading_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES public."House"(id);

--
-- PostgreSQL database dump complete
--
