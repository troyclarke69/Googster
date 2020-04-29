using Googster.Interfaces;
using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Services
{
    public class AdminService : IAdmin
    {
        private readonly GoogsterContext _context;
        public AdminService(GoogsterContext context) { _context = context; }

        public void Add(Admin newAdmin)
        {
            _context.Add(newAdmin);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Admin.Where(g => g.Id == id)
                .ToList().ForEach(g => _context.Admin.Remove(g));
            _context.SaveChanges();
        }

        public Admin Get(int id)
        {
            return GetAll().FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<Admin> GetAll()
        {
            return _context.Admin;
        }

        public IEnumerable<Admin> GetAllByQ(string q)
        {
            return GetAll().Where(a => a.Q == q);
        }

        public IEnumerable<Admin> GetAllByRunDate(DateTime runDate)
        {
            return GetAll().Where(a => a.RunDate == runDate);
        }

        public IEnumerable<Admin> GetAllBySessionId(string sessionId)
        {
            return GetAll().Where(a => a.SessionId == sessionId);
        }

        public DateTime GetLastPubDate()
        {
            // 2 errors in this 
            // got to check how we write to the Admin table - publishedAt.

            // ** TEMP FIX: SQL > delete from Admin
            // does not work
            return _context.Feed.OrderByDescending(a => a.PublishedAt).FirstOrDefault().PublishedAt;
            
        }

        public void Update(Admin newAdmin)
        {
            throw new NotImplementedException();
        }
    }
}
