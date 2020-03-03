using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Talent_Onboarding.Models;

namespace Talent_Onboarding.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ProjectTalentContext _context;
        

        public SalesController(ProjectTalentContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesDTO>>> GetSales()
        {
            var sales=await _context.Sales
                .Include(s=>s.Customers)
                .Include(s=>s.Product)
                .Include(s=>s.Store).Select(s=>new SalesDTO()
                {
                    Id=s.Id,
                    CustomerId = s.CustomerId,
                    ProductId=s.ProductId,
                    StoreId=s.StoreId,
                    DateSold=s.DateSold.ToString("dd MMM,yyyy"),
                    CustomerName=s.Customers.Name,
                    ProductName=s.Product.Name,
                    StoreName=s.Store.Name
                }).ToListAsync();
            return sales;
            //return await _context.Sales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesDTO>> GetSales(int id)
        {
            var sales = await _context.Sales
               .Include(s => s.Customers)
               .Include(s => s.Product)
               .Include(s => s.Store).Select(s => new SalesDTO()
               {
                   Id = s.Id,
                   CustomerId = s.CustomerId,
                   ProductId = s.ProductId,
                   StoreId = s.StoreId,
                   DateSold = s.DateSold.ToString("dd MMM,yyyy"),
                   CustomerName = s.Customers.Name,
                   ProductName = s.Product.Name,
                   StoreName = s.Store.Name
               }).SingleOrDefaultAsync(b=>b.Id==id);
            
            //var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {
            sales.Id = id;

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SalesDTO>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            /*var salesdto = new SalesDTO()
            {
                Id = sales.Id,
                CustomerId = sales.CustomerId,
                ProductId = sales.ProductId,
                StoreId = sales.StoreId,
                DateSold = sales.DateSold,
                CustomerName = sales.Customers.Name,
                ProductName = sales.Product.Name,
                StoreName = sales.Store.Name
            };*/

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
