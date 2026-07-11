-- ============================================================
-- Maid Link — demo seed data (run after 001_init.sql)
-- ============================================================

insert into public.agencies (name, contact_name, whatsapp, emirate, commission_terms, is_house)
values
  ('Maid Link (own pool)', 'Maid Link Team', null, 'Dubai', null, true),
  ('Al Noor Recruitment', 'Fatima Hassan', '971501112222', 'Dubai', 'AED 1,500 per placement', false),
  ('Star Care Manpower', 'Joseph Okello', '971503334444', 'Sharjah', '10% of first salary x 12', false);

insert into public.maids
  (agency_id, full_name, nationality, date_of_birth, religion, marital_status, children_count,
   emirate, visa_status, live_arrangement, expected_salary_aed, experience_years,
   languages, skills, bio, status, available_from)
values
  ((select id from public.agencies where name = 'Al Noor Recruitment'),
   'Maria Santos', 'Filipina', '1992-04-15', 'Christian', 'Married', 2,
   'Dubai', 'inside_transferable', 'live_in', 2500, 6,
   '{English,Tagalog}', '{Housekeeping,"Baby care",Cooking,Ironing}',
   'Maria has worked with two families in Dubai over six years, most recently caring for newborn twins. She cooks Filipino and Arabic dishes and is excellent with young children.',
   'published', now()::date),

  ((select id from public.agencies where name = 'Al Noor Recruitment'),
   'Almaz Tesfaye', 'Ethiopian', '1996-09-02', 'Christian', 'Single', 0,
   'Dubai', 'inside_visit', 'live_in', 1800, 3,
   '{English,Amharic,Arabic}', '{Housekeeping,Cooking,"Elderly care"}',
   'Almaz spent three years with a family in Abu Dhabi caring for an elderly grandmother. Patient, tidy, and speaks conversational Arabic.',
   'published', now()::date),

  ((select id from public.agencies where name = 'Star Care Manpower'),
   'Siti Rahayu', 'Indonesian', '1990-01-20', 'Muslim', 'Married', 1,
   'Sharjah', 'inside_transferable', 'either', 2200, 8,
   '{English,Indonesian,Arabic}', '{Housekeeping,Cooking,"Newborn care","Baby care"}',
   'Siti is an experienced nanny and cook with eight years in the UAE. She has strong references and specializes in newborn care.',
   'published', now()::date),

  ((select id from public.agencies where name = 'Star Care Manpower'),
   'Grace Wanjiru', 'Kenyan', '1994-11-30', 'Christian', 'Single', 1,
   'Abu Dhabi', 'inside_cancelled', 'live_in', 2000, 4,
   '{English,Swahili}', '{Housekeeping,"Baby care","Pet care",Ironing}',
   'Grace worked four years for a British family in Abu Dhabi and is comfortable with dogs and cats. Energetic and great with school-age kids.',
   'published', now()::date),

  ((select id from public.agencies where name = 'Maid Link (own pool)'),
   'Kumari Perera', 'Sri Lankan', '1988-06-11', 'Buddhist', 'Married', 2,
   'Dubai', 'outside_country', 'live_in', 1700, 10,
   '{English,Sinhala}', '{Housekeeping,Cooking,"Elderly care",Ironing}',
   'Kumari has ten years of Gulf experience (Saudi Arabia and UAE) and is ready to travel within two weeks of an offer. Excellent cook.',
   'published', null),

  ((select id from public.agencies where name = 'Maid Link (own pool)'),
   'Sarah Nakato', 'Ugandan', '1998-03-08', 'Christian', 'Single', 0,
   'Dubai', 'inside_visit', 'live_out', 1900, 2,
   '{English,Swahili}', '{Housekeeping,"Baby care",Tutoring}',
   'Sarah is a warm, well-spoken helper who previously worked as a nursery assistant in Kampala. Great with homework help for young children.',
   'published', now()::date);
