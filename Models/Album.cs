using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Eventing.Reader;

namespace APIWebApp.Models
{
    public class Album
    {
        public Album()
        {
            Songs = new List<Song>();
        }

        public int Id { get; set; }
        public string AlbumTitle { get; set; }
        public DateTime ReleaseDate { get; set; }

        public int ArtistId { get; set; }

        public virtual Artist Artist { get; set; }

        public virtual ICollection<Song> Songs { get; set;}


    }
}
