USE [Googster]
GO

/****** Object:  Table [dbo].[Feed]    Script Date: 4/10/2020 10:09:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Feed](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SessionId] [nvarchar](max) NULL,
	[TotalResults] [int] NOT NULL,
	[SourceId] [int] NOT NULL,
	[SourceName] [nvarchar](max) NULL,
	[Author] [nvarchar](max) NULL,
	[Title] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Url] [nvarchar](max) NULL,
	[UrlToImage] [nvarchar](max) NULL,
	[PublishedAt] [datetime2](7) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Rating] [int] NOT NULL,
	[Prediction] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Feed] ADD  CONSTRAINT [DF__Feed__Rating__48CFD27E]  DEFAULT ((0.0)) FOR [Rating]
GO


