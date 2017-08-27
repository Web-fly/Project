var countId = $('#countId');
	var message = $('.message-fix2');
	var newid = '';
	var send_ms = true;
	$('#load-cont').on('click', function() {
		if(send_ms) {
			send_ms = false;
			$.ajax({
				type: 'POST',
				url: 'user/lottery.php',
				data: { load_more: countId.val() },
				chache: false,
				timeout: 10000,
				success:function(data){
					send_ms = true;
					if(data.length != 2) {
						var tmp_text = '';
						var json = JSON.parse(data);
						$.each(json, function(a,b) {
							newid = b.id;
							tmp_text += '<div id="title-menu-gift">';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">#'+b['id']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['name']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['type']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['category']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['count_much']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['price']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['member']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['status']+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['date_start'].substring(0,16)+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['date_end'].substring(0,16)+'</div>';
							tmp_text += '<div class="title-menu-item" data-value="'+b['id']+'">'+b['winner']+'</div></div>';
						});
						countId.val(newid);
						$("#block-white-widget:last").animate({
							opacity: 0.35,
							marginBottom: '120px'
						}, 400, function() {
							$(this).append(tmp_text);
							$(this).animate({ opacity: 1, marginBottom: '0px' },300);
						});
					} else { message.show(); message.text('Больше записей нету!'); setTimeout(function() { message.hide(300); }, 1000); }
					console.log(data);
				},
				error: function(ata){
					send_ms = true;
					$('#loader').hide();
					alert('Something went wrong, Please contact admin');
				}
			});
		}
	});