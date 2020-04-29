/*
select * from Feed
select Id, SourceName, Author, Title, Description, PublishedAt from Feed where Title like '%Trump%'
select Id, SourceName, Author, Title, Description from Feed where Description like '%Trump%'
select SourceName, count(*) from Feed group by SourceName order by count(*) desc
*/

DECLARE @StringValue VARCHAR(200) /*= 'This is a string of words i want to separate'; */
--SET @StringValue = (Select Title from Feed where Id in
--						(select TOP 1 Id from Feed where Title like '%Trump%'));

DECLARE @Id int
SET @Id = 159;
SET @StringValue = (Select Title from Feed where Id = @Id);

WITH SeparateWords ( Id, StringValue, Word, Position, RestOfLine)
AS
       (
	       SELECT  @Id, @StringValue
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

           SELECT  @Id, sw.StringValue
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

INSERT INTO [Trough](FeedId, StringValue, Word, Position, RestOfLine)
SELECT @Id, StringValue, Word, Position, RestOfLine FROM SeparateWords
GO

Select * from Trough
  