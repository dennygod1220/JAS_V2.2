var config={	
				apiKey:"AIzaSyDd7EVYLemDRf_qCSFWSdW4Fcr_0Csnepk",
				authDomain:"udnfcm.firebaseapp.com",
				databaseURL:"https://udnfcm.firebaseio.com",
				storageBucket:"udnfcm.appspot.com",
				messagingSenderId:"938309756562"
			};
firebase.initializeApp(config);
const messaging=firebase.messaging();
if(window.location.protocol === "https:" && location.hostname == "udn.com"    ){
messaging.requestPermission().then(function(){
	messaging.getToken().then(function(currentToken){
		if(currentToken){
			var data='?token='+currentToken+"&agent="+navigator.userAgent.toLowerCase()+"&session="+GetCkValue("_eruid");
			var storage_token = window.localStorage.getItem("fcm_token");;				
			if( storage_token === currentToken ){
				console.log( " match storage..." );
			}else{
				fetch("/fcm/fetchToken"+data,{method:"GET"})
				.then(function(response){
					if(response.ok){
						return response.text().then(function(data){
							var obj = JSON.parse( data );								
							if( obj['type'] == 'updated' ){
								window.localStorage.setItem('fcm_token', currentToken );
								console.log('gotcha');
							}
							console.log(data);
						});
					}})
				.catch(function(error){
					console.log("error:"+error);
				});
			}
		}else{
			console.log('No Instance ID token available. Request permission to generate one.');
		}
	})
})
.catch(function(err){
	console.log('Unable to get permission to notify.',err);
});

messaging.onMessage(function(payload){
	const notificationTitle=payload.notification.title;
	const notificationOptions={	body:payload.notification.body,
								icon:payload.notification.icon,
								tag:payload.notification.body};
	if(!("Notification"in window)){
		console.log("This browser does not support system notifications");
	}else if(Notification.permission==="granted"){
		var notification=new Notification(notificationTitle,notificationOptions);
		notification.onclick=function(event){
			event.preventDefault();
			window.open(payload.notification.click_action,'_blank');
			notification.close();
		}
	}
});
}