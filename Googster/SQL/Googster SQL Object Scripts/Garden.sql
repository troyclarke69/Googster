USE [Googster]
GO

/****** Object:  Table [dbo].[Garden]    Script Date: 4/10/2020 10:10:10 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Garden](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FeedId] [int] NOT NULL,
	[StringValue] [varchar](max) NULL,
	[Word] [varchar](100) NULL,
	[Position] [int] NULL,
	[RestOfLine] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


