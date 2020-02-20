﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PWA_WEB.Models
{
    public class CourseDetail
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class Courses
    {
        public List<CourseDetail> CourseList { get; set; }
    }
}