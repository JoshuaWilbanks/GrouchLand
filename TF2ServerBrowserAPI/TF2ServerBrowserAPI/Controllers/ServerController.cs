using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TF2ServerBrowserAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TF2ServerBrowserAPI.Controllers
{
    [Route("[controller]/[Action]")]
    [ApiController]
    public class ServerController : ControllerBase
    {

        private readonly GrouchDBContext _context;

        public ServerController(GrouchDBContext context)
        {
            _context = context;
        }

        [HttpGet, ActionName("GetAllServers")]
        public async Task<ActionResult<IEnumerable<Server>>> GetAllServers()
        {
            return await _context.Server.ToListAsync();
        }

        [HttpGet("{id}"), ActionName("GetServerById")]
        public async Task<ActionResult<Server>> GetServerById(int id)
        {
            return await _context.Server.FindAsync(id);
        }


        // POST api/<ValuesController>
        [HttpPost, ActionName("CreateServer")]
        public async Task<ActionResult<Server>> CreateServer([Bind("Name, IP, Location, Players, Map, GPS")] Server server)
        {
            if (ModelState.IsValid)
            {
                Console.WriteLine("Model is valid -> Creating Server");
                Server serverTwo = new Server();
                serverTwo.Name = server.Name;
                serverTwo.Location = server.Location;
                serverTwo.IP = server.IP;
                serverTwo.Players = server.Players;
                serverTwo.Map = server.Map;
                serverTwo.GPS = server.GPS;
                _context.Add(serverTwo);
                await _context.SaveChangesAsync();
                return serverTwo;
            }

            return server;
        }

        // PUT api/<ValuesController>/5
        [HttpPost, ActionName("EditServer")]
        public async Task<ActionResult<Server>> EditServer([Bind("Id, Name, IP, Location, Players, Map, GPS")] Server server)
        {
            var serverTwo = _context.Server.FirstOrDefault(m => m.Id == server.Id);

            if (ModelState.IsValid)
            {

                try
                {
                    if (serverTwo != null)
                    {
                        serverTwo.Name = server.Name;
                        serverTwo.Location = server.Location;
                        serverTwo.IP = server.IP;
                        serverTwo.Players = server.Players;
                        serverTwo.Map = server.Map;
                        serverTwo.GPS = server.GPS;
                        await _context.SaveChangesAsync();
                        return serverTwo;
                    }
                }

                catch (DbUpdateConcurrencyException ex)
                {
                    if (!ServerExists(server.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        Console.WriteLine("----------");
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("----------");
                    }
                }
                return NotFound();
            }

            return server;
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var server = await _context.Server.FindAsync(id);
                _context.Server.Remove(server);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch {

                return StatusCode(500);
            }

            return Ok();
        }

        private bool ServerExists(int id)
        {
            return _context.Server.Any(e => e.Id == id);
        }

    }
}
