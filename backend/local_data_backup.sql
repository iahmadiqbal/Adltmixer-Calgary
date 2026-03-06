--
-- PostgreSQL database dump
--

\restrict BfoO4hSK1LiXEYB3cE7BVjrtlND8BOIQLLJJ0Ei6PZ5uNnsfQEDJBl6SvW2VaG4

-- Dumped from database version 16.12 (Homebrew)
-- Dumped by pg_dump version 16.12 (Homebrew)

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

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public."User" DISABLE TRIGGER ALL;

COPY public."User" (id, email, password, role, "emailVerified", "firstName", "lastName", bio, "birthDate", gender, preference, "profileImageUrl", "isOnline", "lastSeenAt", "isBlocked", "deletedAt", "createdAt", "updatedAt") FROM stdin;
28dff6bd-3f84-463a-bc8f-db50b8e52774	hashamulhaq7@gmail.com	$2b$12$pvcveTlsVdUWgPydG6QJme8o7hV2HS.zrxRFBJQzkJE3Ht5P9I.6O	USER	f	Hash	Vick	Batman, Gym Enthusiast🏋🏻‍♀️	2008-01-01 00:00:00	MALE	EVERYONE	https://photodpshare.com/wp-content/uploads/2025/10/cool-profile-pictures-for-boys-nice-5k-full-576x1024.png	f	\N	f	\N	2026-03-04 12:37:16.012	2026-03-04 12:57:51.257
4f528b46-1bb5-4e5b-a998-17e566bc15c1	female2@test.com	$2b$12$TtPCVYCKR8GYdCPq9IHPCOlSkG9sdBk/at6Qh/reubypJCH1giZZO	USER	f	Lily	Johnson	Yoga lover & weekend traveler.	1997-01-01 00:00:00	FEMALE	EVERYONE	https://images.unsplash.com/photo-1494790108377-be9c29b29330	f	\N	f	\N	2026-02-25 19:40:54.167	2026-03-02 16:18:31.515
51bda519-ecd6-4e36-84d9-7b33a71eaf5b	female1@test.com	$2b$12$/djIAmgyU6zjIWDLW/OduOoHuaMKRvVM8xVNkLsz8yGfenUzmFTDS	USER	f	Anna	Smith	Coffee addict & book reader.	1998-01-01 00:00:00	FEMALE	MALE	https://images.unsplash.com/photo-1544005313-94ddf0286df2	f	\N	f	\N	2026-02-25 19:39:44.071	2026-03-02 16:18:31.56
cb2c86d3-7360-48b1-8d90-df6bc5809142	emma.davis@demo.com	$2b$12$dummyHashForDemoUser123456789012345678901234567890	USER	f	Emma	Davis	Digital artist & traveler.	1995-06-15 00:00:00	FEMALE	EVERYONE	https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e	f	\N	f	\N	2026-03-02 16:28:47.861	2026-03-02 16:28:47.861
b367a679-1502-4c96-846c-1e327208f397	ryan.cooper@demo.com	$2b$12$dummyHashForDemoUser123456789012345678901234567890	USER	f	Ryan	Cooper	Entrepreneur & coffee lover.	1992-03-22 00:00:00	MALE	EVERYONE	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d	f	\N	f	\N	2026-03-02 16:28:47.866	2026-03-02 16:28:47.866
b735f8b9-e35c-47c8-9a5f-8dadee46768e	ethan.walker@demo.com	$2b$12$dummyHashForDemoUser123456789012345678901234567890	USER	f	Ethan	Walker	Travel blogger & adventure seeker.	1993-08-12 00:00:00	MALE	EVERYONE	https://images.unsplash.com/photo-1504257432389-52343af06ae3	f	\N	f	\N	2026-03-02 16:35:22.227	2026-03-02 16:35:22.227
7c1109ad-ba34-454e-ad94-8d399b613051	lucas.bennett@demo.com	$2b$12$dummyHashForDemoUser123456789012345678901234567890	USER	f	Lucas	Bennett	Tech enthusiast & gym lover.	1994-11-03 00:00:00	MALE	EVERYONE	https://images.unsplash.com/photo-1499996860823-5214fcc65f8f	f	\N	f	\N	2026-03-02 16:35:22.234	2026-03-02 16:35:22.234
086a12b8-d654-4954-b7f1-f36f55512e60	ziaabdullah79@gmail.com	$2b$12$fm/JnrqvKa/vZRB8fOtc1uDv0J3Nemu0xdYw6PuWJpeJUlm9suHey	USER	f	Abdullah	Zozo	CEO at Mifa Hub🧑🏻‍💼⭐️	2008-01-01 00:00:00	MALE	EVERYONE	https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg	f	\N	f	\N	2026-03-03 19:04:37.484	2026-03-04 13:00:22.894
937399b7-c1e7-4a33-9980-9adc2f309b29	taniya@gmail.com	$2b$12$DyAGjUVtwEAW7aTNJTGjzOp2RpeT8lfjmjctmCRbQaCz3CH9xest2	USER	f	Taniya	John	Graphic designer 🧑‍💻	2007-01-01 00:00:00	FEMALE	EVERYONE	https://i.pinimg.com/564x/c3/5e/3a/c35e3ad983cd4f810e7263416a3ea3b7.jpg	f	\N	f	\N	2026-03-04 13:01:59.793	2026-03-04 13:03:00.633
c377a08f-8717-4a39-af9e-ac3ab04fcfad	abdullah@gmail.com	$2b$12$nYw3yEDNKfzn/Zxe7xSKj./8akcBrHHuP/AoHJZjIIGlxkaD3IQs2	USER	f	Abdullah	Zia	Business man ZTH	2003-01-01 00:00:00	MALE	EVERYONE	https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg	f	\N	f	\N	2026-03-03 15:16:02.869	2026-03-03 19:38:33.545
ef4f2d76-0b74-4f1d-9815-fef520a244de	manayyy2025@gmail.com	$2b$12$K/KqATECZzQ2O2nORwl/7eG1B5mjM7nrzC5G5UiRCPGgkJiMP1faa	USER	f	Manan	Shots	Photographer, Videographer📸	2002-01-01 00:00:00	MALE	EVERYONE	https://images.unsplash.com/photo-1654110455429-cf322b40a906?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D	f	\N	f	\N	2026-03-04 12:55:48.343	2026-03-04 12:56:50.121
3a9a3f60-c8c0-48a0-817e-5b1dc2e7afab	Jennifer@gmail.com	$2b$12$QtWY8120L8xUHfM8swTTPuEKGRnv6i1usrSSy5ir055k7/0YcI4.u	USER	f	Jennifer	Smith	Gaming I Sports I Gym 🎮🏸🏋🏻‍♀️ 	2005-01-01 00:00:00	FEMALE	EVERYONE	https://thepicturesdp.in/wp-content/uploads/2025/07/best-profile-pic-for-instagram-girl.jpg	f	\N	f	\N	2026-03-04 13:03:38.206	2026-03-04 13:06:17.948
33c23b2b-e52e-413f-b074-287bf31fe150	hashamulhaq068@gmail.com	$2b$12$NqNvTxIDWdIx3oqLCfA7G.YfjwsW.kDHjTFHo6ar1tIISzXEZUp4S	USER	f	Hasham	Ul Haq	Backend Developer, AI Engineer 🧑‍💻	2003-01-01 00:00:00	MALE	EVERYONE	https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_rp_progressive&w=740&q=80	f	\N	f	\N	2026-03-02 14:46:42.753	2026-03-04 14:43:25.232
fe602510-aa66-4fad-a4cc-413280d61283	haniaamir@gmail.com	$2b$12$9Mp7XiZbzT.qTzoWNlvudOPJN/sPHolkEmLvjMiPTxyny8S4IqBiW	USER	f	Hania	Amir	Pakistani Actress 🎭	1994-01-01 00:00:00	FEMALE	EVERYONE	https://i.pinimg.com/originals/58/ce/ba/58ceba0ccb067b80fadf910d8b889d89.jpg	f	\N	f	\N	2026-03-05 17:32:42.463	2026-03-05 17:34:17.178
83dd7700-4b40-498a-a021-d8a27d34a83d	testuser@gmail.com	$2b$12$/iXGykJqfQEXSpw0VHvqD.p.K6R.B//Z8TmzBYoFVu73iIDmj01JK	USER	f	Test	user	\N	2003-01-01 00:00:00	MALE	EVERYONE	\N	f	\N	f	\N	2026-03-06 17:37:37.016	2026-03-06 17:37:37.016
\.


