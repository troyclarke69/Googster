using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Interfaces
{
    public interface IAdmin
    {
        IEnumerable<Admin> GetAll();
        Admin Get(int id);
        void Add(Admin newAdmin);
        void Update(Admin newAdmin);
        void Delete(int id);

        IEnumerable<Admin> GetAllByRunDate(DateTime runDate);
        IEnumerable<Admin> GetAllBySessionId(string sessionId);
        IEnumerable<Admin> GetAllByQ(string q);
        DateTime GetLastPubDate();
    }
}
