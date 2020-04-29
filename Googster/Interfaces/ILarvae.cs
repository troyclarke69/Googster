using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Interfaces
{
    public interface ILarvae
    {
        IEnumerable<Larvae> GetAll();
        Larvae Get(int id);
        void Add(Larvae newLarvae);
        void Update(Larvae newLarvae);
        void Delete(int id);
    }
}
