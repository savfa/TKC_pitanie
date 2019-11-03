$(document).ready(function () {

    $('.info-pay__slider').slick({
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    const big = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        asNavFor: '.meal_gallery_preview'
    }
    const preview = {
        slidesToShow:5,
        slidesToScroll: 3,
        asNavFor: '.meal_gallery_big',
        // dots: true,
        arrows: false,
        focusOnSelect: true,
        responsive: [{breakpoint: 768, settings: {slidesToShow: 3}},{breakpoint: 576, settings: {slidesToShow: 1, slidesToScroll: 1}}]
    }


    $('.meal_gallery_big').slick(big);
    $('.meal_gallery_preview').slick(preview);

    $('.trigger-left, .econom-on').click(function () {
        $('.meal_gallery_big').slick('unslick');
        $('.meal_gallery_preview').slick('unslick');
        $('[data-id="economy"]').find('.meal_gallery_big').slick(big);
        $('[data-id="economy"]').find('.meal_gallery_preview').slick(preview);
    });
    $('.trigger-right,.bussines-on').click(function () {
        $('.meal_gallery_big').slick('unslick');
        $('.meal_gallery_preview').slick('unslick');
        $('[data-id="business"]').find('.meal_gallery_big').slick(big);
        $('[data-id="business"]').find('.meal_gallery_preview').slick(preview);
    });


    $('.meal_container').click(function () {
        const variant_menu = $(this).parents('.slider-slide').attr('data-toggle');
        const econom_on = $('.econom-on');
        const bussines_on = $('.bussines-on');
        const meal_menu_switch__trigger = $('.meal_menu-switch__trigger');

        switch (variant_menu) {
            case 'kupe':
                bussines_on.removeClass('active');
                econom_on.addClass('active');
                meal_menu_switch__trigger.removeClass('active');
                $('.meal_gallery_big').slick('unslick');
                $('.meal_gallery_preview').slick('unslick');
                $('[data-id="economy"]').find('.meal_gallery_big').slick(big);
                $('[data-id="economy"]').find('.meal_gallery_preview').slick(preview);
                $('.meal_menu-block').removeClass('active');
                $('[data-id="economy"]').addClass('active');
                break;
            case 'sv':
                econom_on.removeClass('active');
                bussines_on.addClass('active');
                meal_menu_switch__trigger.addClass('active');
                $('.meal_gallery_big').slick('unslick');
                $('.meal_gallery_preview').slick('unslick');
                $('[data-id="business"]').find('.meal_gallery_big').slick(big);
                $('[data-id="business"]').find('.meal_gallery_preview').slick(preview);
                $('.meal_menu-block').removeClass('active');
                $('[data-id="business"]').addClass('active');
                break;
        }
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
    
    function e() {
        var e = $(window).width(), a = $(this).scrollTop();
        a >= 82 ? $(".up").addClass("up-show") : $(".up").removeClass("up-show"), e > 1199 ? (a >= 82 ? $(".menu").addClass("menu-fixed") : $(".menu").removeClass("menu-fixed"), a >= 660 ? $(".searchFormPlaceholder-mainPage").addClass("searchFormPlaceholder-fixed") : $(".searchFormPlaceholder-mainPage").removeClass("searchFormPlaceholder-fixed"), a >= 130 ? $(".searchFormPlaceholder-innerPage").addClass("searchFormPlaceholder-fixed") : $(".searchFormPlaceholder-innerPage").removeClass("searchFormPlaceholder-fixed")) : ($(".searchFormPlaceholder-mainPage").removeClass("searchFormPlaceholder-fixed"), $(".searchFormPlaceholder-innerPage").removeClass("searchFormPlaceholder-fixed"), $(".menu").removeClass("menu-fixed"))
    }

    var a = {
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !0,
        arrows: !0,
        autoplay: !0,
        autoplaySpeed: 8e3,
        accessibility: !1,
        responsive: [{breakpoint: 768, settings: {dots: !0, arrows: !1}}, {
            breakpoint: 546,
            settings: {dots: !0, arrows: !1}
        }]
    }, t = {
        infinite: !0,
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: !1,
        arrows: !0,
        autoplay: !0,
        autoplaySpeed: 8e3,
        accessibility: !1,
        responsive: [{breakpoint: 1024, settings: {slidesToShow: 4, slidesToScroll: 1}}, {
            breakpoint: 768,
            settings: {slidesToShow: 3, slidesToScroll: 1}
        }, {breakpoint: 546, settings: {slidesToShow: 2, slidesToScroll: 1}}]
    }, o = {
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !0,
        arrows: !0,
        autoplay: !0,
        autoplaySpeed: 8e3,
        accessibility: !1,
        responsive: [{breakpoint: 768, settings: {dots: !0, arrows: !1}}, {
            breakpoint: 546,
            settings: {dots: !0, arrows: !1}
        }]
    }, r = {
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !0,
        arrows: !1,
        autoplay: !0,
        autoplaySpeed: 8e3,
        accessibility: !1
    }, i = {
        infinite: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !0,
        arrows: !1,
        autoplay: !0,
        autoplaySpeed: 8e3,
        accessibility: !1
    };
    $("#slider-main").slick(a), $("#slider-offers").slick(o), $("#slider-services").slick(t), $("#slider-travel").slick(r), $("#slider-route").slick(i), $("#slider-bonus").slick(i), $(".searchForm").on("click", ".searchForm__toggleLink", function (e) {
        e.preventDefault(), $(".searchForm__toggleLink").removeClass("searchForm__toggleLink-active"), $(this).addClass("searchForm__toggleLink-active"), "oneway" == $(this).data("type") ? ($(".dateReturn-wrap").hide(), $('.searchForm__field[name="date"]').attr("placeholder", "Дата поездки")) : ($(".dateReturn-wrap").show(), $('.searchForm__field[name="date"]').attr("placeholder", "Дата туда"))
    }), $(".searchForm__change").click(function () {
        var e = $('.searchForm__field[name="from"]').val(), a = $('.searchForm__field[name="to"]').val();
        $('.searchForm__field[name="from"]').val(a), $('.searchForm__field[name="to"]').val(e)
    }), $('.searchForm__field[name="date"], .searchForm__field[name="dateReturn"]').datepicker({
        dateFormat: "dd.mm.yy",
        defaultDate: new Date(),
        minDate: new Date(),
        maxDate: new Date(new Date().setDate(new Date().getDate() + 89))
    }), $.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3c;Пред",
        nextText: "След&#x3e;",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    }, $.datepicker.setDefaults($.datepicker.regional.ru), $('.searchForm__field[name="from"]').length > 0 && ($('.searchForm__field[name="from"]').autocomplete().autocomplete("instance")._renderItem = function (e, a) {
        return $("<li>").append("<div>" + a.value + "</div>").appendTo(e)
    }, $('.searchForm__field[name="to"]').autocomplete().autocomplete("instance")._renderItem = function (e, a) {
        return $("<li>").append("<div>" + a.value + "</div>").appendTo(e)
    }), /*$(".searchForm__btn").click(function(e){e.preventDefault();var a=$('.searchForm__field[name="from"]').val(),t=$('.searchForm__field[name="to"]').val(),o=$('.searchForm__field[name="date"]').val(),r=$('.searchForm__field[name="dateReturn"]').val();""!=a&&""!=t&&""!=o&&($('.searchForm__toggleLink[data-type="roundtrip"]').hasClass("searchForm__toggleLink-active")&&""!=r?location.replace("/search#/"+a+"/"+t+"?date="+o+"&returnDate="+r):location.replace("/search#/"+a+"/"+t+"?date="+o))}),*/$(window).scroll(function () {
        e()
    }), $(window).resize(function () {
        e()
    }), e(), $(".faq__title").click(function () {
        var e = $(this).parent();
        e.find(".faq__text").slideToggle(), e.find(".faq__ico").toggleClass("faq__ico-minus")
    }), $("[data-fancybox]").fancybox({}), $(".slideBlock__readMore").click(function () {
        var e = $(this).parents(".slideBlock"), a = e.find(".slideBlock__content").height();
        e.css("maxHeight", a), e.find(".slideBlock__readMoreWrap").addClass("d-none")
    }), $(".menu__trigger").click(function () {
        $(".menuPlaceholder").toggleClass("menuPlaceholder-open"), $(".header").toggleClass("header-fixed"), $(this).toggleClass("menu__trigger-open")
    }), $(".up").click(function () {
        $.scrollTo(0, 500)
    }), $(".information-selector-item").click(function () {
        var e = $(this).attr("data");
        if (void 0 !== e && $(".information-block#" + e).length > 0) {
            var a = $(".information-block#" + e);
            $(this).hasClass("active") || ($(this).parent().find(".information-selector-item").removeClass("active"), $(this).addClass("active"), $(a).parent().find(".information-block").removeClass("active"), $(a).addClass("active"))
        }
    }), /*$(".btn-buy-ticket").click(function(e){e.preventDefault();var a=$(this).data("from"),t=$(this).data("to");location.replace("/search#/"+a+"/"+t)}),*/$('.searchForm__field[name="date"]').change(function () {
        "" != $(this).val() ? $(this).attr("placeholder", "") : $(this).attr("placeholder", "Дата туда")
    }), $('.searchForm__field[name="dateReturn"]').change(function () {
        "" != $(this).val() ? $(this).attr("placeholder", "") : $(this).attr("placeholder", "Дата оттуда")
    }), $('.searchForm__field[name="from"]').addClass("tutorial-target").popover({
        container: "body",
        content: '<div class="tutorial__close"></div><div class="tutorial__title">Шаг 1</div><div class="tutorial__text">Выберите станцию отправления</div><div><!-- <a href="#" class="btn tutorial__btn tutorial__next" data-next="2">Далее</a> --></div>',
        trigger: "focus",
        placement: function (e, a) {
            return $(e).addClass("tutorial"), "top"
        },
        html: !0
    }), $('.searchForm__field[name="to"]').addClass("tutorial-target").popover({
        container: "body",
        content: '<div class="tutorial__close"></div><div class="tutorial__title">Шаг 2</div><div class="tutorial__text">Введите пункт назначения</div><div><!-- <a href="#" class="btn tutorial__btn tutorial__next" data-next="3">Далее</a> --></div>',
        trigger: "focus",
        placement: function (e, a) {
            return $(e).addClass("tutorial"), 'top'
        },
        /*modifiers: {
            flip: {
                behavior: ['top', 'left', 'right', ],
            },
            / *preventOverflow: {
                boundariesElement: example3reference1.parentNode,
            },* /
        },*/
        //fallbackPlacement: 'clockwise',
        html: !0,
    }), $('.searchForm__field[name="date"]').addClass("tutorial-target").popover({
        container: "body",
        content: '<div class="tutorial__close"></div><div class="tutorial__title">Шаг 3</div><div class="tutorial__text">Выберите даты поездки</div><div><!-- <a href="#" class="btn tutorial__btn tutorial__next" data-next="4">Далее</a> --></div>',
        trigger: "focus",
        placement: function (e, a) {
            return $(e).addClass("tutorial"), "top"
        },
        html: !0
    }),
    //     (".searchForm__btn").addClass("tutorial-target").popover({
    //     container: "body",
    //     content: '<div class="tutorial__close"></div><div class="tutorial__title">Шаг 4</div><div class="tutorial__text">Нажмите для поиска лучших билетов в вагонах ТКС</div><div><a href="#" class="btn tutorial__btn tutorial__next" data-next="5">Далее</a></div>',
    //     trigger: "manual",
    //     placement: function (e, a) {
    //         return $(e).addClass("tutorial"), "top"
    //     },
    //     html: !0
    // }),
        $(".btn-registration").addClass("tutorial-target").popover({
        container: "body",
        content: '<div class="tutorial__close"></div><div class="tutorial__title">Шаг 5</div><div class="tutorial__text">Зарегистрируйтесь в программе ТКС-Бонус и получайте бонусы за каждый купленный билет</div><div><a href="#" class="btn tutorial__btn tutorial__end">Завершить</a></div>',
        trigger: "manual",
        placement: function (e, a) {
            return $(e).addClass("tutorial"), "bottom"
        },
        html: !0
    }),
    // $(window).width() >= 767 && "1" != $.cookie("tutorial__close") && ($('.searchForm__field[name="from"]').popover("show"), $('.searchForm__field[name="from"]').focus()), $("body").on("click", ".tutorial__start", function () {
    //     $('.searchForm__field[name="from"]').popover("show"), $('.searchForm__field[name="from"]').focus()
    // }),
        $("body").on("click", ".tutorial__next", function (e) {
        e.preventDefault();
        var a = $(this).data("next");
        console.log(a), 2 == a ? ($('.searchForm__field[name="from"]').popover("hide"), $('.searchForm__field[name="to"]').focus(), $('.searchForm__field[name="to"]').popover("show")) : 3 == a ? ($('.searchForm__field[name="to"]').popover("hide"), $('.searchForm__field[name="date"]').focus(), $('.searchForm__field[name="date"]').popover("show")) : 4 == a ? ($('.searchForm__field[name="date"]').popover("hide"), $(".searchForm__btn").popover("show")) : 5 == a && ($.scrollTo(".header", 500), $(".searchForm__btn").popover("hide"), $(".btn-registration").popover("show"))
    }),
    // $("body").on("click", ".tutorial__close, .tutorial__end", function () {
    //     $(".tutorial-target").popover("hide"), $.cookie("tutorial__close", "1")
    // }),
    $.localScroll({hash: !0, offset: {top: -124, left: 0}}), $('[data-toggle="tooltip"]').tooltip()
});