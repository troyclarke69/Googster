select Country, 
	cast(round(1000000 / cast(CasesPerOneMillion as decimal(18,5)) * Cases,0) as int) [Population]
from Bug
where DownloadDate = 
	--'2020/03/29' --54574, 3020
	(select Max(DownloadDate) from Bug) --58095, 3513
and CasesPerOneMillion != 0 --why would there be 0's??


select sum(Cases) TotalCases,
		sum(TodayCases) TotalTodayCases,
		sum(Deaths) TotalDeaths,
		sum(TodayDeaths) TotaltodayDeaths,
		sum(Recovered) TotalRecovered,
		sum(Active) TotalActive,
		sum(Critical) TotalCritical,
		round(cast(sum(Deaths) as decimal(18,2)) / cast(sum(Cases) as decimal(18,2)) * 100,2) [DeathPercentage]

from Bug
where DownloadDate = 
	--'2020/03/29' --54574, 3020
	(select Max(DownloadDate) from Bug) --58095, 3513