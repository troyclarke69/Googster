using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Interfaces
{
    public interface IBug
    {
        IEnumerable<Bug> GetAll();
        Bug Get(int id);
        void Add(Bug newBug);
        void Update(Bug newBug);
        void Delete(int id);

        IEnumerable<Bug> GetAllByDate(DateTime downloadDate);
        void DeleteByDay(DateTime downloadDate);
        DateTime GetLatestDownloadDate();
        int GetTotalCountries(DateTime downloadDate);
        int GetTotalCases(DateTime downloadDate);
        int GetTotalTodayCases(DateTime downloadDate);
        int GetTotalDeaths(DateTime downloadDate);
        int GetTotalTodayDeaths(DateTime downloadDate);
        int GetTotalRecovered(DateTime downloadDate);
        int GetTotalActive(DateTime downloadDate);
        int GetTotalCritical(DateTime downloadDate);
        decimal GetDeathPercentage(DateTime downloadDate);

        
    }
}
