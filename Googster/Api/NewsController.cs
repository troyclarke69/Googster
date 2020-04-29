using System;
using System.Threading.Tasks;
using Googster.ViewModels;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Googster.Api
{
    [Route("api/[controller]")]
    public class NewsController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<FeedListingModel>> Get()
        {
            var feedList = new FeedListingModel();

            // init with your API key
            var newsApiClient = new NewsApiClient("de67b2237afe4fb1b77bfbe773987fca");
            var articlesResponse = newsApiClient.GetEverything(new EverythingRequest
            {
                Q = "Trump",
                SortBy = SortBys.Popularity,
                Language = Languages.EN,
                From = new DateTime(2020, 01, 01)
            });
            if (articlesResponse.Status == Statuses.Ok)
            {
                foreach(var article in articlesResponse.Articles)
                {
                    feedList.TotalResults = articlesResponse.TotalResults;
                    feedList.Author = article.Author;
                    feedList.Description = article.Description;
                    feedList.PublishedAt = Convert.ToDateTime(article.PublishedAt);
                    feedList.Title = article.Title;
                    feedList.Url = article.Url;
                    feedList.UrlToImage = article.UrlToImage;
                }             
            }

            return feedList;
        }
   
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
