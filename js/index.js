jQuery(document).ready(function($){
  //init
	var secondaryNav = $('.navbar'),
		 secondaryNavTopPosition = secondaryNav.offset().top,
		 taglineOffesetTop = $('#intro_text').offset().top + $('#intro_text').height() + parseInt($('#intro_text').css('paddingTop').replace('px', '')),
		contentSections = $('.section');
//on scroll
	$(window).on('scroll', function(){
		( $(window).scrollTop() > taglineOffesetTop ) ? $('#logo, .pageBtn').addClass('is-hidden') : $('#logo, .pageBtn').removeClass('is- hidden');
		if($(window).scrollTop() > secondaryNavTopPosition ) {
			secondaryNav.addClass('is-fixed');
			$('.main').addClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.addClass('animate-children');
	            $('#logo').addClass('slide-in');
				$('.pageBtn').addClass('slide-in');
	        }, 50);
		} else {
			secondaryNav.removeClass('is-fixed');
			$('.main').removeClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.removeClass('animate-children');
	            $('#logo').removeClass('slide-in');
				$('.pageBtn').removeClass('slide-in');
	        }, 50);
		}

		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
		});
	}
	$('.trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find('ul').toggleClass('is-visible');
	});
	secondaryNav.find('ul a').on('click', function(event){
        event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
        	'scrollTop': target.offset().top - secondaryNav.height() + 1
        	}, 400
        );
        $('.trigger').removeClass('menu-is-open');
        secondaryNav.find('ul').removeClass('is-visible');
    });
	$('.main-nav').on('click', function(event){
		if($(event.target).is('.main-nav')) $(this).children('ul').toggleClass('is-visible');
	});
});
