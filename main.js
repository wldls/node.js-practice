var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request, response){
	var _url = request.url;		
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;

	if(pathname === '/'){
		if(queryData.id === undefined){
			fs.readdir('./data', (err, files) => {
				var title = 'Welcome';
				var description = 'Hello, Node.js';
				var list = template.list(files);
				var body = `
				<h2>${title}</h2>
				<p>${description}</p>
				`;
				var control = '<a href="/create">create</a>';	
				var html = template.html(title, list, body, control);

				response.writeHead(200);
				response.end(html);
			});
		}else{
			fs.readdir('./data', (err, files) => {
				var filteredId = path.parse(queryData.id).base;
				fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
					var title = queryData.id;
					var sanitizedTitle = sanitizeHtml(title);
					var sanitizedDesc = sanitizeHtml(description, {allowedTags:['h1']});
					var list = template.list(files);
					var body = `
					<h2>${sanitizedTitle}</h2>
					<p>${sanitizedDesc}</p>
					`;
					var control = `
					<a href="/create">create</a>
					<a href="/update?id=${sanitizedTitle}">update</a>
					<form action="delete_process" method="post">
						<input type="hidden" name="id" value="${sanitizedDesc}">
						<input type="submit" value="delete">
					</form>
					`;
					var html = template.html(sanitizedTitle, list, body, control);
	
					response.writeHead(200);
					response.end(html);
				});
			});
		}
	}else if(pathname === '/create'){
		fs.readdir('./data', (err, files) => {
			var list = template.list(files);
			var title = 'WEB - create';
			var body = `
			<form action="/create_process" method="post">
				<p><input type="text" name="title" placeholder="title"></p>
				<p>
					<textarea name="description" placeholder="description"></textarea>
				</p>
				<p>
					<input type="submit">
				</p>
			</form>
			`;

			var html = template.html(title, list, body);

			response.writeHead(200);
			response.end(html);
		});
	}else if(pathname === '/create_process'){
		// request : 요청할 때 웹브라우저가 보낸 정보
		// response 응답할 때 우리가 웹 브라우저에 전송 할 정보
		var body = '';
		request.on('data', (data) => {
			// 웹브라우저가 post방식으로 데이터를 전송할 때 데이터가 많을 경우를 대비
			body += data;
		});
		
		request.on('end', () => {
			var post = qs.parse(body);
			var title = post.title;
			var desc = post.description;

			fs.writeFile(`data/${title}`, desc, 'utf8', (err) => {
				if(err) throw err;
				console.log('The file has been saved!');

				response.writeHead(302, {Location: `/?id=${title}`});
				response.end();
			});
		});
	}else if(pathname === '/update'){
		fs.readdir('./data', (err, files) => {
			fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
				var title = queryData.id;
				var list = template.list(files);
				var body = `
				<form action="/update_process" method="post">
					<input type="hidden" name="id" value="${title}">
					<p><input type="text" name="title" placeholder="title" value="${title}"></p>
					<p>
						<textarea name="description" placeholder="description">${description}</textarea>
					</p>
					<p>
						<input type="submit">
					</p>
				</form>
				`;
				var control = `
				<a href="/create">create</a>
				<a href="/update?id=${title}">update</a>
				`;
				var html = template.html(title, list, body, control);

				response.writeHead(200);
				response.end(html);
			});
		});
	}else if(pathname === '/update_process'){
		var body = '';
		request.on('data', (data) => {
			body += data;
		});
		
		request.on('end', () => {
			var post = qs.parse(body);
			var id = post.id;
			var title = post.title;
			var desc = post.description;

			fs.rename(`data/${id}`, `data/${title}`, (err) => {
				console.log(err);

				fs.writeFile(`data/${title}`, desc, 'utf8', (err) => {
					if(err) throw err;
					console.log('The file has been saved!');
	
					response.writeHead(302, {Location: `/?id=${title}`});
					response.end();
				});
			});
		});
	}else if(pathname === '/delete_process'){
		var body = '';
		request.on('data', (data) => {
			body += data;
		});
		
		request.on('end', () => {
			var post = qs.parse(body);
			var id = post.id;

			fs.unlink(`data/${id}`, (err) => {				
				response.writeHead(302, {Location: `/`});
				response.end();
			});
		});
	}else{
		response.writeHead(404);
		response.end('Not found');
	}		
});
app.listen(3000);