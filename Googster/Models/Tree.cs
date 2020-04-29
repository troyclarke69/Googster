using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Models
{
    public class Tree
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Lane Lane { get; set; }
    }
}
