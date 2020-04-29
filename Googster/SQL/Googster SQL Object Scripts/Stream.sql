USE [Googster]
GO

/****** Object:  Table [dbo].[Stream]    Script Date: 4/10/2020 10:12:31 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Stream](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Session] [varchar](50) NOT NULL,
	[Track] [varchar](100) NOT NULL
) ON [PRIMARY]
GO


