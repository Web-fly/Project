var captcha = null;
var loadCaptcha = function() {
    captcha = grecaptcha.render('getCaptcha', {
        'sitekey' : 'key',
        'callback' : function(response) {
    	// document.captcha_status.submit();
    	var
        url = 'captcha.php';
    	post_status(response,url,$('#captcha-msg'));
        }
    });
};
function post_status(resolve,link,error) {
    $.ajax({
        url: link,
        type: 'POST',
        data: { check_status_captcha:resolve },
        timeout:10000,
        chache:false,
        DateType: 'json',
        contentType: 'application/json',
        success: function(data) {
            var json = data;
            console.log(json);
            error.append(json);
        },
        error: function(nameerror,exception) {
            if (nameerror.status === 0) {
                error.html('Нету подключения к серверу, попробуйте снова');
            }
            else if (nameerror.status == 404) {
                error.html('Страница не найдена. [404]');
            } else if (nameerror.status == 500) {
                error.html('Произошла ошибка [500].');
            } else if (exception === 'parsererror') {
                error.html('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                error.html('Время ожидания ответа вышло.');
            } else if (exception === 'abort') {
                error.html('Соединие было прервано.');
            } else {
                error.html("Сообщение не было доставлено!");
            }   
        }

    });
}