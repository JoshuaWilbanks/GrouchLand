using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TF2ServerBrowserAPI.Models;

namespace TF2ServerBrowserAPI.Controllers
{
    [Route("[controller]/[Action]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly GrouchDBContext _context;

        public ColorController(GrouchDBContext context)
        {
            _context = context;
        }

        [HttpGet("{name}"), ActionName("GetColorByName")]
        public async Task<ActionResult<Color>> GetColorByName(string name)
        {

            return await _context.Color.FindAsync(name);
        }


        [HttpGet, ActionName("GetAllColors")]
        public async Task<ActionResult<IEnumerable<Color>>> GetAllColors()
        {
            return await _context.Color.ToListAsync();
        }


        [HttpPut, ActionName("UpdateColor")]
        public async Task<ActionResult> UpdateColor([Bind("Name, PrimaryColor, SecondaryColor")] Color color)
        {
            var colorTwo = await _context.Color.FindAsync(color.Name);

            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                if (colorTwo != null)
                {
                    colorTwo.PrimaryColor = color.PrimaryColor;
                    colorTwo.SecondaryColor = color.SecondaryColor;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            catch
            {
                return StatusCode(500);
            }

            return Ok();
        }

        [HttpPost, ActionName("CreateColor")]
        public async Task<ActionResult> CreateColor([Bind("Name, PrimaryColor, SecondaryColor")] Color color)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {
                _context.Add(color);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return StatusCode(500);
            }

        }

        [HttpDelete("{name}"), ActionName("DeleteColor")]
        public async Task<ActionResult> DeleteColor(string name)
        {
            try
            {
                var server = await _context.Color.FindAsync(name);
                try
                {
                    _context.Color.Remove(server);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                catch
                {
                    return StatusCode(500);
                }

            }
            catch
            {
                return BadRequest();
            }
            

        }
    }
}
