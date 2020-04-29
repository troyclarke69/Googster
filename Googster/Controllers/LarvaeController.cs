using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Googster.Interfaces;
using Googster.Models;
using Googster.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Googster.Controllers
{
    public class LarvaeController : Controller
    {
        //process: 
        // 1. Download RAW data from localhost/Larva webpage (this)
        // 2. Run CORONA Dailies Parsing WITH sql script
        // 3. Run CORONA Dailies Parsing TROUGH sql script
        // 4. Export Googster.Moth to Googster.Moth (this code populates .LARVAE table, then writes to MOTH)
        // 5. Convert SQL to SQLite (Rebase.com)

        //NOTE: APRIL 15 2020: REVISED
        //Seed Data/Data API: https://pomber.github.io/covid19/timeseries.json" 
        // USES same files/components as before, 
        // as well as writes to 'Larvae' model/table - one change to the model: added Date1

        private readonly ILarvae _larvae;

        // URL #1
        private const string Url = "https://corona.lmao.ninja/v2/historical";

        // URL #2
        // NEW* April 15 2020 ** NOT MUCH SUCCESS: HOW DO YOU PARSE?
        //private const string Url = "https://pomber.github.io/covid19/timeseries.json";

        public LarvaeController(ILarvae larvae)
        {
            _larvae = larvae;
        }

        public IActionResult Index(int Id)
        {
            // auto load latest stats: Error - Divide by Zero (Death Rate - global) ?? IN SQL TRIGGER??
            //DownStats();

            //var latest = _larvae.GetLatestDownloadDate();

            // default sort: Cases
            var larvaeModel = _larvae.GetAll();

            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.Cases);

            //// sort by Country (1)
            //if (Id == 1)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderBy(c => c.Country);
            //}
            //// sort by Cases (2)
            //if (Id == 2)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.Cases);
            //}
            //// sort by TodayCases (3)
            //if (Id == 3)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.TodayCases);
            //}
            //// sort by Deaths (4)
            //if (Id == 4)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.Deaths);
            //}
            //// sort by TodayDeaths (5)
            //if (Id == 5)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.TodayDeaths);
            //}
            //// sort by Cases/M (6)
            //if (Id == 6)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.CasesPerOneMillion);
            //}
            //// sort by Deaths/M (7)
            //if (Id == 7)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.DeathsPerOneMillion);
            //}
            //// sort by Population (8)
            //if (Id == 8)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.Population);
            //}
            //// sort by Death% (7)
            //if (Id == 9)
            //{
            //    bugModel = _larvae.GetAll()
            //    .Where(d => d.DownloadDate == latest)
            //        .ToList().OrderByDescending(c => c.DeathPercentage);
            //}

            var larvae = larvaeModel
                .Select(f => new LarvaeListingModel
                {
                    Id = f.Id,
                    IntId = f.IntId,
                    Country = f.Country,
                    Province = f.Province,
                    Cases = f.Cases,
                    Deaths = f.Deaths,
                    Recovered = f.Recovered
                }
                ).ToList();

            return View(larvae);
        }

        public IActionResult DownStats()
        {
            //var newFeed = new Feed { };
            int intId = 0;
            string country = string.Empty;
            string province = string.Empty;
            string cases = string.Empty;
            string deaths = string.Empty;
            string recovered = string.Empty;       

            // https://corona.lmao.ninja/countries?sort=country
            // https://corona.lmao.ninja/v2/historical

            // delete any entries for the downloadDate; only one dataset per day
            //var latest = _larvae.GetLatestDownloadDate();
            //_larvae.DeleteByDay(latest);

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(Url);

            client.DefaultRequestHeaders.Accept.Add(
                new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync(Url).Result;

            if (response.IsSuccessStatusCode)
            {
                // load content in db
                //Url2: THIS DOES NOT WORK!!! Cannot be deserialized .. see error below
                //var results = response.Content.ReadAsAsync<IEnumerable<LarvaeListingModel>>().Result;

                // Url1 or Url2
                var results = response.Content.ReadAsStringAsync().Result;

                // START >> THIS WORKS FOR BOTH URL APIs ... however only writes (entire) result to table
                // April 15, 2020
                var newLarvae = new Larvae
                {
                    Result = results
                };
                _larvae.Add(newLarvae);
                // END

                // START >> This was just for shits&giggles ... did not amount to anything ...
                //JToken token = JToken.Parse(results);
                //JArray countryStr = (JArray)token.SelectToken("country");
                //JArray provinceStr = (JArray)token.SelectToken("province");
                //JArray casesArr = (JArray)token.SelectToken("timeline[0].cases");
                //JArray deathsArr = (JArray)token.SelectToken("timeline[0].deaths");
                //JArray recoveredArr = (JArray)token.SelectToken("timeline[0].recovered");
                // END

                // Error received when attempting to process Url #2:
                /*
                 * Cannot deserialize the current JSON object (e.g. {"name":"value"}) into type 'System.Collections.Generic.IEnumerable`1[Googster.ViewModels.LarvaeListingModel]' because the type requires a JSON array (e.g. [1,2,3]) to deserialize correctly.
                    To fix this error either change the JSON to a JSON array (e.g. [1,2,3]) or change the deserialized type so that it is a normal .NET type (e.g. not a primitive type like integer, not a collection type like an array or List<T>) that can be deserialized from a JSON object. JsonObjectAttribute can also be added to the type to force it to deserialize from a JSON object.
                    Path 'Afghanistan', line 2, position 16.)
                 */
                // So I DO NOT KNOW how to work with that FUCK'N data (in .NET, Ng, or Python)
                //foreach (var x in results)
                //{
                //    var newLarvae = new Larvae
                //    {

                //        IntId = "0", // Not in Url2
                //        Country = "Country",
                //        Province = "Province", //Not in Url2
                //        Date1 = x.Date1,
                //        Cases = x.Cases,
                //        Deaths = x.Deaths,
                //        Recovered = x.Recovered
                //    };

                //    _larvae.Add(newLarvae);
                //}
            }

            return RedirectToAction("Index");
        }
    }
}
