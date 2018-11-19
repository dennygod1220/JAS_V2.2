(function(){

	var $domReady = window.jQuery || window.domready;

	$domReady(function(){
		var dt = new Date();
		var min = dt.getMinutes();

		console.log('min = '+min);
		if (min % 2 == 0) {
			var currentUrl = $('meta[property="og:url"]').attr('content');
			currentUrl = currentUrl.replace(/lab-news./,'');
			$.ajax({
				url: 'https://graph.facebook.com/?id='+currentUrl,
				cache: false,
				success: function(ret) {

					if (ret['og_object']['id'] != '1305079726218829') {

						var fb_shares = ret['share']['share_count'];
						//console.log('Facebook shares: '+fb_shares);

						var ppvUrl = $("#ppv").attr("rel");
						var insFbsUrl = ppvUrl.replace("https://misc.udn.com/record/pageview/","https://miapi.udn.com/record/fbshare/");
						//var insFbsUrl = 'https://miapi.udn.com/record/fbshare/<?=$channel_id?>/<?=$article['cate_id']?>/<?=$article['sub_id']?>/<?=$article['art_id']?>';
						$.ajax({
							type: 'POST',
							url: insFbsUrl,
							data: {fbshares: fb_shares},
							dataType: "text",
							success: function(_ret) {
								console.log(_ret);
							}
						});

					}
				}
			});
		}
		else {
			console.log('Get fb shares by pass!!');
		}
	});

}());



/*
domready(function() { 
	var currentUrl = $('meta[property="og:url"]').attr('content');
	currentUrl = currentUrl.replace(/lab-news/,'');
	$.ajax({
		url: 'https://graph.facebook.com/?id='+currentUrl,
		cache: false,
		success: function(ret) {
			var fb_shares = ret['share']['share_count'];
			//console.log('Facebook shares: '+fb_shares);

			var ppvUrl = $("#ppv").attr("rel");
			var insFbsUrl = ppvUrl.replace("https://misc.udn.com/record/pageview/","https://miapi.udn.com/record/fbshare/");
			//var insFbsUrl = 'https://miapi.udn.com/record/fbshare/<?=$channel_id?>/<?=$article['cate_id']?>/<?=$article['sub_id']?>/<?=$article['art_id']?>';
			$.ajax({
				type: 'POST',
				url: insFbsUrl,
				data: {fbshares: fb_shares},
				dataType: "text",
				success: function(_ret) {
					console.log(_ret);
				}
			});
		}
	});
});
*/

