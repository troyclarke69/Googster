using Googster.Interfaces;
using IronPython.Hosting;
using System;

namespace Googster.Services
{
    public class TextClassifierService : ITextClassifier
    {
        public void Classify()
        {
            var py = Python.CreateEngine();

            try
            {
                py.ExecuteFile("C:\\Users\\USER\\OneDrive\\Documents\\Python\\One\\python.py");
            }
            catch (Exception ex)
            {
                throw new NotSupportedException();
            }
        }
    }
}
