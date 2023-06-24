using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using NetTopologySuite.Geometries;

namespace RCON
{
    public class Server
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string IP { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Location { get; set; }

        [Column(TypeName = "int")]
        public int Players { get; set; }

        [Column(TypeName = "geography")]
        public Point GPS { get; set; }


        [Column(TypeName = "nvarchar(MAX)")]
        public string Map { get; set; }

    }
}
