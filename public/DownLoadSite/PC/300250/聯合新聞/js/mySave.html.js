 var url = (window.location != window.parent.location) ? document.referrer: document.location;
 var uimg=$('meta[property="og:image"]', parent.document).attr('content');
 var uurl=$('meta[property="og:url"]', parent.document).attr('content');
 if (typeof(uurl) == "undefined")
    uurl="";
 var utitle=$('meta[property="og:title"]', parent.document).attr('content');
 var udesc=$('meta[name="description"]', parent.document).attr('content');
 var art_time=$('meta[name="date.available"]', parent.document).attr('content');
 var udesc2=$('meta[property="og:description"]', parent.document).attr('content');
 if (utitle && utitle.indexOf("|")<0)
	utitle=parent.document.getElementsByTagName("title")[0].innerHTML;
 if ( udesc && udesc=="" ) udesc=udesc2
 if (uurl.indexOf("mag.udn.com")>0)
   uurl=document.referrer;
 uurl=uurl.replace(/\=/g,"equalsymbol"); //需要取代 因為 reSave會用=
 uurl=uurl.replace(/\&/g,"andsymbol"); //需要取代 因為 reSave會用&
title=utitle.replace(/\&/g,"andsymbol");
 udesc=udesc.replace(/\&/g,"andsymbol");
 if ( uimg.indexOf("photo.php?u=")>0 ) uimg=uimg.substring(uimg.indexOf("photo.php?")+12, uimg.indexOf("&"));
 console.log(uimg);
 uimg=uimg.replace(/\&/g,"andsymbol");   
 uimg=uimg.replace(/\=/g,"equalsymbol");   
 var  param="i="+uimg+"&u="+encodeURI(uurl)+"&t="+encodeURI(utitle)+"&te="+art_time+"&d="+encodeURI(udesc);
 param=param.replace(/\//g,"slashsymbol"); 
 //console.log(param);
 //param="";
 var udne=readCki("udnemail");
 var fg_user=readCki("fg_user");
 var fg_mail=readCki("fg_mail");
 var cml="";
 //if (fg_mail!="") cml="f-"+fg_mail;
 if (udne!="")    cml="u-"+udne;
 if (cml!=""){
	window.location="https://udn.com/sfclient/reSave.html?"+param;		
 } else{
		//redirect to member 
		//var explainhtml="<a class='explanation only_web' href='javascript:void(0);'><b></b></a>";
		var savehtml="<a class='temporary_added only_web' href='javascript:void(0)' onClick='javascript:login();'><b></b>存新聞</a>";
		$("#save").html(savehtml);
 }  
 
 function login(){
		//alert("請先登入會員, 謝謝!");
		//parent.window.location="https://member.udn.com/member/login.jsp?site=mypage&redirect="+parent.window.location.href;
	colorboxiframe(240,150);
} 


function readCki(ck){
    ckv = "";
    cks = new Array();
    cks = document.cookie.split('; ');
    for(k = 0; k < cks.length; k++){
        ckn  = new Array();
        ckn  = cks[k].split('=');
        if(ckn[0] == ck){
            ckv = unescape(ckn[1]);
        }
    }
    return ckv;
 }

 function colorboxiframe(w, h) {
	  var murl="<div id='login' style='width:200px;margin-top:40px;'><center><h3><a href='javascript:window.location=\"https://member.udn.com/member/login.jsp?site=mypage&redirect="+parent.window.location+"\"'><font color=blue>請先登入會員</font></a></h3></center></div>"
	  var pmurl = ["<div id='login' style='width:200px;margin-top:40px;'><center><h3><a href='javascript:window.location=\"https://member.udn.com/member/login.jsp?site=mypage&redirect="+parent.window.location+"\"'><font color=blue>請先登入會員</font></a></h3></center></div>"];
	  window.parent.$.colorbox({html:murl, iframe: false, scrolling: false, width: w, height: h,opacity:0,transition:"none"});			
	  if (typeof window.parent.$.colorbox==="undefined")
		window.parent.$.prettyPhoto.open(pmurl);
 }
