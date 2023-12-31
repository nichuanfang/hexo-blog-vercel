$(document).ready(function(){if(document.querySelector("#movie-detail-container")){function e(e){var t=parseFloat(e)/2;if(t>4.3){t=5}var a=parseInt(t);var i=t-a;var s=5-a-Math.ceil(i);var l="";var o="";for(var r=0;r<a;r++){l+="★"}for(var r=0;r<i;r++){l+="☆"}for(var r=0;r<s;r++){o+="☆"}return[l,o]}function l(e){const t=/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;return t.test(e)}var t=window.location.search.split("=")[1];var o={};$.ajax({url:"https://api.jaychou.site/trakt/movie/"+t,type:"GET",dataType:"json",async:false,success:function(e){o=e.data},error:function(e){console.log(e)}});stars=e(o.rating);if(o.share_link==""){target_placeholder="";open_link="#"}else{target_placeholder='target="_blank"';open_link=o.share_link}var s=`
        <div class="movie-detail-media">
        <a target="_blank" class="movie-detail-media-cover-link" href="https://www.themoviedb.org/movie/${o.movie_id}">
            <div class="movie-detail-media-cover" >
                  <img
                            srcset="/img/loading.gif"
                            lazyload
                            src="https://image.tmdb.org/t/p/w440_and_h660_face${o.cover_image_url}"
                            data-loaded="true"
                        />
            </div>
        </a>
        <div class="movie-detail-media-meta">
            <div class="movie-detail-media-meta-item title">
            <a class="title-link" target="_blank" href="https://www.themoviedb.org/movie/${o.movie_id}">${o.movie_name}</a>
            </div>
            <div class="movie-detail-media-meta-item">
            <span class="author">${o.area} ${o.release_year}</span>
            <span class="star-score">${stars[0]}<span class="grey-star">${stars[1]}</span></span>
            <span class="link"><a href="${open_link}" ${target_placeholder}><i class="fas fa-external-link-alt"></i>打开</a></span>
            <span class="copy"><a href="#"><i class="fas fa-copy"></i>复制</a></span>
            <span class="edit"><a href="#"><i class="fas fa-edit"></i>更新</a></span>
            </div>
            <div class="movie-detail-media-meta-item intro-title">剧情简介</div>
            <div class="movie-detail-media-meta-item intro">
            ${o.movie_description}
            </div>
        </div>
        </div>
    `;var r=document.getElementById("movie-detail-container");r.innerHTML=s;for(const m of document.querySelectorAll("img[lazyload]")){Fluid.utils.waitElementVisible(m,function(){m.removeAttribute("srcset");m.removeAttribute("lazyload")},CONFIG.lazyload.offset_factor)}const d=document.querySelector(".link a");var n=document.querySelector(".movie-detail-media-meta-item .copy a");if(d.getAttribute("href")=="#"){n.classList.add("disabled");d.classList.add("disabled");n.style.color="#999";d.style.color="#999"}let a=false;let i;n.addEventListener("click",async e=>{e.preventDefault();if(open_link!="#"){try{if(a){return}await navigator.clipboard.writeText(open_link);clearTimeout(i);const t=n.innerHTML;n.innerHTML='已复制<i class="fas fa-check"></i>';n.style.color="green";a=true;i=setTimeout(()=>{n.innerHTML=t;n.style.color="";a=false},1e3)}catch(e){console.error("复制到剪贴板失败:",e)}}});const c=document.querySelector(".movie-detail-media-meta-item .edit a");c.addEventListener("click",e=>{e.preventDefault();const i=document.createElement("div");i.className="input-box";i.style.position="fixed";i.style.top="50%";i.style.left="50%";i.style.transform="translate(-50%, -50%)";i.style.backgroundColor="#607D8B";i.style.padding="20px";i.style.border="1px solid #212529";i.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)";i.style.zIndex="9999";i.style.width="400px";const s=document.createElement("input");s.type="text";s.placeholder="请输入URL";s.style.width="100%";s.style.marginBottom="10px";i.appendChild(s);const t=document.createElement("button");t.textContent="确认";t.style.float="right";i.appendChild(t);const a=document.createElement("button");a.textContent="取消";a.style.float="right";a.style.marginRight="10px";i.appendChild(a);document.body.appendChild(i);s.focus();t.addEventListener("click",()=>{const a=s.value;if(!l(a)){s.placeholder="URL无效!";s.value="";s.focus()}else{$.ajax({url:"https://api.jaychou.site/trakt/update_movie_share_link",type:"POST",dataType:"json",data:{movie_id:o.movie_id,share_link:a},success:function(e){if(e.code==200){const t=c.innerHTML;c.innerHTML='已更新 <i class="fas fa-check"></i>';c.style.color="green";setTimeout(()=>{c.innerHTML=t;c.style.color=""},1e3);if(i&&i.parentNode){i.parentNode.removeChild(i)}d.setAttribute("href",a);d.classList.remove("disabled");d.style.color="";d.setAttribute("target","_blank");n.classList.remove("disabled");n.style.color="";open_link=a}else{s.placeholder="更新失败!";s.value="";s.focus()}},error:function(e){console.log(e)}})}});a.addEventListener("click",()=>{document.body.removeChild(i)});s.addEventListener("keydown",e=>{if(e.key==="Enter"){t.click();e.preventDefault()}})})}});