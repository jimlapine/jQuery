using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SqlServerTypes;
using System.Data.Entity;
using Newtonsoft.Json;

public partial class _Default : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        string PersonLastName = "Smith";

        if (null != Request.Form["PersonLastName"] || null != Request.QueryString["PersonLastName"])
        {
            PersonLastName = null != Request.Form["PersonLastName"] ?
                Request.Form["PersonLastName"].ToString() : Request.QueryString["PersonLastName"].ToString();

            using (var db = new AdventureWorksContext())
            {
                var query = from person in db.People
                            join bea in db.BusinessEntityAddresses on person.BusinessEntityID equals bea.BusinessEntityID
                            join ba in db.BusinessEntityAddresses on bea.BusinessEntityID equals ba.BusinessEntityID
                            join address in db.Addresses on ba.AddressID equals address.AddressID
                            orderby person.LastName, person.FirstName
                            where person.LastName.Contains(PersonLastName)
                            select new { person.LastName, person.MiddleName, person.FirstName, person.EmailAddresses.FirstOrDefault().EmailAddress1,
                                person.PersonPhones.FirstOrDefault().PhoneNumber,
                                address.AddressLine1, address.City, address.StateProvince.StateProvinceCode, address.PostalCode};

            //foreach (var result in query)
            //{
            //    Response.Write("<ul>");
            //    Response.Write(string.Format("<li>{0}, {1}: ", result.LastName, result.FirstName, result.EmailAddress1));
            //    Response.Write(string.Format("<ul><li><a href =\"{0}\">{0}</a></li>", result.EmailAddress1));
            //    Response.Write(string.Format("<li>Phone: {0}</li>", result.PhoneNumber));
            //    Response.Write(string.Format("<li>Address: {0}, {1}, {2} {3} </li></ul>", result.AddressLine1,
            //        result.City, result.StateProvinceCode, result.PostalCode));
            //    Response.Write("</ul>");
            //}

           string JsonResult = JsonConvert.SerializeObject(query.ToList(), Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });

            Response.Write(JsonResult);
            }
        }
    }

    /// <summary>
    /// List<Person>
    /// </summary>
    public List<Person> PeopleList { get; set; }
}