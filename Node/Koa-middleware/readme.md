# Koa-views

	koa-views对需要进行视图模板渲染的应用是个不可缺少的中间件,支持ejs.
	
```js
// Demo

const Koa = require('koa');
const Router = require('koa-router');
const server = new Koa();
const views = require('koa-views');
const router = new Router();
const path = require('path');

// 1
server.use(views(path.join(__dirname,'views'),{
	extension:'ejs'
})) 
// 2
server.use(views(path.join(__dirname,'views'),{
	map:{html:'ejs'}
}))

// 上面两种使用ejs模版写法都可以

router.get('/user',async (ctx,next)=>{
	await ctx.render('user',{
		user:'Kyrie Irving'
	})
})
server.use(router.routes()).use(router.allowedMethods());
```

# Koa-router

	
```js
// 使用koa-router 的 Demo

const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();
const server = new Koa();

router.get('/',(ctx,next) => {
	ctx.body = 'Hello Koa';
})

router.get('/news',(ctx,next) => {
	ctx.body = 'news page';
})

server.use(router.routes());	// 启动路由
server.use(router.allowedMethods());

server.listen(3000,() => {
	console.log('server starting at port 3000');
})


// 使用koa-router 获取get请求的参数,可以通过request或者ctx上下文中获取, 以下demo省略部分代码:
router.get('/newscontent',(ctx,next) => {
	let url = ctx.url;
	// 从request中获取get请求的参数
	let request = ctx.request;
	let req_query = request.query;
	let req_querystring = request.querystring;
	
	// 从ctx上下文中获取get请求参数
	let ctx_query = ctx.query;
	let ctx_querystring = ctx.querystring;
	ctx.body = {
		url,
		req_query,
		req_querystring,
		ctx_query,
		ctx_querystring
	}
});

// http://localhost:3000/newscontent?title=kyrie&page=3 请求的地址 
/*
output:
{"url":"/newscontent?title=kyrie&page=3",
"req_query":{"title":"kyrie","page":"3"},
"req_querystring":"title=kyrie&page=3",
"ctx_query":{"title":"kyrie","page":"3"},
"ctx_querystring":"title=kyrie&page=3"}


ctx.query是已经序列好的参数对象,而ctx.querystring是请求的字符串形式
*/


// 获取动态路由的参数
router.get("/news/page/:page",(ctx,next)=>{
	let number = ctx.params.page;
	console.log(ctx.params);	// 返回的是一个对象  {page:3}
	ctx.body = `这是新闻页面${number}页`;
})
```

# Koa-bodyparser

	对于Post请求的处理,koa-bodyparser中间件可以把koa上下文的formData数据解析到ctx.request.body中
```js
// Demo  Koa使用原生Node获取post的请求数据
const Koa = require('koa');
const server = new Koa();
const Router = require('koa-router');
const router = new Router();

router.get('/',function(ctx,next){
	let html = 
		`<form method='POST' action='/login'>
			<p>姓名: <input name='user'></p>
			<p>年龄: <input name='age'></p>
			<button type='submit'>提交</button>
		</form>`
	ctx.body = html;
})
function postData(ctx){
	return new Promise((resolve,reject)=>{
		try{
			let data = "";
			ctx.req.on('data',(chunk) => {
				data += chunk;
			})
			ctx.req.on('end',()=>{
				let body = formData(data);
				resolve(body);
			})
		}catch(err){
			reject(err);
		}
	})
}

/*
@param str user=%E9%87%91%E5%BA%B7&age=28
@return obj {user,age}
*/
function formData(str){
	let temp = str.split("&");	// ['user=%E9%87%91%E5%BA%B7','age=28']
	let obj = {};
	for(let item of temp.values() ){
		console.log(item);
		let key = item.split('=')[0];
		let value = decodeURIComponent( item.split('=')[1] );	// 传递中文时会乱码，所以这里需要做解码处理
		obj[key] = value;
	}
	return obj;
}

router.post('/login',async (ctx,next)=>{
	let data = await postData(ctx);
	 ctx.body = data;
})

server.use(router.routes())
server.use(router.allowedMethods());

server.listen(3000,()=>{
	console.log('server starting at port 3000');
});


// 使用了 koa-bodyparser后,解析post传递的参数就很简单,
router.post('/login',async (ctx,next)=>{
	let data  = ctx.request.body;
	console.log(data);
	 ctx.body = data;
})
```

# Koa-static

	koa-static静态资源中间件的功能，一个http请求访问web服务静态资源,一般响应结果有三种情况
		访问文本,例如js css png jpg gif
		访问静态目录
		找不到资源,抛出404错误
```js
const Koa = require('Koa');
const server = new Koa();
const staticPublic = require('koa-static');
const path = require('path');

server.use( staticPublic(path.join(__dirname,'public')) );

/*
这个时候启动app就可以解析public下面的静态文件了；
*/
```
	koa-compress koa-mount
	
# Koa-cookie

	设置签名的Cookie密钥。 server.keys = ['i am a newer secret']; 
	ctx.cookies.set(name,value,{signed:true});
	
