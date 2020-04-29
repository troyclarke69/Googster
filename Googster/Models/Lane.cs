using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Models
{
    public class Lane
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Farm Farm { get; set; }
    }
}