ALTER TABLE public."User" ENABLE TRIGGER ALL;

--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Like" DISABLE TRIGGER ALL;

COPY public."Like" (id, "fromUserId", "toUserId", "createdAt") FROM stdin;
69d36737-a696-4069-a80f-d1a37fc10fe9	33c23b2b-e52e-413f-b074-287bf31fe150	4f528b46-1bb5-4e5b-a998-17e566bc15c1	2026-03-02 16:32:55.262
f6f0c08b-6f69-47f6-b1e2-f7f1f93ec709	33c23b2b-e52e-413f-b074-287bf31fe150	51bda519-ecd6-4e36-84d9-7b33a71eaf5b	2026-03-02 22:22:21.512
f5c6d578-79ef-4436-a7ac-6dfa07cb868c	33c23b2b-e52e-413f-b074-287bf31fe150	b367a679-1502-4c96-846c-1e327208f397	2026-03-02 22:23:45.097
f0225f80-9b7b-409f-a105-be60b56259c5	33c23b2b-e52e-413f-b074-287bf31fe150	7c1109ad-ba34-454e-ad94-8d399b613051	2026-03-02 22:23:51.528
be89db95-eadd-41a3-b91c-af722cc46ea2	c377a08f-8717-4a39-af9e-ac3ab04fcfad	33c23b2b-e52e-413f-b074-287bf31fe150	2026-03-03 15:18:30.723
058eb90e-1d7d-4c30-ae66-276d2af334eb	c377a08f-8717-4a39-af9e-ac3ab04fcfad	51bda519-ecd6-4e36-84d9-7b33a71eaf5b	2026-03-03 15:18:33.428
e67c7ae2-84e8-438a-bd65-e83c2ba07e8c	33c23b2b-e52e-413f-b074-287bf31fe150	c377a08f-8717-4a39-af9e-ac3ab04fcfad	2026-03-03 15:19:15.8
93da4f11-1e8d-4440-a6cd-4096d5dbadec	33c23b2b-e52e-413f-b074-287bf31fe150	cb2c86d3-7360-48b1-8d90-df6bc5809142	2026-03-03 15:24:01.694
199921fa-0193-47dd-bd8a-e532271c48c3	33c23b2b-e52e-413f-b074-287bf31fe150	b735f8b9-e35c-47c8-9a5f-8dadee46768e	2026-03-03 15:24:11.194
8824ebd2-6e03-4c87-9a2a-6bb3be606212	c377a08f-8717-4a39-af9e-ac3ab04fcfad	4f528b46-1bb5-4e5b-a998-17e566bc15c1	2026-03-03 15:28:51.724
9e306626-9a43-49fb-9f51-c82944e16b86	086a12b8-d654-4954-b7f1-f36f55512e60	cb2c86d3-7360-48b1-8d90-df6bc5809142	2026-03-03 19:04:56.049
e717c7c9-9b6d-4aca-951b-f19d30f26dfd	33c23b2b-e52e-413f-b074-287bf31fe150	3a9a3f60-c8c0-48a0-817e-5b1dc2e7afab	2026-03-06 01:25:49.915
e3ad9a68-4a46-4f3d-b7ee-54965fa1e349	33c23b2b-e52e-413f-b074-287bf31fe150	937399b7-c1e7-4a33-9980-9adc2f309b29	2026-03-06 17:36:18.923
\.


