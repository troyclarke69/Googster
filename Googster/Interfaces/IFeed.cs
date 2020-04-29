using Googster.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Googster.Interfaces
{
    public interface IFeed
    {
        IEnumerable<Feed> GetAll();
        Feed Get(int id);
        void Add(Feed newFeed);
        void Update(Feed newFeed);
        void Delete(int id);

        IEnumerable<Feed> GetAllByDate(DateTime pubDate);
        IEnumerable<Feed> GetAllBySessionId(string sessionId);
        IEnumerable<Feed> GetAllBySourceName(string sourceName);
        IEnumerable<Feed> GetAllByAuthor(string author);
    }
}
