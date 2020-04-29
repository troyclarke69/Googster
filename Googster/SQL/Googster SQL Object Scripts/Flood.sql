USE [Googster]
GO

/****** Object:  Table [dbo].[Flood]    Script Date: 4/10/2020 10:09:51 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Flood](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Session] [int] NOT NULL,
	[Epoch] [int] NULL,
	[Track] [int] NOT NULL,
	[Duration] [float] NULL
) ON [PRIMARY]
GO


