//-----------------------------------------------------------------------
// <copyright file="BaseController.js" company="Cohaesus Projects Ltd">
//     Copyright (c) Cohaesus Projects Ltd. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

// <summary>
//     Initialise a new instance of BaseController.
// </summary>
var BaseController = function(expressInstance) {
	// check if we are instance of BaseController if not return a new instance of BaseController.
	if(false === (this instanceof BaseController)) 
	{
        return new BaseController(expressInstance);
    }
    // we are an instance of BaseController, set the values.
    this.ExpressInstance = expressInstance;
    // Init routes.
    this.Init();
}

// <summary>
//     ProtoType methods and properties for ConfigurationSettings.
// </summary>
BaseController.prototype = {
	
	// <summary>
	//     Initialise the routes.
	// </summary>
	Init : function()
	{

		// every page no matter where
		this.ExpressInstance.all("*", this.PageInit);
		
		// log in verbs
		this.ExpressInstance.get("/", this.Login);
		
		// log in post
		this.ExpressInstance.post("/home", this.LoginPost);
		
		// log out
		this.ExpressInstance.post("/logout", this.Logout);
				
	},
	// <summary>
	//     Page Init, every page load will run this script.
	// </summary>
	PageInit : function(req, res, next){
		// set the rest of the locals
		res.local("layout", "layouts/default");
		res.local("IsAuthenticated", false);
		res.local("ProjectName", "Flush of Fortune");
		res.local("Description", "Administration site.");
		res.local("Author", "");
		res.local("PageName", "");
		res.local("PageTagline", "");
		res.local("CompanyName", "Domestos");
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		// Content for method allows us to pass partials to multiple placeholders in layouts and views.
		res.local("ContentFor", function(section, str) {
			if(res.locals[section] === undefined)
			{
				res.local(section, str);
			}
			else
			{
				res.locals[section] = str;
			}
		});
		next();
	},
	// <summary>
	//     Login get action.
	// </summary>
	Login : function(req, res) {
		res.local("layout", "layouts/default");
		res.local("ProjectName", "My Portal");
		res.local("IsAuthenticated", false);
		res.local("Description", "My Portal");
		res.local("Author", "");
		res.local("PageName", "");
		res.local("PageTagline", "");
		res.local("CompanyName", "Mayank");
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('index', { title: 'Express' })
	},
	// <summary>
	//     Login get action.
	// </summary>
	Logout : function(req, res) {
		
		req.session.user = null;
		res.redirect("/");
	},
	// <summary>
	//     Login post action.
	// </summary>
	LoginPost : function(req, res) {
		res.local("layout", "layouts/default");
		res.local("ProjectName", "My Portal");
		res.local("IsAuthenticated", false);
		res.local("Description", "My Portal");
		res.local("Author", "");
		res.local("PageName", "");
		res.local("PageTagline", "");
		res.local("CompanyName", "Mayank");
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render('home', {username: req.body.username , password:req.body.password})
	},
	// <summary>
	//     User authentication method.
	// </summary>
	Authenticate : function(username, password, callback) {
		//Database connection and call the method of user model user Login.
		//Initialize the model.
		users = BaseController.prototype.users;
		password = crypto.createHash('md5').update(password).digest("hex");
		users.userLogin(username, password, function(data) {
			if(data[0]) {
				process.nextTick(function() {
					callback(data[0]);
				});
			} else {
				process.nextTick(function() {
					callback(null);
				});
			}
			return;
		});
	},
	// <summary>
	//     Authorisation Middleware used by pages that require the user to be authenticated.
	// </summary>
	AuthorisationMiddleware : function()
	{
		return function (req, res, next) 
		{
			if(req.session.user != null) {
				next();
			} else {
				// redirect to login page.console.log(1);
				res.redirect("/login?r=" + req.url);
			}
		};
	},
	// <summary>
	//     Instance of Express.
	// </summary>
	ExpressInstance : null
}

// Replace the module prototype with BaseController.
module.exports = BaseController;
