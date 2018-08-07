/**
 * @fileOverview 跨域高度自适应方案
 */

// 默认iframe高度
const MIN_HEIGHT = 1000;
const isFrame = window.self === window.top;


/***
 *  初始化函数
 *   
 */

function init( {minHeight = MIN_HEIGHT,  crossDomainUrl} ) {
    // 若是非iframe页面,  直接返回
    if (isFrame) {
        return;
    }

    if (!crossDomainUrl) {
        console.log('缺少跨域域名');
        return;
    }


    createCrossDomainFrame();
    
    window.onscroll = function () {
       
        if (document.documentElement.scrollTop > 0) {
            setHash(crossDomainUrl);
        }
    }
}

/**
 * 创建parent同源iframe
 * 用于高度自适应通信
 */
function createCrossDomainFrame(url) {
    let iframe;
    try {  
        iframe = document.createElement('<iframe name="ifr"></iframe>');  
    }
    catch(e) { 
        iframe = document.createElement('iframe');  
        iframe.name = 'ifr';
    }

    iframe.id =  'iframeA';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.display = 'none';

    document.body.appendChild(iframe);
}

/**
 * 设置子页面的hash值
 */
function setHash(url) {
    // 获取自身高度
    const hashH = Math.max(document.documentElement.scrollHeight, MIN_HEIGHT); 
    // 将高度作为参数传递
    document.getElementById("iframeA").src = url + "#" + hashH;

}



export default {
    init: init
}