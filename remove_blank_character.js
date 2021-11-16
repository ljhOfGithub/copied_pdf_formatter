// ==UserScript==
// @name         去除论文翻译的换行符和空格
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ljhOfGithub
// @match        fanyi.youdao.com
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
function blank(){
    'use strict';
   var button = document.createElement("button"); //创建一个按钮
   var host = window.location.host;
   button.textContent = "格式化"; //按钮内容
   button.style.width = "109px"; //按钮宽度
   button.style.height = "38px"; //按钮高度
   button.style.align = "center"; //文本居中
   button.style.color = "white"; //按钮文字颜色
   button.style.background = "#e33e33"; //按钮底色
   button.style.border = "1px solid #e33e33"; //边框属性
   button.style.borderRadius = "4px"; //按钮四个角弧度
   if( host == "fanyi.youdao.com" )
   {
   document.getElementsByClassName('fanyi__operations--left')[0].appendChild(button);
   }
   if( host == "translate.google.cn")
   {
   document.getElementsByClassName('hgbeOc')[0].appendChild(button);
   }
   if( host == "fanyi.baidu.com" )
   {
   document.getElementsByClassName('trans-operation clearfix')[0].appendChild(button);
   }
   function clickBotton(){
       var txt = "";
       var id = "";
       var classname = "";
       var host = window.location.host;
       if( host == "fanyi.baidu.com" )
       {
           id = "baidu_translate_input";
       }
       if( host == "fanyi.youdao.com" )
       {
           id = "inputOriginal";
       }
       if( host == "translate.google.cn" || host == "translate.google.com" )
       {
           classname = "er8xn";

       }
       txt = document.getElementById(id).value || document.getElementsByClassName('er8xn')[0].value;
       //for (var i=0;i<txt.length;i++)
       //{
           //if(txt.indexOf("\n"))
           //if(txt.indexOf("\n")||txt.indexOf(" "))
           //{
               //txt = txt.replace("\n"," ");
               //txt = txt.replace(".",". \n");
               //txt = txt.replace(" ","");
           //}
       //}

       txt = txt.replace(/\n/g,' ');
       txt = txt.replace(/\./g,".\n");
       //txt = txt.replace(/\n\s/g,"\n");
       let t=document.getElementById(id);
       let evt = document.createEvent('HTMLEvents');
       evt.initEvent('input',true,true);
       t.value = txt;
       t.dispatchEvent(evt);
   }
   button.addEventListener("click", clickBotton);
}
(function() {
   blank();
})();
