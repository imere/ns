/*这段代码是用来测试localStorage中字符串的编码格式*/
/**
* 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
* UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
* 
* 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
* 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
* 000800 - 00D7FF 
00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
* 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
* 
* 注: Unicode在范围 D800-DFFF 中不存在任何字符
* 
* UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
* 000000 - 00FFFF  两个字节
* 010000 - 10FFFF  四个字节
* 
* @param  {String} str 
* @param  {String} charset utf-8, utf-16
* @return {Number}
*/

function sizeof(str, charset) {
    var strCode = 0,
        charCode;
    charset = charset ? charset.toLowerCase() : '';
    if (charset == 'utf-16' || charset == 'utf16') {
        for (var i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            strCode += charCode < 0xffff ? 2 : 4;
        }
    } else {
        for (var i = 0, len = str.length; i < len; i++) {
            charCode = str.charCodeAt(i);
            strCode += (charCode < 0x007f && 1) || (charCode < 0x07ff && 2) || (charCode < 0xffff && 3) || 4;
        }
    }
    return strCode / 1024 / 1024 / 2;
}
/*测试localStorage中字符串的编码格式结束*/

function storage(type, key, value) {
    var val = localStorage.getItem(key);
    switch (type) {
        case 'get':
            if (val) {
                return val;
            } else {
                return window.frames[0].postMessage(JSON.stringify({ type: type, key: key }), 'http://localhost:8081');
            }
            break;
        case 'set':
            // if (!val && sizeofLocal() + sizeof(value) > 5) {
            window.frames[0].postMessage(JSON.stringify({ type: type, key: key, value: value }), 'http://localhost:8081');
            // } else {
            //     localStorage.setItem(key, value);
            // }
            break;
        case 'remove':
            if (val) {
                localStorage.removeItem(key);
            } else {
                window.frames[0].postMessage(JSON.stringify({ type: type, key: key }), 'http://localhost:8081');
            }
            break;
        default:
            break;
    }
}

function sizeofLocal() {
    var myStr = '',
        charCode, strCode = 0;
    for (item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            myStr += localStorage.getItem(item);
        }
    }
    for (var i = 0, len = myStr.length; i < len; i++) {
        charCode = myStr.charCodeAt(i);
        strCode += charCode < 0xffff ? 2 : 4;
    }
    return strCode / 1024 / 1024 / 2;
}

var myStr = '';
for (var i = 0; i < 1024 * 1200; i++) {
    myStr += 1 + '12' + '啦';
}
$("#test").on('load', function(argument) {
      window.frames[0].postMessage(JSON.stringify({ type: "set", key: "zhijia", value: 123 }), 'http://localhost:8081');
    // document.querySelector(".set").onclick = function() {
    //     storage("set", "yoyo", myStr);
    // }

    // document.querySelector(".get").onclick = function() {
    //     alert(1);
    //     storage("get", "yoyo");
    //     window.addEventListener('message', function(e) {
    //         window.myStorage = e.data;
    //     })
    // }

    // document.querySelector(".remove").onclick = function() {
    //     storage("remove", "yoyo");
    // }
})
