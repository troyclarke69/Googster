using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.ViewModels
{
    public class LarvaeListingModel
    {
        public int Id { get; set; }
        public string Result { get; set; }
        public string IntId { get; set; } //Internal ID: index # from json
        public string Country { get; set; }
        public string Province { get; set; }
        public DateTime Date1 { get; set; }
        public string Cases { get; set; }
        public string Deaths { get; set; }
        public string Recovered { get; set; }
    }
}
