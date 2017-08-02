
// Authorization on comets server
function auth(id_key,its_key) {
	var user_id = id_key;
	var user_key = its_key;
	console.log("Request authorization for user_id="+user_id);
	$.ajax({
		url: "http://93.73.167.200:5545/Chat/auth.php",
		type: "POST",
		data: {
			user_id:user_id,
			user_key:user_key,
			t:Math.floor(Math.random()*1000000)
		},
		dataType:'json',
		success: function(res) {
			CometServer().start({
				dev_id: 1680,
				user_id:user_id,
				user_key:user_key
			});
			console.log(res);
		}
	});
}
auth($('#user_id').val(),chatuser.val());
// click button - send message
send($('#user_id').val(), tmp_text, chatuser.val());

						
CometServer().subscription("msg.message", function(e){
	var bodyChat = $('.chat_body');
	bodyChat.append('<div class="admin_time"><span><b>'+gettime()+'</b></span></div><div class="admin"><span>'+e.data+'</span></div>');
	console.log(e);
});

/**
 * 
 * @param {integer} user_id  
 * @param {string} text 
 */
 function send(user_id, text,its_key) {
    // Send message
    $.ajax({
    	url: "http://93.73.167.200:5545/Chat/send.php",
    	type: "POST",
    	dataType: "json",
    	data: {
    		user_id:user_id,
    		msg:text,
    		t:Math.floor(Math.random()*1000000)
    	},
    	success: function(r) {
    		console.log(r);
    	}
    });
}