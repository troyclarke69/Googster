using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Googster.Interfaces;
using Googster.Models;
using Googster.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Googster.Controllers
{
    public class BugController : Controller
    {
        private readonly IBug _bug;
        private const string Url = "https://corona.lmao.ninja/countries?sort=country";


        public BugController(IBug bug)
        {
            _bug = bug;
        }

        public IActionResult Index(int Id)
        {
            // auto load latest stats: Error - Divide by Zero (Death Rate - global) ??
            //DownStats();

            var latest = _bug.GetLatestDownloadDate();

            // default sort: Cases
            var bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.Cases);

            // sort by Country (1)
            if (Id == 1)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderBy(c => c.Country);
            }
            // sort by Cases (2)
            if (Id == 2)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.Cases);
            }
            // sort by TodayCases (3)
            if (Id == 3)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.TodayCases);
            }
            // sort by Deaths (4)
            if (Id == 4)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.Deaths);
            }
            // sort by TodayDeaths (5)
            if (Id == 5)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.TodayDeaths);
            }
            // sort by Cases/M (6)
            if (Id == 6)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.CasesPerOneMillion);
            }
            // sort by Deaths/M (7)
            if (Id == 7)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.DeathsPerOneMillion);
            }
            // sort by Population (8)
            if (Id == 8)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.Population);
            }
            // sort by Death% (7)
            if (Id == 9)
            {
                bugModel = _bug.GetAll()
                .Where(d => d.DownloadDate == latest)
                    .ToList().OrderByDescending(c => c.DeathPercentage);
            }

            var bugs = bugModel
                .Select(f => new BugListingModel
                    {
                        Id = f.Id,
                        Country = f.Country,
                        ScrAPI_Id = f.ScrAPI_Id,
                        Lat = f.Lat,
                        Long = f.Long,
                        Flag = f.Flag,
                        Iso3 = f.Iso3,
                        Iso2 = f.Iso2,
                        Cases = f.Cases,
                        CaseStr = f.Cases.ToString("N0"),
                        TodayCases = f.TodayCases,
                        Deaths = f.Deaths,
                        TodayDeaths = f.TodayDeaths,
                        Recovered = f.Recovered,
                        Active = f.Active,
                        Critical = f.Critical,
                        CasesPerOneMillion = f.CasesPerOneMillion,
                        DeathsPerOneMillion = f.DeathsPerOneMillion,
                        DownloadDate = f.DownloadDate,
                        Population = f.Population,
                        PopStr = f.Population.ToString("N0"),
                        DeathPercentage = f.DeathPercentage

                    }
                ).ToList();


            var res = new BugIndexModel
            {
                BugListing = bugs,
                DownloadDate = latest,
                TotalActive = _bug.GetTotalActive(latest),
                TotalCases = _bug.GetTotalCases(latest),
                TotalCritical = _bug.GetTotalCritical(latest),
                TotalDeaths = _bug.GetTotalDeaths(latest),
                TotalRecovered = _bug.GetTotalRecovered(latest),
                TotalTodayCases = _bug.GetTotalTodayCases(latest),
                TotalTodayDeaths = _bug.GetTotalTodayDeaths(latest),
                DeathPercentage = _bug.GetDeathPercentage(latest),
                TotalActiveStr = _bug.GetTotalActive(latest).ToString("N0"),
                TotalCasesStr = _bug.GetTotalCases(latest).ToString("N0"),
                TotalCriticalStr = _bug.GetTotalCritical(latest).ToString("N0"),
                TotalDeathsStr = _bug.GetTotalDeaths(latest).ToString("N0"),
                TotalRecoveredStr = _bug.GetTotalRecovered(latest).ToString("N0"),
                TotalTodayCasesStr = _bug.GetTotalTodayCases(latest).ToString("N0"),
                TotalTodayDeathsStr = _bug.GetTotalTodayDeaths(latest).ToString("N0"),
                TotalCountries = _bug.GetTotalCountries(latest)

            };

            return View(res);
        }

        public IActionResult DownStats()
        {
            //var newFeed = new Feed { };
            string country = string.Empty;
            int scrAPI_Id = 0;
            int latitude = 0;
            int longitude = 0;
            string flag = string.Empty;
            string iso3 = string.Empty;
            string iso2 = string.Empty;
            int cases = 0;
            int todayCases = 0;
            int deaths = 0;
            int todayDeaths = 0;
            int recovered = 0;
            int active = 0;
            int critical = 0;
            int casesPerOneMillion = 0;
            int deathsPerOneMillion = 0;
            var downloadDate = DateTime.Now;

            // https://corona.lmao.ninja/countries?sort=country
            // https://corona.lmao.ninja/all

            // delete any entries for the downloadDate; only one dataset per day
            var latest = _bug.GetLatestDownloadDate();
            _bug.DeleteByDay(latest);

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(Url);

            client.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(Url).Result;

            if (response.IsSuccessStatusCode)
            {
                // load content in db
                var results = response.Content.ReadAsAsync<IEnumerable<BugListingModel>>().Result;
                
                foreach (var x in results)
                {
                    var newBug = new Bug();
                   
                    newBug.Country = x.Country;
                    newBug.ScrAPI_Id = x.ScrAPI_Id;
                    newBug.Lat = x.Lat;
                    newBug.Long = x.Long;
                    newBug.Flag = x.Flag;
                    newBug.Iso3 = x.Iso3;
                    newBug.Iso2 = x.Iso2;
                    newBug.Cases = x.Cases;
                    newBug.TodayCases = x.TodayCases;
                    newBug.Deaths = x.Deaths;
                    newBug.TodayDeaths = x.TodayDeaths;
                    newBug.Recovered = x.Recovered;
                    newBug.Active = x.Active;
                    newBug.Critical = x.Critical;

                    if (x.CasesPerOneMillion.HasValue)
                    { newBug.CasesPerOneMillion = (decimal)x.CasesPerOneMillion; }
                    else { newBug.CasesPerOneMillion = 0; }

                    if (x.DeathsPerOneMillion.HasValue)
                    { newBug.DeathsPerOneMillion = (decimal)x.DeathsPerOneMillion; }
                    else { newBug.DeathsPerOneMillion = 0; }

                    //newBug.DeathsPerOneMillion = (decimal)x.DeathsPerOneMillion;
                    newBug.DownloadDate = downloadDate;

                    _bug.Add(newBug);
                }

            }
                                          
            return RedirectToAction("Index");
        }
    }
}
