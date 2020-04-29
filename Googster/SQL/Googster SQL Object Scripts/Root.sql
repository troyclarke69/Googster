USE [Googster]
GO

/****** Object:  Table [dbo].[Root]    Script Date: 4/10/2020 10:11:41 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Root](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SearchURL] [varchar](max) NOT NULL,
	[RootURL] [varchar](2000) NOT NULL,
	[RawContent] [varchar](max) NOT NULL,
	[Tag1] [varchar](100) NULL,
	[Tag2] [varchar](100) NULL,
	[Tag3] [varchar](100) NULL,
	[Tag4] [varchar](100) NULL,
	[Tag5] [varchar](max) NULL,
	[Tag6] [varchar](max) NULL,
	[TagInt] [int] NULL,
	[TagFloat] [numeric](19, 4) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


