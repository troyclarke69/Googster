using Googster.Interfaces;
using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Services
{
    public class BugService : IBug
    {
        private readonly GoogsterContext _context;

        public BugService(GoogsterContext context) { _context = context; }

        public void Add(Bug newBug)
        {
            _context.Add(newBug);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Bug.Where(g => g.Id == id)
             .ToList().ForEach(g => _context.Bug.Remove(g));
            _context.SaveChanges();
        }

        public void DeleteByDay(DateTime downloadDate)
        {
            _context.Bug.Where(g => g.DownloadDate == downloadDate)
             .ToList().ForEach(g => _context.Bug.Remove(g));
            _context.SaveChanges();
        }

        public Bug Get(int id)
        {
            return GetAll().FirstOrDefault(f => f.Id == id);
        }

        public IEnumerable<Bug> GetAll()
        {
            return _context.Bug;
        }

        public IEnumerable<Bug> GetAllByDate(DateTime downloadDate)
        {
            return GetAll().Where(g => g.DownloadDate == downloadDate);
        }

        public decimal GetDeathPercentage(DateTime downloadDate)
        {
            int totalDeaths = GetTotalDeaths(downloadDate);
            int totalCases = GetTotalCases(downloadDate);
            decimal deathPercentage = ((decimal)totalDeaths / (decimal)totalCases) * 100;
            deathPercentage = Math.Round(deathPercentage, 2);
            return deathPercentage;
        }

        public DateTime GetLatestDownloadDate()
        {
            return GetAll().Max(d => d.DownloadDate);
        }

        public int GetTotalActive(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.Active);
        }

        public int GetTotalCases(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.Cases);
        }

        public int GetTotalCountries(DateTime downloadDate)
        {
            return _context.Bug
                .Where(c => c.DownloadDate == downloadDate).Count();
        }

        public int GetTotalCritical(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.Critical);
        }

        public int GetTotalDeaths(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.Deaths);
        }

        public int GetTotalRecovered(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.Recovered);
        }

        public int GetTotalTodayCases(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.TodayCases);
        }

        public int GetTotalTodayDeaths(DateTime downloadDate)
        {
            return _context.Bug
                .Where(b => b.DownloadDate == downloadDate)
                .Sum(s => s.TodayDeaths);
        }

        public void Update(Bug newBug)
        {
            throw new NotImplementedException();
        }
    }
}
