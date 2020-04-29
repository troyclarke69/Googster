using Googster.Models;
using IronPython.Hosting;
using System;

namespace Googster.Services
{
    public class TextClassification
    {
        private readonly GoogsterContext _context;
        public TextClassification(GoogsterContext context) { _context = context; }

        public void Classify()
        {
            var py = Python.CreateEngine();

            try
            {
                py.ExecuteFile("C:\\Users\\USER\\OneDrive\\Documents\\Python\\One\\python.py");
            }
            catch(Exception ex)
            {
                throw new NotSupportedException();
            }
        }
    }
}
