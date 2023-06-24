using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RCON
{
    public class RCONDbContext : DbContext
    {
        public RCONDbContext(DbContextOptions options) 
            : base(options) { }

        public DbSet<Server> Server { get; set; }
    }
}
