using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TF2ServerBrowserAPI.Models
{
    public class Login
    {
        [Key]
        public int RecordId { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Name { get; set; }


        [Column(TypeName = "nvarchar(MAX)")]
        public string UserID { get; set; }


        [Column(TypeName = "nvarchar(MAX)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Picture { get; set; }
    }
}
