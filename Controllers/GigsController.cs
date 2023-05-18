using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIWebApp.Models;
using APIWebApp.ModelsDTO;
using Microsoft.Identity.Client;
using APIWebApp.Models.DTO;

namespace APIWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GigsController : ControllerBase
    {
        private readonly APIContext _context;

        public GigsController(APIContext context)
        {
            _context = context;
        }

        // GET: api/Gigs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GigDtoRead>>> GetGigs()
        {
            var gigsDtoRead = new List<GigDtoRead>();  
            var gigs = await _context.Gigs.ToListAsync();
            foreach (var gig in gigs)
            {
                var artist = await _context.Artists.FindAsync(gig.Id);
                gigsDtoRead.Add(
                    new GigDtoRead()
                    {
                        Id = gig.Id,
                        GigTitle = gig.GigTitle,
                        PlaceNumbers = gig.PlaceNumbers,
                        GigAdress = gig.GigAdress,
                        GigDate = gig.GigDate,
                        ArtistId = gig.ArtistId,
                        Artist = artist!.Name
                    });

            }  
            return gigsDtoRead;
        }

        // GET: api/Gigs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GigDtoRead>> GetGig(int id)
        {
            var gig = await _context.Gigs.FindAsync(id);
            if (gig == null) return NotFound();
            var artist = await _context.Artists.FindAsync(gig.ArtistId);
            var gigDtoRead = new GigDtoRead
            {
                Id = gig.Id,
                GigTitle = gig.GigTitle,
                PlaceNumbers = gig.PlaceNumbers,
                GigAdress = gig.GigAdress,
                GigDate = gig.GigDate,
                ArtistId = gig.ArtistId,
                Artist = artist!.Name
            };
            return gigDtoRead;
        }

        // PUT: api/Gigs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGig(int id, Gig gig)
        {
            if (id != gig.Id)
            {
                return BadRequest();
            }

            _context.Entry(gig).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GigExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Gigs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gig>> PostGig(GigDtoWrite gigDtoWrite)
        {

            var artist = await _context.Artists.FindAsync(gigDtoWrite.ArtistId);
            if (artist is null) return NotFound("Bad artist id");

            var gig = new Gig()
            {
                Artist = artist,
                ArtistId = gigDtoWrite.ArtistId,
                GigTitle = gigDtoWrite.GigTitle,
                PlaceNumbers = gigDtoWrite.PlaceNumbers,
                GigAdress = gigDtoWrite.GigAdress,
                GigDate = gigDtoWrite.GigDate
            };

            _context.Gigs.Add(gig);
            await _context.SaveChangesAsync();

            return RedirectToAction("GetGig", new { id = gig.Id });
        }

        // DELETE: api/Gigs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGig(int id)
        {
            if (_context.Gigs == null)
            {
                return NotFound();
            }
            var gig = await _context.Gigs.FindAsync(id);
            if (gig == null)
            {
                return NotFound();
            }

            _context.Gigs.Remove(gig);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GigExists(int id)
        {
            return (_context.Gigs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
