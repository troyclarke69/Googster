UPDATE Bug
   SET Population = 
		cast(round(1000000 / cast(CasesPerOneMillion as decimal(18,5)) * Cases,0) as int)
	WHERE CasesPerOneMillion != 0

	UPDATE Bug 
	SET Population = 0
	WHERE Population is null
  

   -- DeathPercentage: Sum(Deaths) / Sum(Cases)
   Update Bug
   SET DeathPercentage =
		round(cast(Deaths as decimal(18,2)) / cast(Cases as decimal(18,2)) * 100,2)
	

/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Country]
      ,[ScrAPI_Id]
      ,[Lat]
      ,[Long]
      ,[Flag]
      ,[Iso3]
      ,[Iso2]
      ,[Cases]
      ,[TodayCases]
      ,[Deaths]
      ,[TodayDeaths]
      ,[Recovered]
      ,[Active]
      ,[Critical]
      ,[CasesPerOneMillion]
      ,[DeathsPerOneMillion]
      ,[DownloadDate]
      ,[Population]
      ,[DeathPercentage]
  FROM [Googster].[dbo].[Bug]
  where Country = 'USA' and DownloadDate = '2020/03/29'

  --delete from Bug where ID = 814

  insert into Bug([Country]
      ,[ScrAPI_Id]
      ,[Lat]
      ,[Long]
      ,[Flag]
      ,[Iso3]
      ,[Iso2]
      ,[Cases]
      ,[TodayCases]
      ,[Deaths]
      ,[TodayDeaths]
      ,[Recovered]
      ,[Active]
      ,[Critical]
      ,[CasesPerOneMillion]
      ,[DeathsPerOneMillion]
      ,[DownloadDate])
	SELECT [Country]
      ,[ScrAPI_Id]
      ,[Lat]
      ,[Long]
      ,[Flag]
      ,[Iso3]
      ,[Iso2]
      ,[Cases]
      ,[TodayCases]
      ,[Deaths]
      ,[TodayDeaths]
      ,[Recovered]
      ,[Active]
      ,[Critical]
      ,[CasesPerOneMillion]
      ,[DeathsPerOneMillion]
      ,[DownloadDate]
     
  FROM [Googster].[dbo].[Bug]
  where Country = 'USA' and DownloadDate = '2020/03/29'