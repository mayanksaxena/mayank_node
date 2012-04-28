
/*
 * GET home page.
 */

exports.index = function(req, res){
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
	
};

exports.login = function(req, res){
	
};