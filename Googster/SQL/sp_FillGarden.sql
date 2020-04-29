--Params: q
--CREATE PROC sp_FillGarden(q varchar(100))
--AS

SET NOCOUNT ON;

CREATE TABLE #Feeds (
    Id int IDENTITY(1,1) PRIMARY KEY,
	FeedId int not null,
	Title varchar(max),
	Descrip varchar(max)
);

--fill temp table with data to process
INSERT INTO #Feeds(FeedId, Title, Descrip)
	(select Id, left(RawContent, 7999), ''
		from Root)

--select Title, len(Title) from #Feeds
	
	--SELECT Id, Title, Description
	--	FROM Feed 
	--		WHERE Title like '%Trump%'); -- q

DECLARE @TABLE_COUNT int = (SELECT COUNT(*) FROM #Feeds);
DECLARE @COUNTER int = 1;
DECLARE @StringValue VARCHAR(MAX) = '';
DECLARE @FeedId int = 0;
DECLARE @Quote int = 0;
DECLARE @QuoteText VARCHAR(MAX) = '';

-- flip @StringValue = Title/Description
WHILE @COUNTER <= @TABLE_COUNT
BEGIN
	SELECT @FeedId = FeedId, @StringValue = Title
	FROM #Feeds WHERE Id = @COUNTER;

	--PRINT CAST(@COUNTER as varchar(3)) + ':' + CAST(@FeedId as varchar(3));
	/* * Cannot perform Quote ops in this loop - throwing err re: WITH * */

	/*Here is line 38 */
	BEGIN TRY
		WITH SeparateWords ( Id, StringValue, Word, Position, RestOfLine)
		AS
		   (
			   SELECT  @FeedId, @StringValue
						 , CASE CHARINDEX(' ',@StringValue)
								WHEN 0 THEN @StringValue
								ELSE LEFT(@StringValue,  CHARINDEX(' ',@StringValue) -1)
						   END
						 , 1
						 , CASE CHARINDEX(' ',@StringValue)
							   WHEN 0 THEN ''
							   ELSE RIGHT(@StringValue, LEN(@StringValue) - CHARINDEX(' ',@StringValue))
						   END
      		   UNION ALL

			   SELECT  @FeedId, sw.StringValue
						 , CASE CHARINDEX(' ',RestOfLine)
							   WHEN 0 THEN RestOfLine
							   ELSE LEFT(RestOfLine, CHARINDEX(' ',RestOfLine) -1)
						   END
						 , Position + 1
						 , CASE CHARINDEX(' ',RestOfLine)
							   WHEN 0 THEN ''
							   ELSE RIGHT(RestOfLine, LEN(RestOfLine) -
										  CHARINDEX(' ',RestOfLine))
						   END
			   FROM SeparateWords AS sw
			   WHERE sw.RestOfLine != ''
		   )

		INSERT INTO [Garden](FeedId, StringValue, Word, Position, RestOfLine)
			SELECT @FeedId, StringValue, Word, Position, RestOfLine 
				FROM SeparateWords

		SET @COUNTER = @COUNTER + 1;
	
END TRY  
BEGIN CATCH
	--DROP TABLE #Feeds
	SELECT   
        ERROR_NUMBER() AS ErrorNumber  
       ,ERROR_MESSAGE() AS ErrorMessage;  
END CATCH  
END




--now capture any quotes (single-quote (39) and double-quote (34) contained in StringValue 
SET @COUNTER = 1;
WHILE @COUNTER <= @TABLE_COUNT
BEGIN
	SELECT @FeedId = FeedId, @StringValue = Title
		FROM #Feeds WHERE Id = @COUNTER;

	PRINT 'Entered Quote loop - ' + cast(@FeedId as varchar(3))

	/* BUG: Need to handle text with apostrophes. If there are 2 words, it may not error - but you won't get a quote.
		Will complete process but throws: Invalid length parameter passed to the LEFT or SUBSTRING function.
	*/

	IF @Quote != (select CHARINDEX(CHAR(39), @StringValue))
	BEGIN
		SET @QuoteText =
			(SELECT SUBSTRING(@StringValue, CHARINDEX(CHAR(39), @StringValue), 
				CHARINDEX(CHAR(39), @StringValue, CHARINDEX(CHAR(39), @StringValue) + 1) -
					CHARINDEX(CHAR(39), @StringValue) + 1)) 

		INSERT INTO [Bucket](FeedId, StringValue, Quote)
			SELECT @FeedId, @StringValue, @QuoteText
		PRINT 'Exec. 39 - ' + cast(@FeedId as varchar(3))
	END

	IF @Quote != (select CHARINDEX(CHAR(34), @StringValue))
	BEGIN
		SET @QuoteText =
			(SELECT SUBSTRING(@StringValue, CHARINDEX(CHAR(34), @StringValue), 
				CHARINDEX(CHAR(34), @StringValue, CHARINDEX(CHAR(34), @StringValue) + 1) -
					CHARINDEX(CHAR(34), @StringValue) + 1)) 

		INSERT INTO [Bucket](FeedId, StringValue, Quote)
			SELECT @FeedId, @StringValue, @QuoteText
		PRINT 'Exec. 34 - ' + cast(@FeedId as varchar(3))
	END

	SET @COUNTER = @COUNTER + 1;
END

--testing only
DROP TABLE #Feeds;