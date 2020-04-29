--Params: q
--CREATE PROC sp_FillTrough(q varchar(100))
--AS

--SELECT * // DELETE FROM Trough

-- Data flows through - LARVAE - TROUGH - MOTH
-- Run scripts: 1. CORONA Dailies Parsing 2. CORONA Dailies Parsing WITH 3. CORONA Dailies Parsing TROUGH
-- NOTE: Run '**UPDATE Larvae table FIRST' in 1. CORONA Dailies Parsing script

SET NOCOUNT ON;

CREATE TABLE #Temp (
    Id int IDENTITY(1,1) PRIMARY KEY,
	TempId int not null,
	Result varchar(max)
);

--fill temp table with data to process
INSERT INTO #Temp(TempId, Result)
	(SELECT Id, 
		Result + ',END'
		--LEFT(Result,261914) --* end string with ","
		--SUBSTRING(Result,62800, 19)
		FROM Larvae);

DECLARE @TABLE_COUNT int = (SELECT COUNT(*) FROM #Temp);
DECLARE @COUNTER int = 1;
DECLARE @StringValue VARCHAR(MAX) = '';
DECLARE @TempId int = 0;
DECLARE @Quote int = 0;
DECLARE @QuoteText VARCHAR(MAX) = '';

-- flip @StringValue = Title/Description
WHILE @COUNTER <= @TABLE_COUNT
BEGIN
	SELECT @TempId = TempId, @StringValue = Result
		FROM #Temp WHERE Id = @COUNTER

	PRINT STR(@TempId);
	PRINT @StringValue;

	WITH SeparateWords ( Id, StringValue, Word, Position, RestOfLine)
	AS
       (
	       SELECT  @TempId, @StringValue
                     , CASE CHARINDEX(':',@StringValue)
                            WHEN 0 THEN @StringValue
                            ELSE LEFT(@StringValue,  CHARINDEX(',',@StringValue) -1)
                       END
                     , 1
                     , CASE CHARINDEX(':',@StringValue)
                           WHEN 0 THEN ''
                           ELSE RIGHT(@StringValue, LEN(@StringValue) - CHARINDEX(',',@StringValue))
                       END
      	   UNION ALL

           SELECT  @TempId, sw.StringValue
                     , CASE CHARINDEX(':',RestOfLine)
                           WHEN 0 THEN RestOfLine
                           ELSE LEFT(RestOfLine, CHARINDEX(',',RestOfLine) -1)
                       END
                     , Position + 1
                     , CASE CHARINDEX(':',RestOfLine)
                           WHEN 0 THEN ''
                           ELSE RIGHT(RestOfLine, LEN(RestOfLine) -
									  CHARINDEX(',',RestOfLine))
                       END
           FROM SeparateWords AS sw		   		
           WHERE sw.RestOfLine != ''		   		
       )

	--INSERT INTO [Trough](FeedId, StringValue, Word, Position, RestOfLine)
	INSERT INTO [Trough](FeedId, Word, Position)
		SELECT @TempId, Word, Position 
			FROM SeparateWords
			option (maxrecursion 0)

	SET @COUNTER = @COUNTER + 1;
END

--testing only
DROP TABLE #Temp;
