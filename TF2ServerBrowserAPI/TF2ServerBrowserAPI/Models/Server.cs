using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TF2ServerBrowserAPI.Models
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
