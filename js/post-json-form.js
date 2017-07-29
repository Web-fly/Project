$(document).ready(function() {
	var send_form = false;
	$('#goresult').on('click', function(event) {
		event.preventDefault();
		if(!send_form) {
			var
			message = $('.message-order');
			name_url = 	'index.php';					// url send post
			preReg = /^[0-9a-zA-Z\@\-\_\.\!]+$/i;		// regul valid
			createForm = new FormData($('.formwp')[0]); // form send
		$.ajax({
			url: name_url,
			type:'POST',
			timeout: 10000,
			cache: false,
			contentType: "application/json",
			dataType: "json",
			data: createForm,
			processData: false,
			contentType: false,
			success: function(result_data) {
				$(this).prop('disabled',true);
				send_form = true;
				// setTimeout(function() { send_form = false;  $('#goresult').prop('disabled',false); }, 3000);
				// console.log(result_data); return false;
				var json = result_data;
				console.log(json);
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
// json format
function return_type(type) {
	var count =  type.length;
	for (var i = 0; i < count; i++) {
		if(typeof(type[i]) === 'undefined') return 'undefined';
	}
}