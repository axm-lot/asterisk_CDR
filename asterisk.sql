--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'LATIN1';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cdr; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cdr (
    calldate timestamp without time zone NOT NULL,
    clid character varying(80) NOT NULL,
    src character varying(80) NOT NULL,
    dst character varying(80) NOT NULL,
    dcontext character varying(80) NOT NULL,
    channel character varying(80) NOT NULL,
    dstchannel character varying(80) NOT NULL,
    lastapp character varying(80) NOT NULL,
    lastdata character varying(80) NOT NULL,
    duration integer NOT NULL,
    billsec integer NOT NULL,
    disposition character varying(45) NOT NULL,
    amaflags integer NOT NULL,
    accountcode character varying(20) NOT NULL,
    uniqueid character varying(150) NOT NULL,
    userfield character varying(255) NOT NULL
);


ALTER TABLE public.cdr OWNER TO postgres;

--
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.login OWNER TO postgres;

--
-- Data for Name: cdr; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cdr (calldate, clid, src, dst, dcontext, channel, dstchannel, lastapp, lastdata, duration, billsec, disposition, amaflags, accountcode, uniqueid, userfield) FROM stdin;
2023-08-06 12:00:00	Test Call	123	456	default	SIP/123	SIP/456	Playback	hello-world	30	25	ANSWERED	3	1234	1234567890	Custom Data
2023-08-07 06:00:00	Test Call	123	456	default	SIP/123	SIP/456	Playback	hello-world	60	57	ANSWERED	3	1234	1234567890	Custom Data
\.


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.login (username, password) FROM stdin;
admin	admin
\.


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

