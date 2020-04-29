--Params: q
--CREATE PROC sp_FillTrough(q varchar(100))
--AS

--SELECT id, Word, Position FROM Trough order by Position

-- Data flows through - LARVAE - TROUGH - MOTH
-- Run scripts: 1. CORONA Dailies Parsing 2. CORONA Dailies Parsing WITH 3. CORONA Dailies Parsing TROUGH
-- NOTE: Run '**UPDATE Larvae table FIRST' in 1. CORONA Dailies Parsing script

SET NOCOUNT ON;

CREATE TABLE #Temp (
    Id int IDENTITY(1,1) PRIMARY KEY,
	Position int not null,
	Word varchar(max)
);

--fill temp table with data to process
INSERT INTO #Temp(Position, Word) 
	SELECT Position, RTRIM(Word) 
		FROM [Trough] ORDER BY Position;

DECLARE @TABLE_COUNT int = (SELECT COUNT(*) FROM #Temp);
DECLARE @COUNTER int = 1;
DECLARE @StringValue VARCHAR(MAX) = '';
DECLARE @Position int = 0;
DECLARE @Country VARCHAR(50) = '';
DECLARE @Province VARCHAR(50) = '';
DECLARE @Category INT = 0;  /* 1 = Case, 2 = Death, 3 = Recovered */
DECLARE @Date1 VARCHAR(10);
DECLARE @Actual INT = 0;
DECLARE @Flag INT = 0;	--DoInsert = 1, DontInsert = 0

WHILE @COUNTER <= @TABLE_COUNT
BEGIN
	SELECT @StringValue = Word
		FROM #Temp WHERE Id = @COUNTER;

	--PRINT STR(@TempId);
	PRINT @StringValue;

	IF(LEFT(@StringValue, 7) = 'country')
	BEGIN
		SET @Flag = 0; -- at beginning of country record == DON'T INSERT YET
		SET @Country = SUBSTRING(@StringValue, 9, LEN(@StringValue) - 8);
		PRINT '>>' + @Country;
	END

	IF(LEFT(@StringValue, 8) = 'province')
	BEGIN
		SET @Flag = 0; -- at beginning of country record == DON'T INSERT YET
		SET @Province = SUBSTRING(@StringValue, 10, LEN(@StringValue) - 9);
		PRINT '>>' + @Province;
	END

	IF(LEFT(@StringValue, 5) = 'cases')
	BEGIN
		SET @Flag = 0; -- at beginning of obtaining DATES == DON'T INSERT YET
		SET @Category = 1;	
		-- TO DO: get the first date and actual # reported ... OR COULD SKIP??	
		PRINT '>> cases';
	END

	IF(LEFT(@StringValue, 5) = 'death')
	BEGIN
		SET @Flag = 0; 
		SET @Category = 2;	
		-- TO DO: get the first date and actual # reported ... OR COULD SKIP??	
		PRINT '>> deaths';
	END

	IF(LEFT(@StringValue, 5) = 'recov')
	BEGIN
		SET @Flag = 0;
		SET @Category = 3;	
		-- TO DO: get the first date and actual # reported ... OR COULD SKIP??	
		PRINT '>> recov';
	END

	IF(CHARINDEX('/', @StringValue) > 0 
		AND LEFT(@StringValue,5) != 'cases'
			AND LEFT(@StringValue,5) != 'death'
				AND LEFT(@StringValue,5) != 'recov') 
	BEGIN
		SET @Flag = 1; -- == DO INSERT
		SET @Date1 = SUBSTRING(@StringValue, 0, CHARINDEX(':', @StringValue));
		SET @Actual = SUBSTRING(@StringValue, CHARINDEX(':', @StringValue) + 1, LEN(@StringValue) - CHARINDEX(':', @StringValue) );
		
		--PRINT '>> Cases ';
		PRINT '>>' + CAST(@Date1 as VARCHAR(20))
		PRINT CAST(@Actual as VARCHAR(10))
	END

	--ONLY insert when we have a date set
	IF(@Flag = 1)
	BEGIN
		INSERT INTO [Moth]([Country],[Province],[Category],[Date1],[Actual])
			SELECT @Country, @Province, @Category, @Date1, @Actual
				option (maxrecursion 0)
	END

	SET @COUNTER = @COUNTER + 1;
END

--testing only
DROP TABLE #Temp;
