using PWA_WEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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


        public JsonResult GetAllCourses()
        {
            List<CourseDetail> courses = new List<CourseDetail>
           {
           new CourseDetail{
                              Id = "1",
                              Title = "Web Development",
                              Description = "Web Development Description"
                              },
           new CourseDetail{
                              Id = "2",
                              Title = "Mobile Development",
                              Description = "Mobile Development Description"
                              },
           new CourseDetail{
                              Id = "3",
                              Title = "Responsive Design",
                              Description = "Responsive Design Description"
                              },
           new CourseDetail{
                              Id = "4",
                              Title = "Responsive Design -4 ",
                              Description = "Responsive Design Description -4"
                              },
           new CourseDetail{
                              Id = "5",
                              Title = "Responsive Design -5",
                              Description = "Responsive Design Description -5"
                              },
           new CourseDetail{
                              Id = "6",
                              Title = "Responsive Design -6 ",
                              Description = "Responsive Design Description -6"
                              },
           new CourseDetail{
                              Id = "7",
                              Title = "Responsive Design -7",
                              Description = "Responsive Design Description -7"
                              },
           new CourseDetail{
                              Id = "8",
                              Title = "Responsive Design -7",
                              Description = "Responsive Design Description -7"
                              },
           new CourseDetail{
                              Id = "9",
                              Title = "Responsive Design -8",
                              Description = "Responsive Design Description -7"
                              },
           };

            return Json(courses, JsonRequestBehavior.AllowGet);
        }
    }
}