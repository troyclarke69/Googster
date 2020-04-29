/****** Script for SelectTopNRows command from SSMS  ******/
SELECT *
  FROM [Googster].[dbo].[Farm] f
	LEFT JOIN [Googster].[dbo].[Lane] l
		ON l.FarmId = f.Id
	LEFT JOIN [Googster].[dbo].[Tree] t
		ON t.LaneId = l.Id

/*
--delete from FARM;
delete from LANE;
delete from Tree;
*/

/* FARM */
INSERT INTO Farm (Name, Description) VALUES
	('Cherry Lane', 'This is Cherry Lane'),
	('Lerry Chane', 'This is Lerry Chane')

/* LANE */
INSERT INTO Lane (Name, Description, FarmId) VALUES
	('Cherry Tree', 'This is Cherry Tree - it is in the LANE table', 1),
	('Lerry Tree', 'This is Lerry Tree - it is in the LANE table', 2)

/* TREE */
INSERT INTO Tree (Name, Description, LaneId) VALUES
	('Cherry Tree Branch', 'This is Cherry Tree BRANCH - it is in the TREE table', 3),
	('Lerry Tree Branch', 'This is Lerry Tree BRANCH - it is in the TREE table', 4)



