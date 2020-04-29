--table counts: April 10/2020
--db size: 12G, log size: 12G

select * from [Admin] --1
select * from Bucket --182
select * from Bug --407
select * from Farm --3
select * from Feed --100
select * from FeedBag --0
select * from Flood --20
select * from Garden --21
select * from Lane --3 
select * from Larvae --0
select * from Moth --0
select * from Nuggets --4
select * from [Root] --20
select * from Soup --168
select * from Staples --0
select * from Stream --5
select * from Tree --3
select * from Trough --0
 
select * from sysobjects --where xtype not in ('S') --120