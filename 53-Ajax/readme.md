
# 1. Ajax

    AJAX最大的优点是在不重新加载整个页面的情况下,可以与服务器交换数据并更新部分网页内容。

    通过在后台与服务器进行少量数据交换,AJAX可以使网页实现异步更新.


    请求方式:
        GET
        POST
        HEAD
        DELETE
        PUT

# 2. 原生的Ajax请求步骤

    XHLHttpRequest()是AJAX的基础,用于在后台与服务器交换数据。

        1. let xhr = new XMLHttpRequest()  

    tips:   var xhr = new ActiveObject('Microsoft.XMLHTTP');


    2.  向服务器发送请求
        xhr.open('GET','ajax_info.txt',true);
        xhr.send();


## 2.1. open()方法

    xhr.open(method,url,async)  
        method: 请求的类型：GET 或 post
        url:    文件在服务器上的位置
        async:  true(异步) false(同步)

    xhr.send()  将请求发送到服务器
        send(string) string仅用于POST请求。


    1.1 有可能得到的是缓存的结果,可以加一个随机数,或者时间戳
        xhr.open('GET','https://www.baidu.com?t='+Math.random(),true);
        xhr.send();

    1.2 通过GET方法发送信息,向URL添加信息:
        xhr.open('GET','https://www.baidu.com?name=kyrie&age=26',true);
        xhr.send();

## 2.2. 服务器响应

    获取来自服务器的响应,使用XMLHttpRequest对象的 responseText 或 responseXML

    responseText        获得字符串形式的响应数据
    responseXML         获得XML形式的响应数据
    

    JSON.stringify()   将一个javascript值转换为一个JSON字符串
    JSON.parse()       解析JSON字符串,构造由字符串描述的JavaScript值或对象


## 2.3. onreadystatechange事件

    当请求被发送到服务器时,每当readyState改变时,就会触发onreadystatechange事件。

    readyState属性存有XMLHttpRequest的状态信息。

    onreadystatechange      每当readyState属性改变时,就会调用该函数
    readyState              存有XMLHttpRequest的状态 0-4
                                0   请求未初始化
                                1   服务器连接已建立
                                2   请求已接收
                                3   请求处理中
                                4   请求已完成,且响应已就绪
    
    status                     200:'OK'
                               404:'未找到页面'


## 2.4. HTTP Header的Content-Type

    application/x-www-form-urlencoded: 数据被编码为名称/值对
    multipart/form-date: 数据被编码为一条消息
    text/plain:数据以纯文本形式(text/json/xml/html)进行编码,其中不含任何控件或格式字符。



    serialize() 


    处理跨域问题:
    header({'Access-Control-Allow-Origin':'*'})

# 3. cssText

    element.style.cssText   返回元素的行内样式(只能返回行内样式)

    element.style.cssText = style 
    设置元素的行内样式, 如果元素设置了行内样式,原有的所有样式都会被覆盖,只生效设置过的样式,外部样式除外。


# 4. XHR 二级事件

    