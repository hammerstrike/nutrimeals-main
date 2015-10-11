(function ($) {
	"use strict";
    var mobileWidth = $(window).width() < 768;
	// Page Loaded...
	$(document).ready(function () {


        if(mobileWidth){$('header.header').removeClass('branded')}

        /*==========  Common Code  ==========*/
        $('.big-overlay').on('click',function(){
            overlaySH('hide');
            if($('.responsive-menu').hasClass('open')){
                $('.responsive-menu-close').trigger('click');
            }
        });

        /* Animate Effects : after 2 seconds*/
        setTimeout(function(){
            //logo animation
            $('.slidee-logo').css({"display":"block"}).addClass('flipInY animated');
            $('header.header').delay(100).fadeIn(800);
        },100);

		/*==========  Responsive Navigation  ==========*/
		$('.main-nav').children().clone().appendTo('.responsive-nav');
		$('.responsive-menu-open').on('click', function(event) {
			event.preventDefault();
			$('body').addClass('no-scroll');
			$('.responsive-menu').addClass('open');
            $('.responsive-menu').fadeIn(500,function(){
                console.log(mobileWidth);
                if(mobileWidth){
                    $('.responsive-nav ul li').fadeIn(300);
                }else{
                    $('.responsive-nav ul li').css({"display":"inline-block"}).addClass('flipInY animated');
                }

            });
            overlaySH('show');
			return false;
		});
		$('.responsive-menu-close').on('click', function(event) {
			event.preventDefault();
			$('body').removeClass('no-scroll');
			$('.responsive-menu').removeClass('open');
            $('.responsive-menu').fadeOut(500);
            $('.responsive-nav ul li').css({"display":"none"}).removeClass('flipInY animated');
            overlaySH('hide');
			return false;
		});

		/*==========  Specialty Slider  ==========*/
		$('.specialties-slider').owlCarousel({
			loop: true,
			autoplay: true,
            animateOut:(mobileWidth) ? false :'fadeOut',
			margin: 30,
			nav: true,
			dots: false,
            smartSpeed:400,
			navText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
			responsive: {
				0: {
					items: 1
				}
			}
		});

		/*==========  Gallery  ==========*/
		var $galleryContainer = $('#gallery').imagesLoaded(function() {
			$galleryContainer.isotope({
				itemSelector: '.item',
				layoutMode: 'masonry',
				percentPosition: true,
				masonry: {
					columnWidth: $galleryContainer.find('.gallery-sizer')[0]
				}
			});
			return false;
		});
		$('.gallery .button').nivoLightbox();

		/*==========  Welcome Slider  ==========
		$('#welcome-slider').flexslider({
			selector: '.slides > .slide',
			controlNav: false,
            directionNav: false,
			pauseOnHover: false,
			smoothHeight: true
		});
        /*/


        /* Page Specific */
        var $page = $('#page-info').attr('data-page');


        switch($page){

            case 'home' :
                break;

            case 'recipes' :
            	var fd = new FormData();
            	fd.append("data",JSON.stringify({ crud : "list" }));
                /* Ajax call for recipes json */
							var data = "url=admin.nutrimeals.co.in/nutriCRUD.php&crud=list&list_active_only=true"
                $.ajax({
					method: "POST",
  					url: "curl.php",
  					data: data,//{"data":JSON.stringify({ url :"admin.nutrimeals.co.in/nutriCRUD.php", crud : "list" })},
  					success : function(data){
  						console.log(data);
							console.log(typeof(data));
  						var $recipeHtml = '',
                        val = data;
	                    for(var i = 0 ; i< val.length ; i++ ){
	                        //console.log((val[i])[key]);
	                        $recipeHtml += '<div class="col-sm-4 col-md-3">';
	                            $recipeHtml += '<div class="recipe">';
	                                $recipeHtml += '<div class="image">';
	                                    $recipeHtml += '<img src="http://admin.nutrimeals.co.in/images/new_recipes/'+(val[i])['thumb']+'" alt="alt text here" class="img-responsive">';
	                                $recipeHtml += '</div>';
	                                $recipeHtml += '<h5>'+(val[i])['name']+'</h5>';
	                                $recipeHtml += '<p><strong>Ingredients:</strong> '+(val[i])['ingredients']+'</p>';
	                            $recipeHtml += '</div>';
	                        $recipeHtml +='</div>';
	                    }
  						$('#recipes-row').html($recipeHtml);

  					},
  					error : function(){
  						console.log("Something wrong");
  					}
				})
				.done(function(data) {

				});
               /* $.getJSON("js/recipes.json", function( data ) {

                    var $recipeHtml = '',
                        val = data.recipes;
                    for(var i = 0 ; i< val.length ; i++ ){
                        //console.log((val[i])[key]);
                        $recipeHtml += '<div class="col-sm-4 col-md-3">';
                            $recipeHtml += '<div class="recipe">';
                                $recipeHtml += '<div class="image">';
                                    $recipeHtml += '<img src="images/'+(val[i])['thumb']+'" alt="alt text here" class="img-responsive">';
                                $recipeHtml += '</div>';
                                $recipeHtml += '<h5>'+(val[i])['name']+'</h5>';
                                $recipeHtml += '<p><strong>Ingredients:</strong> '+(val[i])['ingredients']+'</p>';
                            $recipeHtml += '</div>';
                        $recipeHtml +='</div>';

                    }
                    //console.log($recipeHtml);
                    $('#recipes-row').html($recipeHtml);
                });  */

                break;

            case 'faqs' :
                /* Ajax call for recipes json */
                $.getJSON("js/faq.json", function( data ) {

                    var $faqHtml = '',
                        val = data.faqs;
                    for(var i = 0 ; i< val.length ; i++ ){
                        //console.log((val[i])[key]);
                        $faqHtml += '<li class="">';
                            $faqHtml += '<a class="cd-faq-trigger" href="javascript:void(0)">'+(val[i])['q']+'</a>';
                            $faqHtml += '<div class="cd-faq-content">'
                                $faqHtml += '<p>'+(val[i])['a']+'</p>'
                            $faqHtml += '</div>'
                        $faqHtml += '</li>';
                    }
                    //console.log($recipeHtml);
                    $('#faqs-block').html($faqHtml);
                });

                /* FAQs accordion */
                $('body').on('click','#faqs-block .cd-faq-trigger',function(){

                    $('#faqs-block .cd-faq-trigger').not($(this)).removeClass('active');
                    $('.cd-faq-content').not($(this).next()).slideUp(300);
                    $(this).toggleClass('active').next().slideToggle(300);

                });
                break;
        }

	});

	/*==========  Validate Email  ==========*/
	function validateEmail($validate_email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $validate_email ) ) {
			return false;
		} else {
			return true;
		}
		return false;
	}

	/*==========  Contact Form  ==========*/
	$('#contact-form').on('submit', function() {
		$('#contact-error').fadeOut();
		$('#contact-success').fadeOut();
		$('#contact-loading').fadeOut();
		$('#contact-loading').fadeIn();
		if (validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			var action = $(this).attr('action');
			$.ajax({
				type: "POST",
				url : action,
				data: {
					contact_name: $('#contact-name').val(),
					contact_email: $('#contact-email').val(),
					contact_message: $('#contact-message').val()
				},
				success: function() {
					$('#contact-error').fadeOut();
					$('#contact-success').fadeOut();
					$('#contact-loading').fadeOut();
					$('#contact-success .message').html('Success! Thanks for contacting us!');
					$('#contact-success').fadeIn();
				},
				error: function() {
					$('#contact-error').fadeOut();
					$('#contact-success').fadeOut();
					$('#contact-loading').fadeOut();
					$('#contact-error .message').html('Sorry, an error occurred.');
					$('#contact-error').fadeIn();
				}
			});
		} else if (!validateEmail($('#contact-email').val()) && $('#contact-email').val().length !== 0 && $('#contact-name').val().length !== 0 && $('#contact-message').val().length !== 0) {
			$('#contact-error').fadeOut();
			$('#contact-success').fadeOut();
			$('#contact-loading').fadeOut();
			$('#contact-error .message').html('Please enter a valid email.');
			$('#contact-error').fadeIn();
		} else {
			$('#contact-error').fadeOut();
			$('#contact-success').fadeOut();
			$('#contact-loading').fadeOut();
			$('#contact-error .message').html('Please fill out all the fields.');
			$('#contact-error').fadeIn();
		}
		return false;
	});

	/*==========  Map  ==========*/
	var map;
	function initialize_map() {
		if ($('.map').length) {
			var myLatLng = new google.maps.LatLng(-37.814199, 144.961560);
			var mapOptions = {
				zoom: 15,
				center: myLatLng,
				scrollwheel: false,
				panControl: false,
				zoomControl: false,
				scaleControl: false,
				mapTypeControl: false,
				streetViewControl: false
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Envato'
			});
		} else {
			return false;
		}
		return false;
	}
	//google.maps.event.addDomListener(window, 'load', initialize_map);

    /* Window */
    $(window).scroll(function(){
    	if(mobileWidth){
        	($(window).scrollTop() >50) ?  $('.header').addClass('branded')  : $('.header').removeClass('branded');
        }
    });

    /*
        function    : overlaySH
        arguments   : (flag)  --> flag = show | hide
    */
    function overlaySH(f){
         switch(f){

             case 'show' :
                $('.big-overlay').fadeIn(500);
                break;

             case 'hide' :
                $('.big-overlay').fadeOut(500);
                break;
         };
    }

})(jQuery);
