USE [Googster]
GO

/****** Object:  Table [dbo].[Lane]    Script Date: 4/10/2020 10:10:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Lane](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[FarmId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


