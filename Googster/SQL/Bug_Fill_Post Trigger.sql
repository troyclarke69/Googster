SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--drop trigger Bug_FIll_Post
CREATE TRIGGER Bug_Fill_Post
   ON  Bug
   AFTER INSERT
AS 
BEGIN
	
	SET NOCOUNT ON;

	DECLARE @ID int
	SELECT @ID = Id from INSERTED
	DECLARE @CASES int
	SELECT @CASES = Cases from INSERTED

   -- Population: 1,000,000 / CasesPerOneMillion * Cases
   UPDATE Bug
   SET Population = 
		cast(round(1000000 / cast(CasesPerOneMillion as decimal(18,5)) * Cases,0) as int)
   WHERE Id = @ID
	AND CasesPerOneMillion != 0

	-- NULLS will cause Error:
	UPDATE Bug 
	SET Population = 0
	WHERE Population is null

   -- DeathPercentage: Sum(Deaths) / Sum(Cases)
   IF(@CASES != 0)
   BEGIN
	   UPDATE Bug
	   SET DeathPercentage =
			round(cast(Deaths as decimal(18,2)) / cast(Cases as decimal(18,2)) * 100,2)
		WHERE Id = @ID
	END
	ELSE
	BEGIN
		UPDATE Bug
	   SET DeathPercentage = 0
		WHERE Id = @ID
	END

END
GO
