using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TF2ServerBrowserAPI.Models
{
    public class Color
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Name { get; set; }

        [Column(TypeName = "nchar(7)")]
        public string PrimaryColor { get; set; }


        [Column(TypeName = "nchar(7)")]
        public string SecondaryColor { get; set; }

    }
}
