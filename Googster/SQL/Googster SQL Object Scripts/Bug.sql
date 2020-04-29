USE [Googster]
GO

/****** Object:  Table [dbo].[Bug]    Script Date: 4/10/2020 10:08:35 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Bug](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Country] [varchar](100) NOT NULL,
	[ScrAPI_Id] [int] NULL,
	[Lat] [int] NULL,
	[Long] [int] NULL,
	[Flag] [varchar](250) NULL,
	[Iso3] [varchar](5) NULL,
	[Iso2] [varchar](5) NULL,
	[Cases] [int] NOT NULL,
	[TodayCases] [int] NULL,
	[Deaths] [int] NOT NULL,
	[TodayDeaths] [int] NULL,
	[Recovered] [int] NULL,
	[Active] [int] NULL,
	[Critical] [int] NULL,
	[CasesPerOneMillion] [decimal](18, 2) NULL,
	[DeathsPerOneMillion] [decimal](18, 2) NULL,
	[DownloadDate] [date] NOT NULL,
	[Population] [int] NULL,
	[DeathPercentage] [decimal](18, 2) NULL
) ON [PRIMARY]
GO


