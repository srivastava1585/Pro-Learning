using Newtonsoft.Json;
using PWA_WEB.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Pro_Learning.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult AddCourses(CourseDetail obj)
        {
            string path = Server.MapPath("~/App_Data/");
            string fullpath = Path.Combine(path, "course.json");
            string coursejson = System.IO.File.ReadAllText(fullpath).TrimStart('[').TrimEnd(']');
            Courses course = JsonConvert.DeserializeObject<Courses>(coursejson);

            course.CourseList.Add(obj);
            // Pass the "personlist" object for conversion object to JSON string  
            string jsondata = new JavaScriptSerializer().Serialize(course);

            // Write that JSON to txt file,  
            System.IO.File.WriteAllText(path + "course.json", jsondata);
            TempData["msg"] = "Course is updated successfully.";

            return RedirectToAction("Index");
        }

        [HttpGet]
        public JsonResult GetAllCourses()
        {
            //CourseDetail obj = new CourseDetail();
            //obj.Id = "1";
            //obj.Title = "Title 1";
            //obj.Description = "Title 1";

            //Courses course = new Courses();
            //var courseList = new List<CourseDetail>();
            //courseList.Add(obj);

            //course.CourseList = courseList;
            //// Pass the "personlist" object for conversion object to JSON string  
            //string jsondata = new JavaScriptSerializer().Serialize(course);
            //string path = Server.MapPath("~/App_Data/");
            //string fullpath = Path.Combine(path, "course.json");
            //// Write that JSON to txt file,  
            //System.IO.File.WriteAllText(fullpath, jsondata);


            string path = Server.MapPath("~/App_Data/");
            string fullpath = Path.Combine(path, "course.json");
            string coursejson = System.IO.File.ReadAllText(fullpath).TrimStart('[').TrimEnd(']');
            Courses course = JsonConvert.DeserializeObject<Courses>(coursejson);
            var courseData = course.CourseList;

            return Json(courseData, JsonRequestBehavior.AllowGet);
        }
    }
}