window.onload = function() {
	var el = document.querySelector('h1')
	document.title = el.textContent + ' by Alejandro Morales'
	var posts = document.querySelectorAll('.post')
	if (posts){
		var req ={};
		for (var i = 0; i <= posts.length; ++i) {
			if (!posts[i]) continue
			var req = new XMLHttpRequest()
			req.open('GET',window.location + 'posts/'+posts[i].dataset.post + '.json', true)
			req.noreq = i
			req.send()
			req.addEventListener('load', function(e){
					var r = JSON.parse(this.responseText)
					for (var j = 0;j <= posts.length;++j) {
						if (!posts[j]) continue
						if (posts[j].dataset.post ==  r.initiator) {
							posts[j].innerText = r.title
						}
					}				
			})
		}
	}
}