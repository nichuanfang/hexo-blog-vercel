$(document).ready(function(){if(document.querySelector(".show-culture-list")){var t=300;var a=200;var r=1;var n=12;var d="https://api.jaychou.site/trakt/show";var i="https://image.tmdb.org/t/p/w116_and_h174_face";var o="";if(sessionStorage.getItem("show_init_data")){o=sessionStorage.getItem("show_init_data");sessionStorage.removeItem("show_init_data")}var s=null;data_ended=false;var e=document.querySelector(".show-culture-list");function c(){document.getElementById("loading").style.display="block"}function l(){document.getElementById("loading").style.display="none"}function g(e){var t=parseFloat(e)/2;if(t>4.3){t=5}var a=parseInt(t);var r=t-a;var n=5-a-Math.ceil(r);var d="";var i="";for(var o=0;o<a;o++){d+="★"}for(var o=0;o<r;o++){d+="☆"}for(var o=0;o<n;o++){i+="☆"}return[d,i]}function u(e,t){var a=d+"?page="+e+"&page_size="+t;fetch(a).then(function(e){return e.json()}).then(function(e){if(e["data"]["data"].length===0){l();data_ended=true}m(e,i);l()}).catch(function(e){console.error("Error:",e)})}function m(e,f){var t=e["data"]["data"];var p=document.querySelector(".show-culture-list");t.forEach(function(e){var t=document.createElement("div");t.classList.add("media");var a="/culture/shows/detail/?tmdb_id="+e.show_id;var r=document.createElement("div");r.classList.add("media-cover");if(e.share_link===""){t.style.opacity="0.5"}var n=document.createElement("img");n.setAttribute("src",f+e.cover_image_url);n.setAttribute("data-src",f+e.cover_image_url);n.setAttribute("data-loaded","true");n.setAttribute("lazyload","");n.setAttribute("srcset","/img/loading.gif");r.appendChild(n);var d=document.createElement("a");d.setAttribute("target","_blank");d.classList.add("media-cover-link");d.setAttribute("href",a);d.appendChild(r);t.appendChild(d);var i=document.createElement("div");i.classList.add("media-meta");var o=document.createElement("div");o.classList.add("media-meta-item","title");var s=document.createElement("a");s.classList.add("title-link");s.setAttribute("target","_blank");s.setAttribute("href",a);s.textContent=e.show_name;o.appendChild(s);i.appendChild(o);var c=document.createElement("div");c.classList.add("media-meta-item");var l=document.createElement("span");l.classList.add("author");area=e.area;release_year=e.release_year;l.textContent=area+" "+release_year;c.appendChild(l);var u=document.createElement("span");u.classList.add("star-score");star=g(e.rating)[0];grey_star=g(e.rating)[1];u.textContent=star;var m=document.createElement("span");m.classList.add("grey-star");m.textContent=grey_star;u.appendChild(m);c.appendChild(u);i.appendChild(c);var h=document.createElement("div");h.classList.add("media-meta-item","intro");h.textContent=e.show_description;i.appendChild(h);t.appendChild(i);p.appendChild(t);for(const v of document.querySelectorAll("img[lazyload]")){Fluid.utils.waitElementVisible(v,function(){v.removeAttribute("srcset");v.removeAttribute("lazyload")},CONFIG.lazyload.offset_factor)}})}function h(e){return new Promise(function(e,t){setTimeout(function(){e({data:"模拟的异步数据"})},0)})}if(o!==""){h("https://api.example.com/data").then(function(e){data=JSON.parse(o);if(data["data"]["data"].length===0){l();data_ended=true}m(data,i)}).catch(function(e){console.error("Error:",e)})}else{fetch(d+"?page="+r+"&page_size="+n).then(function(e){return e.json()}).then(function(e){if(e["data"]["data"].length===0){l();data_ended=true}m(e,i)}).catch(function(e){console.error("Error:",e)})}window.addEventListener("scroll",function(){if(data_ended){l();return}clearTimeout(s);var e=document.documentElement.scrollHeight-window.innerHeight-window.scrollY;if(e<=a){c();s=setTimeout(function(){r++;if(!data_ended){u(r,n)}},t)}})}});