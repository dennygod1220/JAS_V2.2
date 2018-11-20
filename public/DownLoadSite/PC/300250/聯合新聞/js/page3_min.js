var urlvar = location.pathname;
function pageviewevent(){
      $(".pagelink a").click(function () {
		var fp1 = $(this).text();
		if(fp1=='最前頁')	fp1=1;
		if(fp1=='最後頁')	fp1=ttlPage;
		if(fp1=='上一頁')	fp1=fp-1;
		if(fp1=='下一頁')	fp1=fp+1;
		var  param = "article_id=" + $("#article_id").text() + "&channel_id=" + $("#channel_id").text() + "&fp=" + fp1;
		$.getScript( "https://func.udn.com/funcap/discuss/disList.jsp?" + param, function(data, textStatus, jqxhr) {
			var fp=1;
			if(ttlPage>0)   pageview();
		});	
		window.location.hash = "#discuss";
	});
}

function pageview(){
        var upPage=1;
        if(fp>3)        upPage=fp-2;
        var downPage = upPage + 4;
        if(downPage>ttlPage)    downPage=ttlPage;
        if(downPage>5 && downPage-upPage<5)     upPage=downPage-4;
        var on=' class="on" ';
        pageTmp = '<a>最前頁</a>';
        if(upPage>1)    pageTmp += '<a>上一頁</a>';
        for(i=upPage; i<= downPage; i++){
                pageTmp += '<a';
                if(i==fp) pageTmp += on;
                pageTmp += '>' + i + '</a>';

        }
        if(ttlPage>5 && fp<ttlPage)     pageTmp += ' <span style="padding:4px 6px"> … </span> <a>下一頁</a>';
        if(ttlPage>5)   pageTmp += ' <a>最後頁</a>';
        if(ttlPage>0)   pageTmp += '<span class="total">共 ' + ttlPage + ' 頁</span>';
        $('.pagelink').html(pageTmp);
	pageviewevent();
}

