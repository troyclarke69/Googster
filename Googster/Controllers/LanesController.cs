using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Googster.Models
{
    public class LanesController : Controller
    {
        private readonly GoogsterContext _context;

        public LanesController(GoogsterContext context)
        {
            _context = context;
        }

        // GET: Lanes
        public async Task<IActionResult> Index()
        {
            return View(await _context.Lane.ToListAsync());
        }

        // GET: Lanes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var lane = await _context.Lane
                .FirstOrDefaultAsync(m => m.Id == id);
            if (lane == null)
            {
                return NotFound();
            }

            return View(lane);
        }

        // GET: Lanes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Lanes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description")] Lane lane)
        {
            if (ModelState.IsValid)
            {
                _context.Add(lane);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(lane);
        }

        // GET: Lanes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var lane = await _context.Lane.FindAsync(id);
            if (lane == null)
            {
                return NotFound();
            }
            return View(lane);
        }

        // POST: Lanes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description")] Lane lane)
        {
            if (id != lane.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(lane);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LaneExists(lane.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(lane);
        }

        // GET: Lanes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var lane = await _context.Lane
                .FirstOrDefaultAsync(m => m.Id == id);
            if (lane == null)
            {
                return NotFound();
            }

            return View(lane);
        }

        // POST: Lanes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var lane = await _context.Lane.FindAsync(id);
            _context.Lane.Remove(lane);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool LaneExists(int id)
        {
            return _context.Lane.Any(e => e.Id == id);
        }
    }
}
