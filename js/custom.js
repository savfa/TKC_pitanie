function showTooltip($el, title) {
	$el.tooltip({
		title: title,
		html: true,
		trigger: 'malual'
	}).tooltip('show');

	setTimeout(function() {
		$el.tooltip('dispose');
	}, 5000);
}
$(document).ready(function(){
	var searchForm = window.TKS_SEARCH_FORM || 'UFS';

	if (window.location.hash && $(window.location.hash).length) {
		if ($(window.location.hash).hasClass('modal')) {
			$(window.location.hash).modal('show');
		}
	}

	$('a.iframe').fancybox({
		type: 'iframe'
	});

	$('.header__region').each(function() {
		var $city = $(this).find('.city a');

/*		$city.popover({
			container: 'body',
			content: '<div class="region__text">Мы угадали?</div><div><a href="#" class="btn region__btn" data-correct="1">Да</a> <a href="#" class="btn region__btn" data-correct="0">Нет</a></div>',
			trigger: 'manual',
			placement: 'bottom',
			html: true
		});*/

		$city.click(function(e) {
			e.preventDefault();
			chooseCityPopover();
		});

		// $('body').on('click', '.region__btn', function(e) {
		// 	e.preventDefault();
		// 	$.cookie('region_chosen', 1, { path: '/' });
		// 	$city.popover('hide');

		// 	if (!$(this).data('correct')) {
		// 		chooseCityPopover();
		// 	}
		// });

		// if (!$.cookie('region_chosen')) {
		// 	$city.popover('show');
		// }

		$('body').on('shown.bs.popover', function() {
			$('body').on('click.outsidepopover', function(e) {
				if (!$(e.target).closest('.popover').length) {
					$city.popover('hide');
				}
			});
		}).on('hide.bs.popover', function() {
			$('body').off('click.outsidepopover');
		});

		function chooseCityPopover() {
			$city.popover('dispose');

			$city.popover({
				container: 'body',
				title: '<div class="region__search"><div class="region__search-title">Найдите свой город:</div><input class="form-control" placeholder="" type="text"></div>',
				content: '<div class="region__search-results"></div>',
				trigger: 'manual',
				placement: 'bottom',
				html: true
			}).on('inserted.bs.popover', function() {
				if ($(this).attr('aria-describedby').length) {
					var selector = '#' + $(this).attr('aria-describedby');
					$(selector).addClass('region-popover');
				}
			}).popover('show');

			// $('body').on('input', '.region__search input', function() {
			// 	var value = this.value,
			// 		locate = '/ajax/locate.php';

			// 	if (value.length < 3) {
			// 		return;
			// 	}

			// 	$.ajax({
			// 		url: locate,
			// 		dataType: 'json',
			// 		data: 'q='+value,
			// 		success: function(data) {
			// 			var resultHtml = '',
			// 				resultCount = data.result.length;
			// 			if (!data || !resultCount) {
			// 				return;
			// 			}

			// 			resultHtml = '<p>Найдено ' + resultCount + ' ' + declOfNum(resultCount, ['город', 'города', 'города']) + ':</p>';
			// 			resultHtml += '<ul>';

			// 			for (var i = 0; i < resultCount; i++) {
			// 				var city = data.result[i],
			// 					regionName = '';

			// 				if (city.parents && city.parents.length) {
			// 					for (var j = 0; j < city.parents.length; j++) {
			// 						var region = city.parents[j];

			// 						if (region.contentType == 'region') {
			// 							regionName = region.name;
			// 							if (region.typeShort == 'обл') {
			// 								regionName += ' обл.';
			// 							}
			// 						}
			// 					}
			// 				}

			// 				resultHtml += '<li>';
			// 				resultHtml += '<span class="city-name">' + city.name + '</span>';
			// 				resultHtml += '<span class="region-name">' + regionName + '</span>';
			// 				resultHtml += '</li>';
			// 			}
			// 			resultHtml += '</ul>';

			// 			$('.region__search-results').html(resultHtml).show();
			// 		}
			// 	});
			// });

			// $('body').on('click', '.region__search-results li', function(e) {
			// 	var city = $(this).find('.city-name').text(),
			// 		region = $(this).find('.region-name').text();

			// 	$.post('/ajax/set_region.php', {city: city, region: region}, function() {
			// 		$city.text(city).popover('hide');
			// 		location.reload();
			// 	});
			// });
		}

		function declOfNum(number, titles) {
			number = Math.abs(number);
			var cases = [2, 0, 1, 1, 1, 2];
			return titles[ (number%100>4 && number%100<20) ? 2 : cases[(number%10<5) ? number%10 : 5] ];
		}
	});

	$(".searchForm__btn").click(function(e) {
		e.preventDefault();
		var from = $('.searchForm__field[name="from"]').val(),
			to = $('.searchForm__field[name="to"]').val(),
			dateFrom = $('.searchForm__field[name="date"]').val(),
			dateTo = $('.searchForm__field[name="dateReturn"]').val(),
			$submit = $(this),
			autocompliteUrl = 'https://bilet.transclass.ru/ajax/grandStationsAutocomplete?q=',
			url = '';

		if (from && to && dateFrom) {
			if (!isValidDate(dateFrom)) {
				showTooltip($submit, 'Некорректная дата отправки');
				return;
			}

			if (dateTo && !isValidDate(dateTo)) {
				showTooltip($submit, 'Некорректная дата возврата');
				return;
			}

			if (searchForm == 'UFS') {
				url = "https://transclass.ru/search#/" + from + "/" + to + "?date=" + dateFrom;
				if ($('.searchForm__toggleLink[data-type="roundtrip"]').hasClass("searchForm__toggleLink-active") && dateTo) {
					url += "&returnDate=" + dateTo;
				}
				location.replace(url);
			} else if (searchForm == 'PLATFORMA') {
				url = 'https://bilet.transclass.ru/ticket/search.fs?'; // test url = https://bilet.transclass.ru/ticket/search.fs?dep=266&fw=17.02.2018&arr=13443&bw=22.02.2018&searchAction=1

				$.getJSON(encodeURI(autocompliteUrl + from), function(data) {
					if (data && data.length) {
						url += 'dep=' + data[0].id;
						document.cookie = "STATION_CODE_FROM="+data[0].id+"; domain=.transclass.ru";
					} else {
						showTooltip($submit, 'Некорректный пункт отправки');
						return;
					}

					$.getJSON(encodeURI(autocompliteUrl + to), function(data) {
						if (data && data.length) {
							url += '&arr=' + data[0].id;
							document.cookie = "STATION_CODE_TO="+data[0].id+"; domain=.transclass.ru";
						} else {
							showTooltip($submit, 'Некорректный пункт назначения');
							return;
						}

						url += '&fw=' + dateFrom;

						if ($('.searchForm__toggleLink[data-type="roundtrip"]').hasClass("searchForm__toggleLink-active") && dateTo) { // isRoundtrip
							url += '&is-bw=1&bw=' + dateTo;
						}
						url += '&searchAction=1';
						location.href = url;
					});
				});
			}
		} else {
			showTooltip($submit, 'Укажите пункт отправки и назначения, а также, дату отправки');
		}
	});

	$(".btn-buy-ticket").click(function(e) {
		e.preventDefault();
		var from = $(this).data("from"),
			to = $(this).data("to"),
			currentDate = new Date(),
			autocompliteUrl = 'https://bilet.transclass.ru/ajax/grandStationsAutocomplete?q=',
			url = 'https://bilet.transclass.ru/ticket/search.fs?'; // test url = https://bilet.transclass.ru/ticket/search.fs?dep=266&fw=17.02.2018&arr=13443&bw=22.02.2018&searchAction=1

		if (from && to) {
			if (searchForm == 'UFS') {
				location.href = "https://transclass.ru/search#/" + from + "/" + to;
			} else if (searchForm == 'PLATFORMA') {
				$.getJSON(autocompliteUrl + from, function(data) {
					if (data && data.length) {
						url += 'dep=' + data[0].id;
					}

					$.getJSON(autocompliteUrl + to, function(data) {
						if (data && data.length) {
							url += '&arr=' + data[0].id;
						}

						currentDate.setDate(currentDate.getDate() + 1);
						url += '&fw=' + currentDate.getDate() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getFullYear();
						url += '&searchAction=1';
						location.href = url;
					});
				});
			}
		}
	});
    
    IEinputphonemask=function(el){
        var regexpPhone=function(str){
            return str
            .replace(/[^\d\+]/img, "")
            .replace(/\+7(\s)*(\d{3})(\d{1,})/img, "+7($2)$3")
            .replace(/\+7(\s)*\((\d{3})(\d{1,})\)(.*)/img, "+7($2)$3$4")
            .replace(/(\+7\(\d{3}\)\d{3})(\d{1,})/img, "$1-$2")
            .replace(/(\+7\(\d{3}\)\d{3}\-\d{2})(\d{1,})/img, "$1-$2")
            .replace(/(\+7\(\d{3}\)\d{3}\-\d{2}-\d{2})(\d{1,})/img, "$1 $2");    
        };
        $(el)
        .on('keydown',function(e){
            console.log(e);
            var ss;
            if(e.keyCode==8){
                //backspace
                ss = Math.max(0,el.selectionStart-1);
            }else if(e.keyCode==46){
                //delete
                ss = el.selectionStart;
            }
            if(e.keyCode==8||e.keyCode==46){
                setTimeout(function(){
                    var str = el.value.substr(0, ss)
                    str=regexpPhone(str);
                    ss=str.length;                    
                    el.value = regexpPhone(el.value);                    
                    el.selectionStart=ss;
                    el.selectionEnd=el.selectionStart;                   
                },0)
            }
        })
        .on('keypress',function(e){
            if( (e.char=='7'||e.char=='8'||e.char=='+') && el.value==''){
                el.value='+7 ';
                return false;
            }else if(el.value!=''){
                var ss = el.selectionStart+1;
                setTimeout(function(){
                    var str = el.value.substr(0, ss)
                    str=regexpPhone(str);
                    ss=str.length;                    
                    el.value = regexpPhone(el.value);                    
                    el.selectionStart=ss;
                    el.selectionEnd=el.selectionStart;                   
                },0)    
            }            
        })
    }

	// $('[data-toggle="phone-mask"]').each(function() {
    //     var IEv = getIEVersion()
    //     if(IEv && IEv<=11){
    //         console.log(IEv);
    //         IEinputphonemask(this)
    //         return;
    //     }
	// 	$(this).inputmasks({
	// 		inputmask: {
	// 			definitions: {
	// 				'#': {
	// 					validator: "[0-9]",
	// 					cardinality: 1
	// 				}
	// 			},
	// 			showMaskOnHover: false,
	// 			autoUnmask: true
	// 		},
	// 		match: /[0-9]/,
	// 		replace: '#',
	// 		list: $.masksSort($.masksLoad("/build/js/phone-codes.json"), ['#'], /[0-9]|#/, "mask"),
	// 		listKey: "mask",
	// 	});
	// });

	$('[data-toggle="date"]').each(function(){
		$(this).inputmask({mask:"d.m.y",placeholder:'_',clearIncomplete:"true"});
		/*{
			alias:"date",
			clearIncomplete:"true",
			//mask:"2.1.y",

			separator: "."
		}*/
	});

	$('[data-mask]').each(function() {
		var mask = $(this).data('mask') + '';

		if (mask.length > 0) {
			$(this).inputmasks(mask);
		}
	});

	$('.searchForm__field[name="date"], .searchForm__field[name="dateReturn"]').inputmask('99.99.2099');

	// $('.search-page input[name="q"]').on('input', function() {
	// 	var val = $(this).val(),
	// 		$input = $(this);
	// 	if (!val || val.length < 3) {
	// 		return;
	// 	}
	// 	$.post('/ajax/search_title.php', {q: val}, function(data) {
	// 		$input.autocomplete({
	// 			source: data,
	// 			select: function(e, ui) {
	// 				$input.val(ui.item.value)[0].form.submit();
	// 			}
	// 		}).autocomplete("instance")._renderItem=function(e,a){return $("<li>").append("<a>"+a.label+"</a>").appendTo(e);};
	// 	}, 'json');
	// });

	(function() {
		var currentLocation = $('.header__region .city a').text();

		if (getIEVersion() == 11) {
			return;
		}

		// $('.searchForm__field[name="from"]').each(function() {
		// 	var $this = $(this);

		// 	$.post('/ajax/get_closest_station.php', { city: currentLocation }, function(data) {
		// 		currentLocation = data;
		// 		typeString($this, data);
		// 	});
		// });

		$('.searchForm__field[name="to"]').each(function() {
			var $this = $(this),
				location = getRandomLocation();

			setTimeout(function() {
/*				if (currentLocation != 'Москва') {
					location = 'Москва';
				}*/

				typeString($this, location);
			}, 2000);
		});

		$('.searchForm__field[name="date"]').each(function() {
			var $this = $(this);

			setTimeout(function() {
				typeString($this, formatDate(addDays(1)));
			}, 4000);
		});

		$('.searchForm__field[name="dateReturn"]').each(function() {
			var $this = $(this);

			setTimeout(function() {
				typeString($this, formatDate(addDays(8)));
			}, 6000);
		});

		setInterval(function() {
			var animatedFields = [
				// $('.searchForm__field[name="from"]'),
				// $('.searchForm__field[name="to"]'),
				$('.searchForm__field[name="date"]'),
				$('.searchForm__field[name="dateReturn"]')
			], $el = $();

			if (currentLocation == 'Откуда') {
				animatedFields.push($('.searchForm__field[name="to"]'));
			}

			$el = animatedFields[Math.floor(Math.random() * animatedFields.length)];

			if (!$el) {
				return;
			}

			changeField($el);
		}, 10000);

		function changeField($el) {
			//deleteString($el);

			setTimeout(function() {
				typeString($el, generateString($el));
			}, 2000);
		}

		function generateString($el) {
			var string = '';

			if ($el.attr('name') == 'from') {
				var to = $('.searchForm__field[name="to"]').val();

				while (to == string || string == $el.val()) {
					string = getRandomLocation();
				}
			}

			if ($el.attr('name') == 'to') {
				var from = $('.searchForm__field[name="from"]').val();

				while (from == string || string == $el.val()) {
					string = getRandomLocation();
				}
			}

			if ($el.attr('name') == 'date') {
				string = formatDate(addDays(getRandomInt(2, 5)));
			}

			if ($el.attr('name') == 'dateReturn') {
				string = formatDate(addDays(getRandomInt(6, 10)));
			}

			return string;
		}

		function typeString($el, string) {
			var timer,
				i = 0;

			timer = setInterval(function() {
				var stringPart = string.slice(0, i + 1);

				if (string.length > i) {
					$el.attr('placeholder', stringPart);
					i++;
				} else {
					clearInterval(timer);
				}
			}, 150);
		}

		function deleteString($el) {
			var timer,
				string = $el.attr('placeholder');

			timer = setInterval(function() {
				string = string.slice(0, -1);

				$el.attr('placeholder', string);
				if (!string) {
					clearInterval(timer);
				}
			}, 150);
		}

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function getRandomLocation() {
			//var locations = ['Белгород', 'Волгоград', 'Воркута', 'Йошкар-Ола', 'Казань', 'Москва', 'Киров', 'Новороссийск', 'Пенза', 'Псков', 'Саранск', 'Саратов', 'Ульяновск', 'Чебоксары', 'Череповец'];
			var locations = ['Куда'];

			return locations[Math.floor(Math.random() * locations.length)];
		}

		function formatDate(date) {
			return ('0'+date.getDate()).slice(-2) + '.' + ('0'+(date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();
		}

		function addDays(days) {
			var result = new Date();
			result.setDate(result.getDate() + days);
			return result;
		}
	})();

	// $('#callback_form form, #group_order form').submit(function(e) {
	// 	e.preventDefault();
	// 	var $form = $(this),
	// 		$submit = $form.find('input[type="submit"]');

	// 	$.post('/ajax/feedback.php', $form.serialize(), function(data) {
	// 		if (data.indexOf('обращение')!=-1) {
	// 			$form[0].reset();
	// 			$form.slideUp().after('<div class="result">'+ data +'</div>');
	// 			$form.closest('.modal').on('hidden.bs.modal', function() {
	// 				$form.show().siblings('.result').remove();
	// 			});
	// 		} else {
	// 			var widgetid = $form.find('.g-recaptcha').data('widget');
	// 			showTooltip($submit, data);
	// 			//grecaptcha.reset(widgetid);
	// 		}
	// 	});
	// });

	// $('#footer_feedback form').on('submit', function(e) {
	// 	e.preventDefault();
	// 	var $form = $(this),
	// 		$submit = $form.find('input[type="submit"]'),
	// 		formData = new FormData($(this).get(0));
	// 	$.ajax({
	// 		url: '/ajax/footer_feedback.php',
	// 		type: 'POST',
	// 		contentType: false,
	// 		processData: false,
	// 		data: formData,
	// 		success: function(data){
	// 			if (data.indexOf('обращение')!=-1) {
	// 				$form[0].reset();
	// 				$form.slideUp().after('<div class="result">'+ data +'</div>');
	// 				$form.closest('.modal').on('hidden.bs.modal', function() {
	// 					$form.show().siblings('.result').remove();
	// 				});
	// 			} else {
	// 				var widgetid = $form.find('.g-recaptcha').data('widget');
	// 				showTooltip($submit, data);
	// 				//grecaptcha.reset(widgetid);
	// 			}
	// 		}
	// 	});
	// });

	// $('#childs_order form').submit(function(e) {
	// 	e.preventDefault();
	// 	var $form = $(this),
	// 		$submit = $form.find('input[type="submit"]');

	// 	$.post('/ajax/feedback.php', $form.serialize(), function(data) {
	// 		if (data.indexOf('обращение')!=-1) {
	// 			$form[0].reset();
	// 			$form.slideUp().after('<div class="result">'+ data +'</div>');
	// 			$form.closest('.modal').on('hidden.bs.modal', function() {
	// 				$form.show().siblings('.result').remove();
	// 			});
	// 		} else {
	// 			var widgetid = $form.find('.g-recaptcha').data('widget');
	// 			showTooltip($submit, data);
	// 			//grecaptcha.reset(widgetid);
	// 		}
	// 	});
	// });

	// $('#contacts_feedback form').submit(function(e) {
	// 	e.preventDefault();
	// 	var $form = $(this),
	// 		$submit = $form.find('input[type="submit"]');

	// 	$.post('/ajax/reviews.php', $form.serialize(), function(data) {
	// 		if (data == 'Благодарим за ваше обращение!<br>Наши специалисты ответят вам в течение 1 рабочего дня.') {
	// 			$form[0].reset();
	// 			$form.slideUp().after('<div class="result">'+ data +'</div>');
	// 			$form.closest('.modal').on('hidden.bs.modal', function() {
	// 				$form.show().siblings('.result').remove();
	// 			});
	// 		} else {
	// 			var widgetid = $form.find('.g-recaptcha').data('widget');
	// 			showTooltip($submit, data);
	// 			//grecaptcha.reset(widgetid);
	// 		}
	// 	});
	// });

	$('.route-form input.input__field').each(function() {
		if ($(this).val()) {
			$(this).parent().addClass('input--filled');
		}

		$(this).focus(function() {
			$(this).parent().addClass('input--filled');
		}).blur(function() {
			if (!$(this).val()) {
				$(this).parent().removeClass('input--filled');
			}
		});
	});

	// $('.route-form form').submit(function(e) {
	// 	e.preventDefault();
	// 	var $form = $(this),
	// 		$submit = $form.find('[type="submit"]');

	// 	$.post('/ajax/route-form.php', $form.serialize(), function(data) {
	// 		if (data == 'Благодарим за ваше обращение!<br>Наши специалисты ответят вам в течение 1 рабочего дня.') {
	// 			$form[0].reset();
	// 			$submit.text('Благодарим! Ждите новостей!').prop('disabled', true);
	// 		} else {
	// 			showTooltip($submit, data);
	// 		}
	// 	});
	// });

	// $('#send_cv_list form, #send_cv_item form, #bonus_send form').each(function() {
	// 	var $form = $(this),
	// 		$submit = $form.find('input[type="submit"]');

	// 	$form.ajaxForm({
	// 		url: '/ajax/feedback.php',
	// 		success: function(data) {
	// 			showTooltip($submit, data);
	// 			if (data.indexOf('обращение')!=-1) {
	// 				$form[0].reset();
	// 				if ($form.attr('name') == 'SIMPLE_FORM_7') {
	// 					data = 'Спасибо! Заявление на передачу бонусных баллов успешно отправлено.';
	// 				}
	// 				$form.slideUp().after('<div class="result">'+ data +'</div>');
	// 				$form.closest('.modal').on('hidden.bs.modal', function() {
	// 					$form.show().siblings('.result').remove();
	// 				});
	// 			} else {
	// 				var widgetid = $form.find('.g-recaptcha').data('widget');
	// 				showTooltip($submit, data);
	// 				//grecaptcha.reset(widgetid);
	// 			}
	// 		}
	// 	});
	// });

	// $('#workForm').each(function() {
	// 	var $form = $(this),
	// 		$submit = $form.find('input[type="submit"]');
	// 	$form.ajaxForm({
	// 		url: '/ajax/work_feedback.php',
	// 		success: function(data) {
	// 			showTooltip($submit, data);
	// 			if (data.indexOf('обращение')!=-1) {
	// 				$form[0].reset();
	// 				$form.children('div:visible').slideUp();
	// 				$form.children('h5').after('<div class="result text-center">'+ data +'</div>');
	// 			} else {
	// 				var widgetid = $form.find('.g-recaptcha').data('widget');
	// 				showTooltip($submit, data);
	// 				//grecaptcha.reset(widgetid);
	// 			}
	// 		}
	// 	});
	// });

	$('[data-toggle="date"]').each(function() {
		var min_default = $(this).data('date-default') || '';
        
        var Dy = new Date();
        Dy.setFullYear(Dy.getFullYear() - 26);        
        
		$(this).datepicker({
			dateFormat: "dd.mm.yy",
            changeYear: true,
			defaultDate: Dy,//(min_default.toString(10)),
			minDate: min_default ? '' : new Date()
		});
	});

	$('#group_order [data-toggle="autocomplete"], #bonus_send [data-toggle="autocomplete"]').each(function() {
		$(this).autocomplete({
			source: tcsStations,
			select: function(e, ui) {
				var $target = $(e.target),
					params = {};

				if ($target.is('#group_order_from')) {
					params.from = ui.item.value;
					params.to = $('#group_order_to').val();
				} else if ($target.is('#group_order_to')) {
					params.from = $('#group_order_from').val();
					params.to = ui.item.value;
				}

				// if (params.from && params.to) {
				// 	$.post('/ajax/train_by_routes.php', params, function(data) {
				// 		$('#group_order_train').val(data);
				// 	});
				// }
			}
		}).autocomplete("instance")._renderItem=function(e,a){return $("<li>").append("<div>"+a.value+"</div>").appendTo(e);};
	});

	$('#group_order .amount input').spinner({
		min: 0
	});

	$('.fixed-feedback-btn').each(function() {
		var windowHeight = $(window).height(),
			footerTop = $('.footer-tcs').offset().top;

		$(window).on('scroll', function() {
			var viewportTop = $(document).scrollTop(),
				viewportBottom = viewportTop + windowHeight;

			if (viewportBottom > footerTop) {
				$('body').addClass('hide-feedback-btn');
			} else {
				$('body').removeClass('hide-feedback-btn');
			}
		});
	});

	$('.statistic').each(function() {
		var windowHeight = $(window).height(),
			$statistic = $(this),
			statisticTop = $statistic.offset().top;

		$(window).on('load scroll', function() {
			if ($statistic.hasClass('start-animation')) return;

			var viewportBottom = $(document).scrollTop() + windowHeight;
			if (viewportBottom > statisticTop) {
				$statistic.addClass('start-animation');
			}
		});
	});

	$('.searchForm__field[name="from"], .searchForm__field[name="to"], #group_order_from, #group_order_to, input[name="form_text_94"], input[name="form_text_97"]').on('focus input', function() {
		if ($(this).val().length > 0) {
			console.log(searchForm); // todo: remove this line
			if (searchForm == 'UFS') {
				$(this).autocomplete('option', 'source', tcsStations);
			} else {
				$(this).autocomplete('option', 'source', function(request, response) {
					$.getJSON(encodeURI('https://bilet.transclass.ru/ajax/grandStationsAutocomplete?q=' + request.term), function(data) {
						var source = [];

						$.each(data, function(i) {
							source.push(data[i].value);
						});

						response(source);
					});
				});
			}
			return;
		}
		$(this).autocomplete('option', 'source', ['Белгород', 'Волгоград', 'Воркута', 'Йошкар-Ола', 'Казань', 'Москва', 'Киров', 'Новороссийск', 'Пенза', 'Псков', 'Саранск', 'Саратов', 'Ульяновск', 'Чебоксары', 'Череповец']);
		$(this).autocomplete('option', 'minLength', 0);
		$(this).autocomplete('search', '');
	});

	function isValidDate(str) { // dd.mm.yyyy
		var dateParts = str.split('.'),
			year, month, day,
			today = new Date();

		if (!dateParts || dateParts.length != 3) {
			return false;
		}

		year = dateParts[2] * 1;
		month = dateParts[1] * 1;
		day = dateParts[0] * 1;

		if (year != today.getFullYear() && year != (today.getFullYear() + 1)) {
			return false;
		}

		if (month <= 0 || month > 12) {
			return false;
		}

		if (day <= 0 || day > 31) {
			return false;
		}

		if (new Date(year, month - 1, day, 23, 59, 59) < today) {
			return false;
		}

		return true;
	}

});

function recaptchaOnloadCallback() {
	var elements = document.getElementsByClassName('g-recaptcha'),
		i = 0;

	for (i = 0; i < elements.length; i++) {
		var siteid = elements[i].getAttribute('data-sitekey'),
			widgetid = '';

		widgetid = grecaptcha.render(elements[i], {
			'sitekey': siteid
		});

		elements[i].setAttribute('data-widget', widgetid);
	}
}

function getIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0)
	return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./))
	return 11;

  else
	return 0; //It is not IE
}

function getParam(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}