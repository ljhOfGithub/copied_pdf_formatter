// ==UserScript==
// @name         pdf论文formatter
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
       //去掉论文[]的注释索引
       //txt = txt.replace(/\[[0-9]*\]/g, "");
       //txt = txt.replace(/\[[1-9]{1,2}\, [1-9]{1,2}\]/g,"")
       txt = txt.replace(/[\uac00-\ud7ff]/g,"'!!'")//处理韩文乱码
       txt = txt.replace(/i\.e\./g,'for example');//替换i.e.
       txt = txt.replace(/e\.g\./g,'namely');//替换e.g.
       txt = txt.replace(/\n/g,' ');//去掉pdf复制产生的换行符
       txt = txt.replace(/\./g,".\n");//自动分行，但是如果是http开头的不能进行分行，可以用正则表达式搜索所有的网址，针对非网址进行分行
       txt = txt.replace(/\?/g,"?\n");//问号分行
       for (let i=0;i<txt.length;i++)//去掉论文的-（用于英文单词的跨行连接）和python源代码中的注释
       {
           if(txt.indexOf("")||txt.indexOf("#")||txt.indexOf("///")||txt.indexOf("//"))
           {
               //txt = txt.replace("\n"," ");
               //txt = txt.replace(".",". \n");
               //txt = txt.replace(" ","");
               txt = txt.replace("","");
               txt = txt.replace("#","");
               if(txt.indexOf('///')==1){
               txt = txt.replace("///","");
               continue;
               }
               txt = txt.replace("//","");
           }

       }
       //判断数字串的正则表达式
       let numReg = /^[0-9]*$/
       //判断特殊符号的正则表达式
       let symReg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]$/
       let debugMode = false
       for (let i=0;i<txt.length;i++)
       {
           console.log(txt[i+1])
           console.log(numReg.test(txt[i+1]))
           if(txt[i] == '\n' && numReg.test(txt[i+1]) || txt[i] == '\n' && symReg.test(txt[i+1]))
           {
                if(debugMode == true){
                    //console.log(txt[i])
                    //console.log(txt.indexOf(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d{,5}$/))
                    continue;
                }
               console.log('need to delete enter')
               //txt = txt.replace('\n','')
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
       }
       //处理"et al."的回车
       for (let i=0;i<txt.length;i++)
       {
           if(txt[i] == '\n' && txt[i-1] == '.' && txt[i-2] == 'l' && txt[i-3] == 'a' )
           {
                if(debugMode == true){
                    continue;
                }
               console.log('et al.')
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
       }
       //处理“RQ.1”的回车
       for (let i=0;i<txt.length;i++)
       {
           if(txt[i] == '\n' && txt[i-1] == '.' && numReg.test(txt[i-2]) && txt[i-3] == 'Q' && txt[i-4] == 'R' )
           {
                if(debugMode == true){
                    continue;
                }
               console.log('et al.')
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
       }
       //处理figure.3或者fig.3
       for (let i=0;i<txt.length;i++)
       {
           if(txt[i] == '\n' && txt[i-1] == '.' && txt[i-2] == 'g' && txt[i-3] == 'i'
              || txt[i] == '\n' && txt[i-1] == '.' && txt[i-2] == 'e' && txt[i-3] == 'r' && txt[i-4] == 'u' )
           {
                if(debugMode == true){
                    //console.log(txt[i])
                    //console.log(txt.indexOf(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d{,5}$/))
                    continue;
                }
               console.log('need to delete enter')
               //txt = txt.replace('\n','')
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }

       }
       //处理etherscan.io等网址，处理.et
       for (let i=0;i<txt.length;i++)
       {
           if(txt[i] == '\n' && txt[i+1] == 'i' && txt[i+2] == 'o'
              || txt[i] == '\n' && txt[i+1] == 'c' && txt[i+2] == 'o' && txt[i+3] == 'm'
              || txt[i] == '\n' && txt[i+1] == 'c' && txt[i+2] == 'n'
              || txt[i] == '\n' && txt[i+1] == '.' && txt[i+2] == 't' && txt[i+3] == 'e'
              || txt[i] == '\n' && txt[i+1] == 'o' && txt[i+2] == 'r' && txt[i+3] == 'g'
              || txt[i] == '\n' && txt[i+1] == 'h' && txt[i+2] == 't' && txt[i+3] == 'm' && txt[i+4] == 'l'
              || txt[i] == '\n' && txt[i+1] == 'g' && txt[i+2] == 'i' && txt[i+3] == 't' && txt[i+4] == 'h' && txt[i+5] == 'u' && txt[i+6] == 'b'
              )
           {
                if(debugMode == true){
                    //console.log(txt[i])
                    //console.log(txt.indexOf(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d{,5}$/))
                    continue;
                }
               console.log('need to delete enter')
               //txt = txt.replace('\n','')
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);//通过去掉新加的换行符进行回退
           }

       }

       //TODO:弄清楚为什么产生多余的空格
       for (let i=0;i<txt.length;i++)
       {
           if(txt[i] == '\n' && txt[i+1] == ' ')//自动换行后新的行第一个字符总为空格
           {
               //console.log('need to delete the space')
               txt = txt.substr(0,i+1) + txt.substr(i+2,txt.length);
           }
       }
       // 如果某行的字母少于某个阈值则删除前面的换行符
       for (let i=0;i<txt.length;i++)
       {
           if(txt[i] == '\n' && txt[i+2] == '\n')
           {
               //txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
               txt = txt.substr(0,i+2) + txt.substr(i+3,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+3] == '\n')
           {
               //txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
               txt = txt.substr(0,i+3) + txt.substr(i+4,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+4] == '\n')
           {
               //txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
               txt = txt.substr(0,i+4) + txt.substr(i+5,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+5] == '\n')
           {
               //txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
               txt = txt.substr(0,i+5) + txt.substr(i+6,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+6] == '\n')
           {
               //txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
               txt = txt.substr(0,i+6) + txt.substr(i+7,txt.length);
           }
           if(txt[i] == ' ' && txt[i+1] == '.'){
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
           if(txt[i] == '\n' && txt[i+3] == '/')//网址的/字符
           {
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+4] == '/')
           {
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+5] == '/')
           {
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
           else if(txt[i] == '\n' && txt[i+6] == '/')
           {
               txt = txt.substr(0,i) + txt.substr(i+1,txt.length);
           }
       }

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
