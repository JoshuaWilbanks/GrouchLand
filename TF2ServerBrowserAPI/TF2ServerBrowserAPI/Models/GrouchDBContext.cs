
using Microsoft.EntityFrameworkCore;

namespace TF2ServerBrowserAPI.Models
{
    public class GrouchDBContext: DbContext
    {

        public GrouchDBContext(DbContextOptions<GrouchDBContext> options) : base(options)
        {
            

        }

        public DbSet<Server> Server { get; set; }

        public DbSet<AuthorizedUsers> AuthorizedUsers { get; set; }

        public DbSet<Login> Login { get; set; }

        public DbSet<Color> Color { get; set; }
    }
}
