module.exports = {
	html : function(title, list, body, control){
		return `
		<!doctype html>
		<html>
		<head>
			<title>WEB2 - ${title}</title>
			<meta charset="utf-8">
		</head>
		<body>
			<h1><a href="/">WEB</a></h1>		
			${list}
			${control}
			${body}
		</body>
		</html>
		`;
	},
	list: function(files){
		var list = '<ul>';
			files.forEach(file => {
				list += `<li><a href="/?id=${file}">${file}</a></li>`
				
			});
			list += '</ul>';
	
		return list;
	}
}

