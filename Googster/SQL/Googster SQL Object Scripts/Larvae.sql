USE [Googster]
GO

/****** Object:  Table [dbo].[Larvae]    Script Date: 4/10/2020 10:10:46 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Larvae](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IntId] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[Province] [nvarchar](max) NULL,
	[Cases] [nvarchar](max) NULL,
	[Deaths] [nvarchar](max) NULL,
	[Recovered] [nvarchar](max) NULL,
	[Result] [nvarchar](max) NULL,
 CONSTRAINT [PK_Larvae] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


