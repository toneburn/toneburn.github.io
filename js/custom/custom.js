// [MASTER JAVASCRIPT]
//	Project     :	FITNESS Page
//	Version     :	1.0
//	Last Change : 	10/10/2017
//	Primary Use :   FITNESS Page
$(document).on('ready', function() {

    "use strict"; //Start of Use Strict
	var menu_bg = $('.menu-bg');
    if (menu_bg.length) {
		var menu_bar = $('.navbar-default');
		var top_nav = $('#top-nav');

		//After Scroll Menu Created, Menu Bgcolor and Text Color
		var x = top_nav.offset().top
		if (x > 0) {
			menu_bar.fadeIn().css({
				"background-color": "#000000",
				"box-shadow": "0px 0px 5px rgba(0,0,0,0.3)"
			});
		} else {
			menu_bar.css({
				"background-color": "rgba(0, 0, 0, 0.8)",
				"box-shadow": "none"
			});
		}

		$(document).on('scroll', function() {
			var y = $(this).scrollTop();
			if (y > 50) {
				menu_bar.fadeIn().css({
					"background-color": "#000000",
					"box-shadow": "0px 0px 5px rgba(0,0,0,0.3)"
				});
			} else {
				menu_bar.css({
					"background-color": "rgba(0, 0, 0, 0.8)",
					"box-shadow": "none"
				});
			}
		});


		//MENU BAR SMOOTH SCROLLING FUNCTION
		$('ul.nav a[href^="#"]').on('click', function(event) {
			if (!$(this).hasClass('dropdown-toggle')) {

				var toggle = $(".navbar-toggle").is(":visible");
				if (toggle) {
					$(".navbar-collapse").collapse('hide');
				}
				if ($($.attr(this, 'href')).length) {
					$('html, body').animate({
						scrollTop: $($.attr(this, 'href')).offset().top - 105
					}, 2000);
					return false;
				}
			}
			event.preventDefault();
		});
	}


    //FAQ ACCORDION
    var faq_main = $(".faq-main");
    if (faq_main.length) {
		 $('.faq-main .faq-title').on('click', function() {
			var $this = $(this)
			$(".faq-ans").slideUp();
			$('.plus-arrow').removeClass("minus-arrow");
			if ($this.next().css("display") == "none") {
				$this.next().slideToggle();
				$this.find('.plus-arrow').toggleClass("minus-arrow");
			}
		});
    }

    //CONTACT FORM VALIDATION
    if ($('.contact-form').length) {
        $('.contact-form').each(function() {
            $(this).validate({
                errorClass: 'error',
                submitHandler: function(form) {
                    $(form).find('input[type=submit]').prop('disabled', true).val("Sending ...");
                    $.ajax({
                        type: "POST",
                        url: "https://us-central1-tone-burn.cloudfunctions.net/leadEmail",
                        data: $(form).serialize(),
                        success: function(data) {
                            console.log(data);
                            if (data) {
                                $(form).find('.lead-form-fields').hide().css("display", "none");
                                $(form).find('.successMessage').show().css("display", "block");
                                if (typeof fbq == 'function') {
                                  fbq('track', 'Lead');
                                }
                            } else {
                                $(form).find('.lead-form-fields').hide().css("display", "none");
                                $(form).find('.serverFailMessage').show().css("display", "block");
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $(form).find('.failMessage').html('Error occurred');
                            $(form).find('.failMessage').show().css("display", "block");
                            $(form).find('.failMessage').delay(3000).fadeOut();
                        }
                    });
                }
            });
        });
    }

    // YOUTUBE BACKGROUND VIDEO FUNCTION
    var player = $('.player');
    if (player.length) {
        player.mb_YTPlayer();
    }

    //COUNTER JS
    if ($('.count').length) {
        $('.count').counterUp({
            delay: 10,
            time: 1000
        });
    }

    return false;

});
