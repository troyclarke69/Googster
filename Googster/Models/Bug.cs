using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Models
{
    public class Bug
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string ScrAPI_Id { get; set; }
        public int Lat { get; set; }
        public int Long { get; set; }
        public string Flag { get; set; }
        public string Iso3 { get; set; }
        public string Iso2 { get; set; }
        public int Cases { get; set; }
        public int TodayCases { get; set; }
        public int Deaths { get; set; }
        public int TodayDeaths { get; set; }
        public int Recovered { get; set; }
        public int Active { get; set; }
        public int Critical { get; set; }
        public decimal CasesPerOneMillion { get; set; }
        public decimal DeathsPerOneMillion { get; set; }
        public DateTime DownloadDate { get; set; }
        public int Population { get; set; }
        public decimal DeathPercentage { get; set; }



    }
}
