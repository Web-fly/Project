$(document).ready(function() {
	var send_form = false;
	$('#goresult').on('click', function(event) {
		if(!send_form) {
			var
			message = $('.message-order');
			name_url = 	'index.php';					// url send post
			preReg = /^[0-9a-zA-Z\@\-\_\.\!]+$/i;		// regul valid
		$.ajax({
			url: name_url,
			type:'POST',
			timeout: 10000,
			cache: false,
			data: {
				option:
				option2:
			 },
			success: function(result_data) {
				$(this).prop('disabled',true);
				send_form = true;
				// setTimeout(function() { send_form = false;  $('#goresult').prop('disabled',false); }, 3000);
				console.log(result_data); return false;
			},
			error: function(nameerror,exception) {
				if (nameerror.status === 0) {
					message.text('<p>Нету подключения к серверу, попробуйте снова</p>');
				}
				else if (nameerror.status == 404) {
					message.html('<p>Страница не найдена. [404]</p>');
				} else if (nameerror.status == 500) {
					message.html('<p>Произошла ошибка [500].</p>');
				} else if (exception === 'parsererror') {
					message.html('<p>Requested JSON parse failed.</p>');
				} else if (exception === 'timeout') {
					message.html('<p>Время ожидания ответа вышло.</p>');
				} else if (exception === 'abort') {
					message.html('<p>Соединие было прервано.</p>');
				} else {
					message.html("<p>Произошла ошибка!</p>");
				}
			}
		});
	}
	});
});