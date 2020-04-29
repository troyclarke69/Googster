using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string SessionId { get; set; } //GUID - used to identify records captured for each download
        public DateTime RunDate { get; set; } //The DateTime data was downloaded from NewsAPI
        public DateTime LastPubDate { get; set; } //Most recent PublishedAt datetime of article download
        public string Q { get; set; } //Request param: qInTitle/Body ... search keywords/phrases
        public string Sources { get; set; } //comma-separated string of identifiers (max. 20) for news sources wanted. Either index (id) or name.
        public string Domains { get; set; } //comma-separated string of domains (eg. bbc.co) to restrict search to.
        public string ExcludeDomains { get; set; } //comma-separated string of domains to exclude
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Language { get; set; }
        public string SortBy { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }

        //public string ModelFileName { get; set; }

    }
}
