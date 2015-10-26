this["app"] = this["app"] || {};
this["app"]["templates"] = this["app"]["templates"] || {};

this["app"]["templates"]["view"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"view\">\r\n	<div class=\"content\">\r\n\r\n		<h1>View ID: "
    + alias3(((helper = (helper = helpers.ID || (depth0 != null ? depth0.ID : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ID","hash":{},"data":data}) : helper)))
    + "</h1>\r\n\r\n		<div class=\"internal\">\r\n			<a href=\"/\">Home</a>\r\n			<a href=\"/fruits\">Fruits</a>\r\n			<a href=\"/fruits/banana\">Banana</a>\r\n			<a href=\""
    + alias3(((helper = (helper = helpers.BAD_ROUTE || (depth0 != null ? depth0.BAD_ROUTE : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"BAD_ROUTE","hash":{},"data":data}) : helper)))
    + "\">Error</a>\r\n			<a href=\"?_escaped_fragment_=\" class=\"crawler\">Web Crawler</a>\r\n		</div>\r\n\r\n		<div class=\"external\">\r\n			<a href=\"http://google.ca\">Google</a>\r\n			<a href=\"http://wikipedia.org\">Wikipedia</a>\r\n			<a href=\"http://gskinner.com\">gskinner</a>\r\n		</div>\r\n\r\n	</div>\r\n</div>";
},"useData":true});