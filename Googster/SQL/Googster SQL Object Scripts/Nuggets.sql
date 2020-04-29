USE [Googster]
GO

/****** Object:  Table [dbo].[Nuggets]    Script Date: 4/10/2020 10:11:19 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Nuggets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Level] [int] NOT NULL,
	[Item] [varchar](50) NOT NULL,
	[Serving] [float] NOT NULL,
	[Cost] [float] NOT NULL,
	[DatePurchased] [date] NOT NULL,
	[EstEndDate] [date] NOT NULL,
	[NumOfDays] [int] NOT NULL
) ON [PRIMARY]
GO