```js
// Demo 
const Koa = require('koa');
const server = new Koa();
const Router = require('koa-router');
const router = new Router();
server.keys = ['keyboard'];

router.get('/user/:name',async ctx => {
	let name = ctx.params.name;
	ctx.state = {
		name
	}
	ctx.cookies.set('name',name,{
		maxAge:1000*60*60*24,
		path:'/',	// 路径,默认是 /
		htttOnly:true,	// 服务器可以访问cookie,不能通过document.cookie操作cookie
		overwrite:false,	// 布尔值,表示是否覆盖以前设置的同名的cookie
		signed:true,
		secure:false   //  安全 cookie   默认false，设置成true表示只有 https可以访问
	});
	let visit = ctx.cookies.get('name',{
		signed:true
	});
	if(!visit){
		ctx.body = 'Visit first time!';
	}else{
		ctx.body = `Welcome back, ${name}! `
	}
})
server.use(router.routes()).use(router.allowedMethods());

server.listen(3000,() => {
	console.log('server starting port 3000');
})
```

# Koa-Session

	session是另一种可以记录客户状态的机制,不同的是Cookie保存在客户端浏览器中,而session保存在服务器上。
	
	
	The cookie name is controlled by the key option,which defualts to 'koa:sess'.All other options are passed to
	ctx.cookies.get() and ctx.cookies.set() allowing you to control security,domain,path,and signing aomong other settings.
	
	session和cookie的比较：
	当浏览器访问服务器并发送第一次请求时，服务端会创建一个session对象，生成一个类似 key,value的键值对，然后将key(cookie)返回到浏览器，
	浏览器下次再次访问时，携带key(cookie)，找到对应的session。客户信息都保存在session中。
	1. cookie数据存放在客户的浏览器上，session数据放在服务器上
	2. cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗
	3. 单个cookie保存的数据不能超过4k，很多浏览器都限制一个战斗最多保存20个cookie。

```js
const Koa = require('Koa');
const Router = require('koa-router');
const session = require('koa-session');
const server = new Koa();
const router = new Router();
server.keys = ['some secret hurr'];

const CONFIG = {
	key:'koa:sess',		// cookie key (default is koa:sess)
	maxAge:86400000,	// cookie的过期时间,(default is 1 days)
	autoCommit:true,	// automatically commit headers (default true)
	overwrite:true,	// 
	httpOnly:true,
	signed:true,
	rolling:false,	// 
	renew:false 	// renew session when session is nearly expired,so we can always keep user logged in (default false)
}

router.get('/session',async ctx => {
	if(ctx.path === '/favicon.ico') return;
	let n = ctx.session.views || 0;
	ctx.session.views = ++n;
	ctx.body = n + 'views';
})
server.use(session(CONFIG,server));
server.use(router.routes()).use(router.allowedMethods());
server.listen(3000,()=>{
	console.log('server start at port 3000');
})
```
	To destroy a session simply set it to null:
	this.session = null;
	
# Koa2-cors

	允许设置跨域
```js
// usage

const Koa = require('Koa');
const cors = require('koa2-cors');

const server = new Koa();
server.use(cors());
```
	Options:
	1. origin: Configures the Access-Control-Allow-Origin CORS header. expect a string.
	2. maxAge: Configures the Access-Control-Max-Age CORS header.
	3. credentials: Configures the Access-Control-Allow-Credentials CORS header
	4. allowMethods: Configures the Access-Control-Allow-Methods CORS header.
	
# ctx.state

	Koa中设置全局变量可以通过 ctx.state 变量名 来设置
	
```js
router.use(async ctx => {
	ctx.state = {
		url:'http://www.itying.com',
		userinfo:ctx.session.userinfo,
		prevPage:ctx.request.headers['referer']
	}
})
```

# RESTful API

	RESTful 是目前最流行的API 设计规范，用于web 数据接口的设计。	动词（get） + /宾语（articles）
		GET - Read
		POST - Create
		PUT	- Update
		PATCH - Update
		DELETE - Delete
		
	复数URL
		get/articles 要好于 get/article
	
	避免多级url
	
	状态码必须精确
		1xx 相关信息
		2xx 操作成功
			get:200 ok
			post:201 created
			put:200 ok
			patch:200 ok
			delete:204 no content
		3xx 重定向
		4xx 客户端错误
			400	bad request: 服务器不理解客户端的请求，未做任何处理
			403 forbidden: 用户通过了身份验证,但是不具有访问资源所需的权限
			404 not found: 所请求的资源不存在，或不可用。
			405 method not allowed: 用户已经通过身份验证，但是所用的http方法不在他的权限之内。
		5xx 服务器错误
	
	服务器回应：
		1. 不要返回纯文本 content-type:'application/json'
	
		2. 发生错误时，不要返回200状态码
```js
// get
router.get('/catelist',async ctx => {
	var result = await db.find('articlecate',{});
	ctx.body = {
		result:result
	}
})

// post
router.post('/addcart',async ctx => {
	console.log(ctx.request.body);
	ctx.body = {
		'success':true,
		'message':'增加数据成功'
	}
});

// put
router.put('/editPeopleInfo',async ctx => {
	console.log(ctx.request.body);
	ctx.body = {
		"success":true,
		'message':'修改数据成功'
	}
})

// delete
router.delete('/deleteCart',async ctx => {
	console.log(ctx.query);
	ctx.body = {
		'success':true,
		'message':'删除数据成功'
	}
})
```