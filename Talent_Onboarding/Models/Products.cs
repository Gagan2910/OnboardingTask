using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Talent_Onboarding.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public decimal? Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
