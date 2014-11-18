// chrome.bookmarks.getRecent(10, function (sites) {
// 	var dl = document.getElementsByTagName('dl')[0];
// 	for(var i in sites){
// 		dl.innerHTML += '<dd><img src="chrome://favicon/'+ sites[i].url +'" class="favicon"><a href="'+ sites[i].url +'">'+ sites[i].title +'</a></dd>';
// 	}
// });

chrome.topSites.get(function(sites) {
	var dl = document.getElementsByTagName('dl')[0];
		sites = sites.slice(0,10);
	for(var i in sites){
		dl.innerHTML += '<dd><img src="chrome://favicon/'+ sites[i].url +'" class="favicon"><a href="'+ sites[i].url +'">'+ sites[i].title +'</a></dd>';
	}
});

chrome.bookmarks.getTree(function(root){
	var root = root[0].children,
		other = root[1].children;
	var created = false,
		startpage = [];
	for(var i in other){
		var title = other[i].title, 
			url = other[i].url;
		if(title == 'Start Page' && !url){
			created = true;
			startpage = other[i].children;
		}
	}
	if(!created){
		chrome.bookmarks.create({'title': 'Start Page'}, function(newFolder){
			console.log('Initial "Start Page" folder!');
		});
	}
	for(var i in startpage){
		if(!startpage[i].url){
			var folder = startpage[i],
				sites = folder.children,
				sitesView = '';
			for(var i in sites){
				sitesView += '<dd><img src="chrome://favicon/'+ sites[i].url +'" class="favicon"><a href="'+ sites[i].url +'">'+ sites[i].title +'</a></dd>';
			}
			var section = document.getElementsByTagName('section')[0];
			section.innerHTML += '<dl><dt>'+ folder.title +'</dt>'+ sitesView +'</dl>';
		}
	}
});