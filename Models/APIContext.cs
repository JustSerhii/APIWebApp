using Microsoft.EntityFrameworkCore;

namespace APIWebApp.Models
{
    public class APIContext : DbContext
    {
        public virtual DbSet<Artist> Artists { get; set; }

        public virtual DbSet<Genre> Genres { get; set; }

        public virtual DbSet<Album> Albums{ get; set; }

        public virtual DbSet<Song> Songs { get; set; }

        public virtual DbSet<Gig> Gigs { get; set; }

        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}
