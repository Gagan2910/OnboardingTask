using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Talent_Onboarding.Models
{
    public partial class Stores
    {
        public Stores()
        {
            Sales = new HashSet<Sales>();
        }
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