ALTER TABLE public."Like" ENABLE TRIGGER ALL;

--
-- Data for Name: Match; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Match" DISABLE TRIGGER ALL;

COPY public."Match" (id, "user1Id", "user2Id", "createdAt") FROM stdin;
433d1526-2315-412a-96ac-f77fa91e5d71	33c23b2b-e52e-413f-b074-287bf31fe150	4f528b46-1bb5-4e5b-a998-17e566bc15c1	2026-03-02 16:53:50.957
f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	c377a08f-8717-4a39-af9e-ac3ab04fcfad	2026-03-03 15:19:15.808
\.


ALTER TABLE public."Match" ENABLE TRIGGER ALL;

--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public."Message" DISABLE TRIGGER ALL;

COPY public."Message" (id, "matchId", "senderId", content, "createdAt") FROM stdin;
c2aef884-bd02-4902-8886-079fcfa74f28	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	heyy!	2026-03-03 21:24:08.325
82cc9806-a09c-4338-a41f-05b2090662ba	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	who?	2026-03-03 21:24:38.804
b8b5b7b3-1915-456e-a942-8694c08d61d1	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	hi	2026-03-03 21:31:28.869
333ae581-5533-465a-90f4-0fba7c52afbb	433d1526-2315-412a-96ac-f77fa91e5d71	33c23b2b-e52e-413f-b074-287bf31fe150	hey	2026-03-03 21:31:38.957
4b142b2e-4cf5-496b-8208-477076994b11	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	[Image: https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500]	2026-03-03 21:39:36.03
2cf5c377-2d9c-4d00-82cc-bde4d51232ab	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	kaise ho?	2026-03-03 22:11:35.333
5c4f82a7-f21c-4481-acfd-999bac7f19fc	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	me theek	2026-03-03 22:12:35.848
bcd396cc-a1aa-43d1-ba9e-533f39d2e2d7	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	ok	2026-03-03 22:15:22.621
ca6cdb27-72af-482d-a563-d66530a2f410	433d1526-2315-412a-96ac-f77fa91e5d71	33c23b2b-e52e-413f-b074-287bf31fe150	??	2026-03-03 22:15:35.527
065cc12e-ad0d-41da-97a2-29d368b8d265	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	or btao	2026-03-03 22:17:42.568
11a7c6f7-07e1-4603-9db1-19d3990395c9	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	kahan gaye?	2026-03-03 22:18:31.096
d212cda3-144f-459a-a3aa-73357aca27c9	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	ou	2026-03-03 22:20:38.795
59d93812-7066-4093-a6ed-c7f0bee0b064	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	khuch to jwab do	2026-03-03 22:23:39.111
704a5514-b8e8-4999-b959-f97ce5e03235	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	??	2026-03-03 22:23:43.19
1bea599c-6bdc-4c26-9546-c8bd9df537d5	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	gg	2026-03-03 22:24:02.371
4045118a-5c0f-42b9-bc9d-9c074483510b	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	yahin hu main	2026-03-03 22:24:07.829
a007c4ae-3024-4737-9b55-876e1ef5b191	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	[Image: https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500]	2026-03-03 22:24:24.159
ec66f517-aa2e-45ce-ae2f-5a468e297106	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	ok	2026-03-03 22:24:54.082
eac7c9e0-d357-4860-91f9-c9f73dfba982	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	i am naraz	2026-03-03 22:26:40.418
4e4c3b69-600a-4744-ae0b-18f721620cdb	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	lkn kyu?	2026-03-03 22:28:15.935
ab990b9e-583a-4cbc-a614-50db1b375c19	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	kya hua	2026-03-03 22:28:21.8
f958c34f-f8cf-4bae-9357-d0cd533a0510	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	btao to sahi..	2026-03-03 22:28:28.795
252b414d-6b6d-4834-9acb-652d229aa72f	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	oyy	2026-03-03 22:28:34.918
bba44662-d5f7-4e9d-8d7c-a041aebb7c28	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	yar bht slow server hai ye	2026-03-03 22:28:49.056
862b4a27-b883-4f5c-a066-bbdd39d709f4	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	esi liye	2026-03-03 22:30:05.538
d81d8e3a-5351-4297-b302-211aba1e0bdc	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	update nhi hura time say	2026-03-03 22:30:16.492
705f4d12-bc5e-4b0b-a829-bff96cc46b75	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	acha	2026-03-03 22:30:30.8
24f75dfa-5c95-4fe8-be67-7f5f420aaf2a	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	chlo khair	2026-03-03 22:30:33.18
41b964fc-6e75-4601-a9b7-59096e56c0e2	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	han bhai	2026-03-04 14:42:14.466
22f73d74-61b8-4ca3-a5af-a3415397c6b7	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	kese ho?	2026-03-04 14:42:18.076
5f62c980-5561-4976-a5b8-806cbd5ece35	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	suno	2026-03-04 16:12:40.21
4992201c-d246-4c6b-8cc9-48b95771cafe	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	?	2026-03-04 16:12:41.325
3e51eb9e-55fa-47d3-8684-01bf5ff79631	433d1526-2315-412a-96ac-f77fa91e5d71	33c23b2b-e52e-413f-b074-287bf31fe150	hi?	2026-03-04 16:29:32.628
d9b1751b-d70e-497c-9d05-8240ccd4c93b	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	kese ho?	2026-03-04 16:29:44.156
715d2a0f-05be-4a09-afda-fe20eb2417c6	f965ff20-7f53-43a6-a593-2ddf68e898bd	c377a08f-8717-4a39-af9e-ac3ab04fcfad	hi?	2026-03-05 17:31:42.664
b765be82-06af-474d-8221-3d7052e78966	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	g?	2026-03-06 01:24:02.509
7bc3fc12-ae08-414f-be27-3901c1fdf9ec	f965ff20-7f53-43a6-a593-2ddf68e898bd	33c23b2b-e52e-413f-b074-287bf31fe150	hello?	2026-03-06 17:35:11.042
\.


