--SELECT * FROM Moth WHERE Country = 'USA' AND Category = 1 ORDER BY Date1 

SELECT	[current].Id as [CurrentDay], 
		[next].Id as [PreviousDay],
		[current].Date1, [current].Actual, 
		--[next].Date1, [next].Actual,
		ABS(ISNULL([next].Actual, 0) - ISNULL([current].Actual,0)) as [New],
		--ABS(ISNULL(cast([next].Actual as numeric(13,2)), 0) - ISNULL(cast([current].Actual as numeric(13,2)),0)) 
		--	/ cast([next].Actual as numeric(13,2)) * 100 as [Perc],
		ABS(ISNULL(cast([next].Actual as money), 0) - ISNULL(cast([current].Actual as money),0)) 
			/ cast([next].Actual as money) * 100 as [Per]
		 --cast([next].Actual as numeric(18,2)) / cast([current].Actual as numeric(18,2))
FROM Moth AS [current]
LEFT JOIN
Moth AS [next] ON [next].Id = 
	(SELECT MAX(Id) FROM Moth WHERE Id < [current].Id)
WHERE [current].Country = 'USA' AND [next].Country = 'USA'
		AND [current].Category = 1 AND [next].Category = 1
	  ORDER BY [current].Date1 

--SELECT
--[current].Date1, [current].Actual,
--ISNULL([next].Actual, 0) - ISNULL([current].Actual,0) as Diff
--FROM Moth AS [current]
 
--LEFT JOIN

--Moth AS [next] ON [next].Id = 
--	(SELECT MIN(Id) FROM Moth WHERE Id > [current].Id)
--WHERE [current].Country = 'USA'
--		AND [current].Category = 1
--	  ORDER BY [current].Date1 


--select * 
--from Moth m1
--left join Moth m2 on m1.Id = m2.Id
-- WHERE m1.Country = 'USA'
--		AND m1.Category = 1
--	  ORDER BY m1.Date1 DESC