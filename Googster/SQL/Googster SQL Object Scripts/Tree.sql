USE [Googster]
GO

/****** Object:  Table [dbo].[Tree]    Script Date: 4/10/2020 10:12:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Tree](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[LaneId] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


