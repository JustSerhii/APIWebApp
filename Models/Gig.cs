using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Eventing.Reader;

namespace APIWebApp.Models
{
    public class Gig 
    {
        public int Id { get; set; }
        public string GigTitle { get; set; }
        public DateTime GigDate { get; set; }
        public string GigAdress { get; set; }
        public int PlaceNumbers { get; set; }
        public int ArtistId { get; set; }
        public virtual Artist Artist { get; set; }

    }
}
