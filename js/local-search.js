(function(){function e(t,e,r){;"use strict";var a=jQuery(e);var i=jQuery(r);if(a.length===0){throw Error("No element selected by the searchSelector")}if(i.length===0){throw Error("No element selected by the resultSelector")}if(i.attr("class").indexOf("list-group-item")===-1){i.html('<div class="m-auto text-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div><br/>Loading...</div>')}var c=[];if(window.location.pathname.indexOf("/culture/movies")!==-1){jQuery.ajax({url:"https://api.jaychou.site/trakt/index",dataType:"json",success:function(t){var e=t.data.movie;var r=[];if(e!==""){var a=JSON.parse(atob(e));for(var i=0;i<a.length;i++){var l=a[i];r.push({title:l.title,content:l.content,url:l.url})}}c=r}})}else if(window.location.pathname.indexOf("/culture/shows")!==-1){jQuery.ajax({url:"https://api.jaychou.site/trakt/index",dataType:"json",success:function(t){var e=t.data.show;var r=[];if(e!==""){var a=JSON.parse(atob(e));for(var i=0;i<a.length;i++){var l=a[i];r.push({title:l.title,content:l.content,url:l.url})}}c=r}})}else if(window.location.pathname.indexOf("/culture/")!==-1){jQuery.ajax({url:"https://api.jaychou.site/trakt/index",dataType:"json",success:function(t){var e=t.data.movie;var r=t.data.show;var a=[];if(e!==""){var i=JSON.parse(atob(e));for(var l=0;l<i.length;l++){var n=i[l];a.push({title:n.title,content:n.content,url:n.url})}}if(r!==""){var s=JSON.parse(atob(r));for(var l=0;l<s.length;l++){var o=s[l];a.push({title:o.title,content:o.content,url:o.url})}}c=a}})}else{jQuery.ajax({url:t,dataType:"xml",success:function(t){c=jQuery("entry",t).map(function(){return{title:jQuery("title",this).text(),content:jQuery("content",this).text(),url:jQuery("url",this).text()}}).get()}})}if(i.html().indexOf("list-group-item")===-1){i.html("")}a.on("input",function(){var t=a.val();var d="";var p=t.trim().toLowerCase().split(/[\s-]+/);i.html("");if(t.trim().length<=0){return a.removeClass("invalid").removeClass("valid")}c.forEach(function(t){var r=true;if(!t.title||t.title.trim()===""){t.title="Untitled"}var e=t.title.trim();var a=e.toLowerCase();var i=t.content.trim().replace(/<[^>]+>/g,"");var l=i.toLowerCase();var n=t.url;var s=-1;var o=-1;var c=-1;if(CONFIG.include_content_in_search&&l===""){r=false}else{p.forEach(function(t,e){s=a.indexOf(t);o=l.indexOf(t);if(s<0&&o<0){r=false}else{if(o<0){o=0}if(e===0){c=o}}})}if(r){d+="<a href='"+n+"' class='list-group-item list-group-item-action font-weight-bolder search-list-title'>"+e+"</a>";var u=i;if(c>=0){var v=c-20;var h=c+80;if(v<0){v=0}if(v===0){h=100}if(h>u.length){h=u.length}var f=u.substring(v,h);p.forEach(function(t){var e=new RegExp(t,"gi");f=f.replace(e,'<span class="search-word">'+t+"</span>")});d+="<p class='search-list-content'>"+f+"...</p>"}}});if(d.indexOf("list-group-item")===-1){return a.addClass("invalid").removeClass("valid")}a.addClass("valid").removeClass("invalid");i.html(d)})}function t(t,e){"use strict";var r=jQuery(t);var a=jQuery(e);if(r.length===0){throw Error("No element selected by the searchSelector")}if(a.length===0){throw Error("No element selected by the resultSelector")}r.val("").removeClass("invalid").removeClass("valid");a.html("")}var r=jQuery("#modalSearch");var a="#local-search-input";var i="#local-search-result";r.on("show.bs.modal",function(){var t=CONFIG.search_path||"/local-search.xml";e(t,a,i)});r.on("shown.bs.modal",function(){jQuery("#local-search-input").focus()});r.on("hidden.bs.modal",function(){t(a,i)})})();