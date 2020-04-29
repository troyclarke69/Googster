using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.ViewModels
{
    public class BugIndexModel
    {
        public DateTime DownloadDate { get; set; }
        public int TotalCases { get; set; }
        public int TotalTodayCases { get; set; }
        public int TotalDeaths { get; set; }
        public int TotalTodayDeaths { get; set; }
        public int TotalRecovered { get; set; }
        public int TotalActive { get; set; }
        public int TotalCritical { get; set; }
        public decimal DeathPercentage { get; set; }
        public IEnumerable<BugListingModel> BugListing { get; set; }

        public string TotalCasesStr { get; set; }
        public string TotalTodayCasesStr { get; set; }
        public string TotalDeathsStr { get; set; }
        public string TotalTodayDeathsStr { get; set; }
        public string TotalRecoveredStr { get; set; }
        public string TotalActiveStr { get; set; }
        public string TotalCriticalStr { get; set; }
        public int TotalCountries { get; set; }
    }
}
