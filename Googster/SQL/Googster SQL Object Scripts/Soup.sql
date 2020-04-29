USE [Googster]
GO

/****** Object:  Table [dbo].[Soup]    Script Date: 4/10/2020 10:11:56 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Soup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Word] [varchar](100) NULL,
	[WordType] [varchar](50) NULL
) ON [PRIMARY]
GO


