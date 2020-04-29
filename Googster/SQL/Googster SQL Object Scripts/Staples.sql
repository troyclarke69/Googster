USE [Googster]
GO

/****** Object:  Table [dbo].[Staples]    Script Date: 4/10/2020 10:12:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Staples](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Level] [int] NOT NULL,
	[Item] [varchar](50) NOT NULL,
	[Serving] [float] NOT NULL,
	[Cost] [float] NOT NULL,
	[CostPerServing] [float] NOT NULL,
	[EstServingDay] [float] NOT NULL,
	[CostPerDay] [float] NOT NULL
) ON [PRIMARY]
GO


