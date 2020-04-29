USE [Googster]
GO

/****** Object:  Table [dbo].[Admin]    Script Date: 4/10/2020 10:07:21 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Admin](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SessionId] [nvarchar](max) NULL,
	[RunDate] [datetime2](7) NOT NULL,
	[LastPubDate] [datetime2](7) NOT NULL,
	[Q] [nvarchar](max) NULL,
	[Sources] [nvarchar](max) NULL,
	[Domains] [nvarchar](max) NULL,
	[ExcludeDomains] [nvarchar](max) NULL,
	[From] [datetime2](7) NOT NULL,
	[To] [datetime2](7) NOT NULL,
	[Language] [nvarchar](max) NULL,
	[SortBy] [nvarchar](max) NULL,
	[PageSize] [int] NOT NULL,
	[Page] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


