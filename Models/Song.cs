using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Eventing.Reader;

namespace APIWebApp.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string SongTitle { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int SongLength { get; set; }

        public int GenreId { get; set; }

        public int AlbumId { get; set; }

        public virtual Genre Genre { get; set; }

        public virtual Album Album { get; set; }

    }
}
