$(document).ready($.ajax({
	type: "GET",
	url: "http://api.feedzilla.com/v1/categories.json",
	datatype: "json",
	success: successFunction
	}));

function successFunction(data){
	$("#news").append("<ul id=\"list\"></ul>");
	//data=JSON.parse(data);
	var mx=0;
	$.each(data, function(i, item){
			if(i>0)
				$("#list").append("<li><div id="+i+">"+data[i].display_category_name+"</div></li>");
			if(mx<i)
				mx=i;
			});
	for (var idx=1;idx<=mx;++idx){
		$("#"+idx.toString()).click(function(){
				//console.log($(this).attr("id"));
				var clicked=($(this).attr("id")).toString();
				var no_articles=10;
				$.ajax({
					type: "GET",
					url: "http://api.feedzilla.com/v1/categories/"+($(this).attr("id")).toString()+"/articles.json?count="+no_articles.toString(),
					datatype: "json",
					success: loadArticles
					});
				
				function loadArticles(article){
					//console.log(article.articles[0].title);
					for(var ii=0;ii<no_articles;++ii){	
						$("#"+clicked).append("<div><h4>"+article.articles[ii].title+"</h4><p>"+article.articles[ii].source+"<br />"+article.articles[ii].publish_date+"</p><p>"+article.articles[ii].summary+"<br/> <a href=\""+article.articles[ii].url+"\">"+article.articles[ii].url+"</a></p></div>");						
					}
				}
				});
		}

	$('a').live('click', function(e) {//opens the link in the current target i.e. window
  	var href = e.currentTarget.href;
  	chrome.tabs.getSelected(null,function(tab) {
    	chrome.tabs.update(tab.id, {url: href});
  		});
  	window.close(); // To close the popup.
});
}

