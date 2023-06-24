using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TF2ServerBrowserAPI.Models
{
    public class AuthorizedUsers
    {
        [Key]
        public int RecordId { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string UserId { get; set; }
    }
}
