using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Pro_Learning.Startup))]
namespace Pro_Learning
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
