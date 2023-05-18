namespace APIWebApp.Models.DTO;

public class GigDtoRead
{
    public int Id { get; set; }
    public string GigTitle { get; set; }
    public DateTime GigDate { get; set; }
    public string GigAdress { get; set; }
    public int PlaceNumbers { get; set; }
    public int ArtistId { get; set; }

    public string Artist { get; set;}
}
