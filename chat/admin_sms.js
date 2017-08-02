/**
 * 
 * @param {integer} user_id  
 * @param {string} text 
 */
function auth(id_key,its_key) {
		var user_id = id_key;
		var user_key = its_key;
		console.log("Request authorization for user_id="+user_id);
    $.ajax({
    	url: "http://93.73.167.200:5545/Chat/auth.php",
    	type: "POST",
    	data: {
    		user_id:user_id,
    		user_key:user_key
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
    }).always(function(res){
    });
}
function send(user_id, text,its_key) {
    // Send message
    $.ajax({
        url: "http://93.73.167.200:5545/Chat/send.php",
        type: "POST",
        dataType: "json",
        data: {
        	user_id:user_id,
        	msg:text
        },
        success: function(r) {
            console.log(r);
        }
    });

}
auth(idkey_user, user);

CometServer().subscription("msg.message", function(e){
	var bodyChat = $('.chat_body');
	bodyChat.append('<div class="times"><span><b>'+gettime()+'</b></span></div><div class="message_cc"><span>'+e.data+'</span></div>');
	console.log(e);
});