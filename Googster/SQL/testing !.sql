SELECT Id, Description FROM Googster.dbo.Feed where isnull(Description,'') != '' order by Id
--SELECT Id, Description FROM Googster.dbo.Feed where Description is not null order by Id
SELECT Id, Description, Rating, Prediction FROM Googster.dbo.Feed order by Id
select avg(Rating) from Googster.dbo.Feed


