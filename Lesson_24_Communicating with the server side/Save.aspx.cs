using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Save : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        List<string> lines = new List<string>();
        string Name = Request.Form["Name"];
        string Content = Request.Form["content"];

        if (null != Name)
        {
            Response.Write(string.Format("Name: {0}\n", Name));
            lines.Add("Name:" + Name);
        }
        if (null != Content)
        {
            Response.Write(string.Format("Content: {0}\n", Content));
            lines.Add("Content:" + Content);
        }

        // Set a variable to the My Documents path.
        string mydocpath = @"C:\Users\Public\Documents";

        using (StreamWriter outputFile = new StreamWriter(mydocpath + @"\WriteLines.txt"))
        {
            foreach (string line in lines)
                outputFile.WriteLine(Server.HtmlEncode(line));
        }
    }
}