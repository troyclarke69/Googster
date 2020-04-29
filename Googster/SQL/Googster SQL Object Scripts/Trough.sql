USE [Googster]
GO

/****** Object:  Table [dbo].[Trough]    Script Date: 4/10/2020 10:13:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Trough](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FeedId] [int] NOT NULL,
	[StringValue] [varchar](max) NULL,
	[Word] [varchar](100) NULL,
	[Position] [int] NULL,
	[RestOfLine] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


