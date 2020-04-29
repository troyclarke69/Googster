using System;
using System.Linq;
using Googster.Interfaces;
using Googster.Models;
using Googster.ViewModels;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;

namespace Googster.Controllers
{
    public class FeedController : Controller
    {
        private readonly IFeed _feed;
        private readonly IAdmin _admin;
        private readonly ITextClassifier _textClassifier;

        public FeedController(IFeed feed, IAdmin admin, ITextClassifier textClassifier)
        {
            _feed = feed;
            _admin = admin;
            _textClassifier = textClassifier;
        }

        public IActionResult Index()
        {
            //test TextClassification python piece
            //_textClassifier.Classify(); throws no module sklearn


            var feedModel = _feed.GetAll().ToList();
            var feeds = feedModel.Select
                (f => new FeedListingModel
                {
                    Id = f.Id,
                    SessionId = f.SessionId,
                    TotalResults = f.TotalResults,
                    SourceId = f.SourceId,
                    SourceName = f.SourceName,
                    Author = f.Author,
                    Title = f.Title,
                    Description = f.Description,
                    Url = f.Url,
                    UrlToImage = f.UrlToImage,
                    PublishedAt = f.PublishedAt,
                    Content = f.Content,
                    Rating = f.Rating                                   
               }
                ).ToList();

            return View(feeds);
        }

        public IActionResult DownNews()
        {
            //var newFeed = new Feed { };
            var sessionId = Guid.NewGuid().ToString();
            int totalRecords = 0;
            decimal numPages = 0;
            int numPagesInt = 0;
            int pageSize = 100;
            var runDate = DateTime.Now;
            var lastPubDate = DateTime.Now;
            var q = "trump";
            var sources = string.Empty;
            var domains = string.Empty;
            var excludeDomains = string.Empty;
            var from = DateTime.Now.AddDays(-3);
                var to = DateTime.Now;
            var language = "en";
            var sortBy = "PublishedAt";
            var page = 1;

            // init with your API key
            var newsApiClient = new NewsApiClient("de67b2237afe4fb1b77bfbe773987fca");
            var articlesResponse = newsApiClient.GetEverything(new EverythingRequest
            {              
                Q = q,
                SortBy = SortBys.PublishedAt,
                Language = Languages.EN,
                From = from,
                PageSize = pageSize,
                Page = page
            });

            if (articlesResponse.Status == Statuses.Ok)
            {
                totalRecords = articlesResponse.TotalResults;
                numPages = totalRecords / pageSize;
                numPagesInt = Convert.ToInt32(Math.Ceiling(numPages));

                foreach (var article in articlesResponse.Articles)
                {
                    var newFeed = new Feed();
                    newFeed.SessionId = sessionId;
                    newFeed.TotalResults = articlesResponse.TotalResults;
                    newFeed.SourceId = 0;  //what format?
                    newFeed.SourceName = article.Source.Name;
                    newFeed.Author = article.Author;
                    newFeed.Description = article.Description;
                    newFeed.PublishedAt = Convert.ToDateTime(article.PublishedAt);
                    newFeed.Title = article.Title;
                    newFeed.Url = article.Url;
                    newFeed.UrlToImage = article.UrlToImage;
                    newFeed.Content = string.Empty;
                    //feedList.Content = article.Content;  //not available in .net. Available in JS.
                    //add to table
                    _feed.Add(newFeed);
                }
            }

            var newAdmin = new Admin
            {
                SessionId = sessionId,
                RunDate = runDate,
                LastPubDate = _admin.GetLastPubDate(),
                Q = q,
                Sources = sources,
                Domains = domains,
                ExcludeDomains = excludeDomains,
                From = from,
                To = to,
                Language = language,
                SortBy = sortBy,
                PageSize = pageSize,
                Page = page
            };

            //todo: add to Admin
            _admin.Add(newAdmin);

            return RedirectToAction("Index");
        }
    }
}