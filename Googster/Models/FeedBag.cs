using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Models
{
    public class FeedBag
    {
        public int Id { get; set; }
        public Feed Feed { get; set; }
        public string Content { get; set; }
        public string Note { get; set; }

    }
}
