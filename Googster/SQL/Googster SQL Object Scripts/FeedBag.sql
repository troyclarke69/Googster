USE [Googster]
GO

/****** Object:  Table [dbo].[FeedBag]    Script Date: 4/10/2020 10:09:32 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FeedBag](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FeedId] [int] NULL,
	[Content] [nvarchar](max) NULL,
	[Note] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


