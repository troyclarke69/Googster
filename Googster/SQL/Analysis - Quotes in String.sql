/*
select * from Feed
select Id, SourceName, Author, Title, Description, PublishedAt from Feed where Title like '%"%'
select Id, SourceName, Author, Title, Description from Feed where Description like '%Trump%'
select SourceName, count(*) from Feed group by SourceName order by count(*) desc
select Title from Feed where Id = 136
*/
--select Title from Feed where Id = 136
/*update Feed
set Title = 'Trump says "Puppies are nasty!"'
where Id = 136 */

--CHAR(34) is double quote
--CHAR(39) is single quote
DECLARE @StringValue VARCHAR(200)
DECLARE @Id int
DECLARE @A int -- first/begin quote
DECLARE @B int -- second/end quote
SET @Id = 130  --130;
SET @StringValue = (Select Title from Feed where Id = @Id);
--print @StringValue;
--SELECT PATINDEX('%"%', @StringValue);
DECLARE @Quote varchar(10) = '';
IF @Quote != (select CHARINDEX(CHAR(39), @StringValue))
	select @StringValue, CHARINDEX(CHAR(39), @StringValue);
--select SUBSTRING(@StringValue, CHARINDEX(CHAR(39), @StringValue), 10)
SET @A = CHARINDEX(CHAR(39), @StringValue) + 1  -- add one to eliminate the quote
select @A as A
SET @B = CHARINDEX(CHAR(39), @StringValue, CHARINDEX(CHAR(39), @StringValue) + 1)
select @B as B
select SUBSTRING(@StringValue, @A, @B - @A) as [A-B]
select @Id, @StringValue, 
	SUBSTRING(@StringValue, CHARINDEX(CHAR(39), @StringValue) + 1, 
		CHARINDEX(CHAR(39), @StringValue, 
			CHARINDEX(CHAR(39), @StringValue) + 1) - 
				CHARINDEX(CHAR(39), @StringValue) + 1)
--select @Id, @StringValue, 
--	SUBSTRING(@StringValue, CHARINDEX(CHAR(34), @StringValue), 
--		CHARINDEX(CHAR(34), @StringValue, 
--			CHARINDEX(CHAR(34), @StringValue) + 1) -
--				CHARINDEX(CHAR(34), @StringValue) + 1)



/*WITH Quotes ( Id, StringValue, Quote)
AS
       (
	       SELECT  @Id, @StringValue
                     , SUBSTRING(@StringValue, CHARINDEX(CHAR(34), @StringValue), 
						CHARINDEX(CHAR(34), @StringValue, CHARINDEX(CHAR(34), @StringValue) + 1) -
							CHARINDEX(CHAR(34), @StringValue) + 1)
       )

--INSERT INTO [Trough](FeedId, StringValue, Word, Position, RestOfLine)
SELECT @Id, StringValue, Quote FROM Quotes
GO*/

--Select * from Trough
  