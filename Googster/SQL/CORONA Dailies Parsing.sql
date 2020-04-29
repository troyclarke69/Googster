
-- Data flows through - LARVAE - TROUGH - MOTH
-- Run scripts: 1. CORONA Dailies Parsing 2. CORONA Dailies Parsing WITH 3. CORONA Dailies Parsing TROUGH
-- NOTE: Run '**UPDATE Larvae table FIRST' in 1. CORONA Dailies Parsing script

-- TESTING QUERIES :: (Note: run the '**Update.. scripts below before proceeding with other scripts

--DELETE FROM TROUGH
--select * from TROUGH
--DELETE FROM LARVAE
select * from Larvae
--DELETE FROM MOTH
--select * from MOTH

--**UPDATE Larvae table FIRST
--SET Result = Replace(Result, ' ', '')
UPDATE Larvae
SET Result = Replace(Result, '"', '')
UPDATE Larvae
SET Result = Replace(Result, '[', '')
UPDATE Larvae
SET Result = Replace(Result, ']', '')
UPDATE Larvae
SET Result = Replace(Result, '{', '')
UPDATE Larvae
SET Result = Replace(Result, '}', '')
UPDATE Larvae
SET Result = Replace(Result, 'timeline:', '')
