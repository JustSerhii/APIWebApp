using System.ComponentModel.DataAnnotations;

namespace APIWebApp.Models
{
    public class Artist
    {
        public Artist()
        {
            Albums = new List<Album>();
            Gigs = new List<Gig>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime ActiveSince { get; set; }
        public DateTime? ActivityStop { get; set; }

        public virtual ICollection<Album> Albums { get; set; }
        public virtual ICollection<Gig> Gigs { get; set; }


    }
}
