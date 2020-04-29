/*
select * from Feed
select Id, SourceName, Author, Title, Description, PublishedAt from Feed where Title like '%Trump%'
select Id, SourceName, Author, Title, Description from Feed where Description like '%Trump%'
select SourceName, count(*) from Feed group by SourceName order by count(*) desc
*/

--after GetNews API, run sp_FillTrough sproc
--exec sp_fillTrough

-- new test * clear Trough and Feed
/*
	delete from Feed
	delete from Trough
	--may want to clear admin as well?? delete from Admin
*/

select * from Trough
select * from Feed

select * from Feed where Title + Description like '%Trump%'

select word, count(*) 
from Trough 
where Word != 'Trump' and Word not in
	(select word from Soup)
group by Word 
having count(*) > 1
order by count(*) desc

-- Quotes
select Quote, count(*)
from Bucket
group by Quote 
order by count(*) desc

-- with QUOTES
select *
from Trough
where word like '%''%' or word like '%"%'
	and Word not in
	(select word from Soup)

-- all, excluding Soup
select FeedId, Word [Keyword], StringValue [Headline]
from Trough 
where Word != 'Trump' and Word not in
	(select word from Soup)
order by FeedId


select distinct(FeedId) from Trough