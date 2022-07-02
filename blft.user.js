// ==UserScript==
// @name         显示b站关注时间
// @namespace    https://github.com/IOMisaka/bilibilifollowtime
// @version      1.0
// @description  在空间页面显示关注时间
// @author       IOMisaka
// @match        https://space.bilibili.com/*
// @grant        none
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// ==/UserScript==

/* jshint esversion: 6 */

(function() {
    'use strict';
    let div = document.createElement("div");
    div.title = "点击关闭";
    div.style.border = "2px solid";
    div.style.borderColor = "grey";
    div.style.backgroundColor = "rgb(255 38 100)";
    div.style.color = "white";
    div.style.borderRadius = "2px";
    div.style.right = "0px";
    div.style.bottom = "0px";
    div.style.position = "fixed";
    div.style.zIndex = 1111;

    let txt = document.createElement("span");
    txt.innerHTML = "";
    div.appendChild(txt);

    let close = document.createElement("span");
    close.innerText = "Loading...";
    close.onclick = ()=>{div.style.setProperty('display','none');};
    close.style.cursor = "pointer";
    div.appendChild(close);

    document.querySelector("body").appendChild(div);

    let uid = location.href.match(/com\/(\d*)[\/\?]*/)[1];
    fetch("https://api.bilibili.com/x/space/acc/relation?mid="+uid, {"credentials": "include"}).then(res => res.json()).then(follow => {
        if(follow.data.relation.mid === undefined || follow.data.relation.mid==0){
            txt.parentNode.style.setProperty('display','none');
        }else{
            fetch("https://api.bilibili.com/x/space/acc/info?mid="+uid,{"credentials":"include"}).then(res => res.json()).then(user =>{
                txt.innerHTML = "您关注<strong style='color:#1affff'>"+user.data.name+"</strong>的时间为："+ new Date(follow.data.relation.mtime * 1000).toLocaleString();
                close.innerText = "❎";
            });
        }
    });
})();