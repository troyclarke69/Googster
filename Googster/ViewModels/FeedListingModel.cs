using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.ViewModels
{
    public class FeedListingModel
    {
        public int Id { get; set; }
        [Display(Name = "Session")]
        public string SessionId { get; set; } //GUID - used to identify records captured for each download
        [Display(Name = "Total Results")]
        public int TotalResults { get; set; }
        public int SourceId { get; set; }
        [Display(Name = "Source")]
        public string SourceName { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        [Display(Name = "Image")]
        public string UrlToImage { get; set; }
        [Display(Name = "Published")]
        public DateTime PublishedAt { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
    }
}
