// ==UserScript==
// @name         ȥ�����ķ���Ļ��з��Ϳո�
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ljhOfGithub
// @match        fanyi.youdao.com
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var button = document.createElement("button"); //����һ����ť
    var host = window.location.host;
    button.textContent = "��ʽ��"; //��ť����
    button.style.width = "109px"; //��ť����
    button.style.height = "38px"; //��ť�߶�
    button.style.align = "center"; //�ı�����
    button.style.color = "white"; //��ť������ɫ
    button.style.background = "#e33e33"; //��ť��ɫ
    button.style.border = "1px solid #e33e33"; //�߿�����
    button.style.borderRadius = "4px"; //��ť�ĸ��ǻ���
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
        setTimeout(function(){
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
        for (var i=0;i<txt.length;i++)
        {
            if(txt.indexOf("\n")||txt.indexOf(" "))
            {
                txt = txt.replace("\n","");
                txt = txt.replace(" ","");
            }
        }
        document.getElementById(id).value = txt;
        },100)

    }
    button.addEventListener("click", clickBotton)

})();