ALTER TABLE public."Message" ENABLE TRIGGER ALL;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public._prisma_migrations DISABLE TRIGGER ALL;

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
8f45fa5f-502d-435a-bd86-580ff036db61	f9681a0214131ed8aaede6607deea6fff61200975b4e62d749e9ed7a8135a779	2026-02-25 00:28:25.695294+05	20260224192825_init_user_model	\N	\N	2026-02-25 00:28:25.679394+05	1
30929eef-0530-45eb-ac94-5be7f0e4e947	2f929b58fc94038c966843bf983043c91628112111eb93f404beb3befb905094	2026-02-26 16:29:59.274606+05	20260226112959_add_like_and_match_models	\N	\N	2026-02-26 16:29:59.26064+05	1
8b388d61-4d44-4ad7-9781-54043c2b185c	f991773f2ca11e9a232a7a21f164d1a225d2df035bbc5eba621f427be92a228f	2026-02-28 23:42:56.421674+05	20260228184256_add_message_model	\N	\N	2026-02-28 23:42:56.415825+05	1
\.


ALTER TABLE public._prisma_migrations ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

\unrestrict BfoO4hSK1LiXEYB3cE7BVjrtlND8BOIQLLJJ0Ei6PZ5uNnsfQEDJBl6SvW2VaG4

