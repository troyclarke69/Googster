using Googster.Interfaces;
using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Services
{
    public class LarvaeService : ILarvae
    {
        private readonly GoogsterContext _context;

        public LarvaeService(GoogsterContext context) { _context = context; }

        public void Add(Larvae newLarvae)
        {
            _context.Add(newLarvae);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Bug.Where(g => g.Id == id)
            .ToList().ForEach(g => _context.Bug.Remove(g));
            _context.SaveChanges();
        }

        public Larvae Get(int id)
        {
            return GetAll().FirstOrDefault(i => i.Id == id);
        }

        public IEnumerable<Larvae> GetAll()
        {
            return _context.Larvae;
        }

        public void Update(Larvae newLarvae)
        {
            throw new NotImplementedException();
        }
    }
}
