using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Models
{
    public class Feed
    {
        public int Id { get; set; }
        public string SessionId { get; set; } //GUID - used to identify records captured for each download
        public int TotalResults { get; set; }
        public int SourceId { get; set; }
        public string SourceName { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string UrlToImage { get; set; }
        public DateTime PublishedAt { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public string Prediction { get; set; }

    }
}
