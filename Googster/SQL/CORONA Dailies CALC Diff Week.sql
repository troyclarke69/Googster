DECLARE @COUNTRY VARCHAR(40) = 'Russia';
DECLARE @PROVINCE VARCHAR(40) = 'null';
DECLARE @CATEGORY INT = 1;  --1 = Cases, 2 = Deaths, 3 = Recovered
DECLAre @DAYS INT = 0 -- base:0 = day to day, 6 = week, 13 = 2 weeks, 27 (MAX) = 4 weeks

SELECT	--[current].Id as [CurrentDayId], 
		--[prev].Id as [PreviousDayId],
		[prev].Date1 as [Date1], [prev].Actual as [Date1_Number],
		[current].Date1 as [Date2], [current].Actual as [Date2_Number], 
		ABS(ISNULL([prev].Actual, 0) - ISNULL([current].Actual,0)) as [Date2_Change],
		ABS(ISNULL(cast([prev].Actual as money), 0) - ISNULL(cast([current].Actual as money),0)) 
			/ cast([prev].Actual as money) * 100 as [%Increase],
		ABS(ISNULL(cast([prev].Actual as money), 0) - ISNULL(cast([current].Actual as money),0)) 
			/ cast([current].Actual as money) * 100 as [%ofDate2Number]
		--ABS(ISNULL(cast([prev].Actual as money), 0) - ISNULL(cast([current].Actual as money),0)) 
		--	/ cast(MAX[current].Actual as money) * 100 as [%ofCurrentTotal]
FROM Moth AS [current]
LEFT JOIN
Moth AS [prev] ON [prev].Id = 
	(SELECT MAX(Id) - @DAYS FROM Moth WHERE Id < [current].Id)
WHERE [current].Country = @COUNTRY AND [prev].Country = @COUNTRY
	AND [current].Province = @PROVINCE AND [prev].Province = @PROVINCE
		AND [current].Category = @CATEGORY AND [prev].Category = @CATEGORY
			AND [current].Actual != 0 AND [prev].Actual != 0
	  ORDER BY [current].Date1 

--select * from Moth where country = @COUNTRY and province = @PROVINCE and Category = @CATEGORY