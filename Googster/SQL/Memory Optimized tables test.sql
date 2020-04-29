USE master 
GO 
  
--DROP DATABASE IF EXISTS [TestTemporal]
--GO
CREATE DATABASE [TestTemporal] 
 ON  PRIMARY 
( NAME = N'TestTemporal', FILENAME = N'C:\Users\USER\TestTemporal.mdf' ) 
 LOG ON 
( NAME = N'TestTemporal_log', FILENAME = N'C:\Users\USER\TestTemporal_log.ldf' ) 
GO 
  
/* Fix: Error > AUTO_CLOSE is not supported with db that have a MEMORY_OPTIMIZED_DATA filegroup*/
ALTER DATABASE [TestTemporal] SET AUTO_CLOSE OFF;
GO

-- Add memory optimized filegroup and a file 
ALTER DATABASE [TestTemporal] ADD FILEGROUP [Optimized_FG] CONTAINS MEMORY_OPTIMIZED_DATA 
GO 
ALTER DATABASE TestTemporal ADD FILE ( NAME = N'Optimized_Data', FILENAME = N'C:\Users\USER\Optimized_Data.ndf') TO FILEGROUP [Optimized_FG] 
GO 
  
-- Turn memory optimization feature on at the database level 
ALTER DATABASE TestTemporal SET MEMORY_OPTIMIZED_ELEVATE_TO_SNAPSHOT = ON 
GO 
  
-- Create a Customer temporal table without Memory optimization and insert 3 rows 
USE TestTemporal 
GO 
  
CREATE TABLE Customer ( 
CustomerId INT IDENTITY(1,1)  PRIMARY KEY 
,FirstName VARCHAR(30) NOT NULL 
,LastName VARCHAR(30) NOT NULL 
,Amount_purchased DECIMAL NOT NULL 
,StartDate datetime2 generated always as row START NOT NULL 
,EndDate datetime2 generated always as row END NOT NULL 
,PERIOD FOR SYSTEM_TIME (StartDate, EndDate) 
) 
WITH(SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.CustomerHistory)) 
GO 
  
INSERT INTO dbo.Customer(  FirstName,    LastName,    Amount_Purchased) 
VALUES ( 'Frank', 'Sinatra',20000.00),( 'Shawn', 'McGuire',30000.00),( 'Amy', 'Carlson',40000.00) 
GO 
  
-- Now create a memory optimized temporal table Customer2 and insert the same 3 rows 
CREATE TABLE Customer2 ( 
CustomerId INT IDENTITY(1,1)  
,FirstName VARCHAR(30) NOT NULL 
,LastName VARCHAR(30) NOT NULL 
,Amount_purchased DECIMAL NOT NULL 
,StartDate datetime2 generated always as row START NOT NULL 
,EndDate datetime2 generated always as row END NOT NULL 
,PERIOD FOR SYSTEM_TIME (StartDate, EndDate), 
CONSTRAINT [PK_CustomerID] PRIMARY KEY NONCLUSTERED HASH (CustomerId) WITH (BUCKET_COUNT = 131072) 
) 
WITH(MEMORY_OPTIMIZED = ON, DURABILITY = SCHEMA_AND_DATA, 
SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.Customer2History))  
GO 
  
INSERT INTO dbo.Customer2 (  FirstName,    LastName,    Amount_Purchased) 
VALUES ( 'Frank', 'Sinatra',20000.00),( 'Shawn', 'McGuire',30000.00),( 'Amy', 'Carlson',40000.00) 
GO 
  
-- Let's select data from both table with Actual Execution plan mode on. 
SELECT * FROM dbo.Customer 
GO 

SELECT * FROM dbo.Customer2
GO