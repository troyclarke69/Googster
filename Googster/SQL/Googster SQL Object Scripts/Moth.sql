USE [Googster]
GO

/****** Object:  Table [dbo].[Moth]    Script Date: 4/10/2020 10:11:05 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Moth](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Country] [varchar](50) NOT NULL,
	[Province] [varchar](50) NOT NULL,
	[Category] [int] NOT NULL,
	[Date1] [date] NOT NULL,
	[Actual] [int] NOT NULL,
	[Prediction] [int] NULL,
	[Factors] [varchar](200) NULL
) ON [PRIMARY]
GO


