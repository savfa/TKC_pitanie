$(document).ready(function () {
	var winHeight = $(window).height();
	$(document).on('scroll', function() {
		$('.main-info__list .text').each(function() {
		  var self = $(this),
		  height = self.offset().top + self.height();
		  if ($(document).scrollTop() + winHeight >= height) {
			self.addClass('visible')
		  } else {
			self.removeClass('visible') 
		  }
		});
	});
	$('section.slider').slick({
        infinite: true,
        slidesToShow: true,
        slidesToScroll: true,
        dots: false,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 8e3,
        accessibility: false,
        responsive: [{breakpoint: 650, settings: {dots: true, arrows: false}}]
    });
    //viewport
  function setViewport() {
    var w = $(window);
    var ww = w.width();
    var vps, viewport;
    viewport = document.querySelector("meta[name=viewport]");
    
    if (ww <= 375) {
      vps = "width=375, user-scalable=no";
    } else {
      vps = "user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1";
    }
    viewport.setAttribute("content", vps);
  }
  //viewport change
  $(window).resize(function() {
    setViewport();
  });
  //load viewport
  setViewport();

  $(".fancybox").fancybox();
  $('.close-button').on('click', function(e) {
    e.preventDefault();
    $.fancybox.close();
  });
  $('.meal_menu-block__items .text-button').on('click',function () {
    $.fancybox.open({
      src : '#order-modal'
    });
	$('#order-modal').find('.message').hide();
	$('#order-modal input[name="form_hidden_170"]').val($(this).data('meal'));
  });
  $('.meal_menu-switch__block').on('click', function () {
    var self = $(this);
    self.addClass('active').siblings().removeClass('active');
    if($('.meal_menu-switch__block:nth-last-child(1)').hasClass('active')) {
      $('.meal_menu-switch__trigger').addClass('active');
    }
  });
  $('.meal_menu-switch__trigger').on('click', function () {
    $('.meal_menu-switch__trigger').toggleClass('active');
	if($('.meal_menu-switch__trigger').hasClass('active'))
		$('.meal_menu-switch__block[data-target="business"]').click();
	else
    	$('.meal_menu-switch__block[data-target="economy"]').click();
  });
  var body = $('body');
	body.on('click', '.meal_menu-block__sort li', function() {
        //Клик по подразделу
		var self = $(this);
		var parent = $('.meal_menu-block');
		self.addClass('active').siblings('li').removeClass('active');
		parent.find('.meal_menu-block__items li').removeClass('active');
		parent.find('li[data-id="' + self.data('target') + '"]').addClass('active');
        $('#meal_menu').trigger('menu_change');
  });
  $('.meal_menu-block__sort li:nth-child(1)').click();
	body.on('click', '.meal_menu-switch__block', function() {
        //Последняя функция обработки клика по разделу
		var self = $(this);
		var parent = $('.meal_menu .meal_container');
		self.addClass('active').siblings('li').removeClass('active');
		parent.find('.meal_menu-block').removeClass('active');
		parent.find('.meal_menu-block[data-id="' + self.data('target') + '"]').addClass('active');
        $('#meal_menu').trigger('menu_change');
  });
  $('#meal_menu').on('menu_change',function(){
      var ac = $('.meal_menu-block.active li.active').data('target');
      $('.meal_menu-block__generalitems li:not(.'+ac+')').removeClass('active');
      $('.meal_menu-block__generalitems li.'+ac).addClass('active')
  })

  // БЛОК С ВОПРОСАМИ
  body.on('click', '.question-tabs__list li', function() {
		var self = $(this);
		var parent = $('.question');
		self.addClass('active').siblings('li').removeClass('active');
		parent.find('.question-answers__block').removeClass('active');
		parent.find('.question-answers__block[data-id="' + self.data('target') + '"]').addClass('active');
  });
    $(".questions__item__title").click(function() {
		var item = $(this).closest('.questions__item');
		item.siblings('.questions__item').removeClass('active');
		item.toggleClass('active');
        const t = $(this).next().attr("id");
        $(".questions__item__text[id!=" + t + "]").slideUp(),
        $(this).next().slideToggle();
    });
	body.on('click', 'a.scrolling', function(e){
		mealScroll($(e.target).attr('href'));
		return false;
	});
	function mealScroll(e){
		switch(e){            
			case '#tasty':
				$('.meal_menu-block.active .meal_menu-block__sort li:nth-child(1)').click();
				$(window).scrollTop($('.meal_menu-block.active .meal_menu-block__items').offset().top-$(window).height()/3);
			break;
			case '#veget':
				var e = '.meal_menu-block.active .meal_menu-block__sort li:nth-child(1)';
				$(e).click();
				$(window).scrollTop($('.meal_menu-block.active .meal_menu-block__items li:nth-child(2)').offset().top-$(window).height()/3);
			break;
			case '#kids':
				var e = '.meal_menu-block.active .meal_menu-block__sort li:nth-child(1)';
				$(e).click();
				$(window).scrollTop($('.meal_menu-block.active .meal_menu-block__items li:nth-child(3)').offset().top-$(window).height()/3);
			break;
			case '#economy_menu':
				//$('.meal_menu-switch__trigger .trigger-left').click();
                $('.econom-on').click();
				mealScroll('#meal_menu');
			break;
			case '#business_menu':
				//$('.meal_menu-switch__trigger .trigger-right').click();
                $('.bussines-on').click();
				mealScroll('#meal_menu');
			break;
            case '#special_menu':
                $('.econom-on').click();
                $('.special-on').click();
                mealScroll('#meal_menu');
            break;
			case '#kids_menu':
				var e = '.meal_menu-block.active .meal_menu-block__sort li:nth-child(6)';
				$(e).click();
				mealScroll($(window).scrollTop($(e).offset().top-$(window).height()/3));
			break;
			case '#meal_menu':
			case '#faq':
				$(window).scrollTop($(e).offset().top-$(window).height()/3);
			break;
		}
	}

	$('.meal_menu-order__modal .order-form form').on('submit', function(e) {
		e.preventDefault();
		var $form = $(this),
			$submit = $form.find('button[type="submit"]'),
			formData = new FormData($(this).get(0));
		$.ajax({
			url: '/ajax/meal_order.php',
			type: 'POST',
			contentType: false,
			processData: false,
			data: formData,
			success: function(data){
				if (data.indexOf('успешно')!=-1) {
					$form[0].reset(); 
					$form.find('.message').fadeIn(500).removeClass('text-danger').addClass('text-success').html(data).delay(2000).fadeOut(500);
				} else {
					$form.find('.message').fadeIn(500).removeClass('text-success').addClass('text-danger').html(data).delay(5000).fadeOut(500);
				}
			}
		});
	});
	$('.meal_menu-block.active .meal_menu-block__sort li[data-target]:nth-child(1)').click();
});