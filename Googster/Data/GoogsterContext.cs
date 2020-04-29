using Microsoft.EntityFrameworkCore;
using Googster.ViewModels;

namespace Googster.Models
{
    public class GoogsterContext : DbContext
    {
        public GoogsterContext(DbContextOptions<GoogsterContext> options) : base(options)
        { }

        public DbSet<Bug> Bug { get; set; }
        public DbSet<Larvae> Larvae { get; set; }
        public DbSet<Farm> Farm { get; set; }
        public DbSet<Lane> Lane { get; set; }
        public DbSet<Tree> Tree { get; set; }
        public DbSet<Feed> Feed { get; set; }
        public DbSet<Admin> Admin { get; set; }
        public DbSet<FeedBag> FeedBag { get; set; }

    }
}
