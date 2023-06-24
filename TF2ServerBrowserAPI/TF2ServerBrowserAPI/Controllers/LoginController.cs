using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TF2ServerBrowserAPI.Models;

namespace TF2ServerBrowserAPI.Controllers
{
    //used to create, delete, and update Login table
    //Login table contains RecordId (key), RecordId, EntryId (entry order), and Data (json from react)


    [ApiController]
    [Route("[controller]/[Action]")]
    public class LoginController : Controller
    {

        private readonly GrouchDBContext _context;

        public LoginController(GrouchDBContext context)
        {
            _context = context;
        }

        //get list of authorized to edit users
        [HttpGet, ActionName("AuthUsers")]
        public async Task<ActionResult<IEnumerable<AuthorizedUsers>>> AuthUsers()
        {
            return await _context.AuthorizedUsers.ToListAsync();
        }

        //verify tokenId
        [HttpPost, ActionName("Verify")]
        public JsonResult Verify([Bind("Id")] VerifyId id)
        {
            using (HttpClient client = new HttpClient())
            {
                var response = client.GetAsync("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id.Id).Result;
                var responseBody = response.Content.ReadAsStringAsync().Result;
                return Json(responseBody);
                
            }
        }

        //get all
        // Login/Index
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> Index()
        {
            return await _context.Login.ToListAsync();
        }

        //get by login id
        // GET: Login/Details
        [HttpGet("{id}"), ActionName("Details")]
        public async Task<ActionResult<Login>> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var login = await _context.Login
                .FirstOrDefaultAsync(m => m.RecordId == id);
            if (login == null)
            {
                return NotFound();
            }

            return login;
        }


        [HttpPost, ActionName("Exists")]
        public async Task<bool> Exists([Bind("Name,Email,Picture,UserId")] Login login)
        {

            if (ModelState.IsValid)
            {
                var loginResponse = await _context.Login
                .FirstOrDefaultAsync(m => m.UserID == login.UserID);

                if (loginResponse == null)
                {
                    return false;
                }

                return true;
            }
            else return false;
   


        }


        // Login/Create
        [HttpPost, ActionName("Create")]
        public async Task<ActionResult<Login>> Create([Bind("Name,Email,Picture,UserId,RecordId")] Login login)
        {

            if (ModelState.IsValid)
            {
                Login loginTwo = new Login();
                loginTwo.Name = login.Name;
                loginTwo.Email = login.Email;
                loginTwo.UserID = login.UserID;
                loginTwo.Picture = login.Picture;

                _context.Add(loginTwo);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else return login;
        }


        // Login/Edit
        [HttpPost, ActionName("Edit")]
        public async Task<ActionResult<Login>> Edit([Bind("Name,Email,Picture,UserId,RecordId")] Login login)
        {


            if (ModelState.IsValid)
            {
                try
                {
                    var loginPull = _context.Login.FirstOrDefault(m => m.RecordId == login.RecordId);

                    if (loginPull != null)
                    {

                        loginPull.Name = login.Name;
                        loginPull.Email = login.Email;
                        loginPull.Picture = login.Picture;
                        loginPull.UserID = login.UserID;
                        await _context.SaveChangesAsync();

                    }

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LoginExists(login.RecordId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return login;
        }

        // Login/Delete
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed([Bind("Name,Email,Picture,UserId,RecordId")] Login login)
        {
             ;

            var loginResponse = await _context.Login.FindAsync(_context.Login.FirstOrDefault(m => m.UserID == login.UserID).RecordId);
            _context.Login.Remove(loginResponse);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        private bool LoginExists(int id)
        {
            return _context.Login.Any(e => e.RecordId == id);
        }
    }
}

public class VerifyId
{
    public string Id { get; set; }
}
