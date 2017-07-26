using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Load : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Set a variable to the My Documents path.
        string mydocpath = @"C:\Users\Public\Documents";

        List<string> lines = new List<string>();

        try
        {   // Open the text file using a stream reader.
            using (StreamReader sr = new StreamReader(mydocpath + @"\WriteLines.txt"))
            {
                // Read the stream to a string, and write the string to the console.
                String line = sr.ReadToEnd();
                lines.Add(line);
            }

            foreach(string line in lines)
            {
                Response.Write(line);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("The file could not be read: ");
            Console.WriteLine(ex.Message);
        }
    }
}