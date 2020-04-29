USE [Googster]
GO

/****** Object:  Table [dbo].[Bucket]    Script Date: 4/10/2020 10:08:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Bucket](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FeedId] [int] NOT NULL,
	[StringValue] [varchar](max) NULL,
	[Quote] [varchar](200) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


