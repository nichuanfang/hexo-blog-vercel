$(document).ready(function(){if(document.querySelector(".show-culture-list")){const l=300;const r=200;let e=1;const m=12;const u="https://api.jaychou.site/trakt/show";const p="https://image.tmdb.org/t/p/w116_and_h174_face";let a=sessionStorage.getItem("show_init_data")||"";sessionStorage.removeItem("show_init_data");let n=null;let s=false;const h=document.querySelector(".show-culture-list");function o(){document.getElementById("loading").style.display="block"}function d(){document.getElementById("loading").style.display="none"}function _(t){let e=parseFloat(t)/2;if(e>4.3)e=5;const a=parseInt(e);const n=e-a;const s=5-a-Math.ceil(n);return["★".repeat(a)+"☆".repeat(n),"☆".repeat(s)]}function i(t,e){const a=`${u}?page=${t}&page_size=${e}`;return fetch(a).then(t=>t.json()).then(t=>{if(t["data"]["data"].length===0){d();s=true}else{c(t,p);d()}}).catch(t=>console.error("Error:",t))}function c(t,f){const e=t["data"]["data"];const a=document.querySelector(".show-culture-list");const g=document.createDocumentFragment();e.forEach(t=>{const e=document.createElement("div");e.classList.add("media");if(t.share_link==="")e.style.opacity="0.5";const a=document.createElement("div");a.classList.add("media-cover");const n=document.createElement("img");n.setAttribute("src",f+t.cover_image_url);n.setAttribute("data-src",f+t.cover_image_url);n.setAttribute("data-loaded","true");n.setAttribute("lazyload","");n.setAttribute("srcset","/img/loading.gif");a.appendChild(n);const s=document.createElement("a");s.setAttribute("target","_blank");s.classList.add("media-cover-link");s.setAttribute("href",`/culture/shows/detail/?tmdb_id=${t.show_id}`);s.appendChild(a);e.appendChild(s);const o=document.createElement("div");o.classList.add("media-meta");const d=document.createElement("div");d.classList.add("media-meta-item","title");const i=document.createElement("a");i.classList.add("title-link");i.setAttribute("target","_blank");i.setAttribute("href",`/culture/shows/detail/?tmdb_id=${t.show_id}`);i.textContent=t.show_name;d.appendChild(i);o.appendChild(d);const c=document.createElement("div");c.classList.add("media-meta-item");const l=document.createElement("span");l.classList.add("author");l.textContent=`${t.area} ${t.release_year}`;c.appendChild(l);const r=document.createElement("span");r.classList.add("star-score");const[m,u]=_(t.rating);r.textContent=m;const p=document.createElement("span");p.classList.add("grey-star");p.textContent=u;r.appendChild(p);c.appendChild(r);o.appendChild(c);const h=document.createElement("div");h.classList.add("media-meta-item","intro");h.textContent=t.show_description;o.appendChild(h);e.appendChild(o);g.appendChild(e)});a.appendChild(g);document.querySelectorAll("img[lazyload]").forEach(t=>{Fluid.utils.waitElementVisible(t,()=>{t.removeAttribute("srcset");t.removeAttribute("lazyload")},CONFIG.lazyload.offset_factor)})}function t(t){return new Promise((t,e)=>{setTimeout(()=>t({data:"模拟的异步数据"}),0)})}if(a!==""){t("https://api.example.com/data").then(t=>{const e=JSON.parse(a);if(e["data"]["data"].length===0){d();s=true}else{c(e,p)}}).catch(t=>console.error("Error:",t))}else{i(e,m)}window.addEventListener("scroll",()=>{if(s){d();return}clearTimeout(n);const t=document.documentElement.scrollHeight-window.innerHeight-window.scrollY;if(t<=r){o();n=setTimeout(()=>{e++;if(!s){i(e,m)}},l)}})}});