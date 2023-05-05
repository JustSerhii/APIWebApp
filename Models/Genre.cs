using System.ComponentModel.DataAnnotations;

namespace APIWebApp.Models
{
    public class Genre
    {
        public Genre()
        {
            Songs = new List<Song>();
        }
        
        public int Id { get; set; }
        public string GenreName { get; set; }

        public virtual ICollection<Song> Songs { get; set; }
        

    }
}
