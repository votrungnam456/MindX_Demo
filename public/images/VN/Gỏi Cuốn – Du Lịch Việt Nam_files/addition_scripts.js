//responsive menu
$("#menu-toggle").click(function(e) {
	var $moveOnMenuOpen = $('#wrapper, #menu-wrapper, #header, #body_overlay, #menu-toggle');
	e.preventDefault();
	$moveOnMenuOpen.toggleClass("toggled");
});

$("#body_overlay").click(function(e) {
	e.preventDefault();
	var $showNav = $('#wrapper, #menu-wrapper, #header, #body_overlay, #menu-toggle,.sidebar_toggle');
	$showNav.removeClass("toggled");
});
//end responsive menu 

/** side toggle **/
$('.sidebar_trigger').click(function(e) {
	e.preventDefault();
	var $showSidebar = $('html, body, #wrapper, #header, #top-search-trigger, #body_overlay, .sidebar_toggle');
	$showSidebar.toggleClass("toggled");
})

/** end side toggle **/


/** search trigger **/
$('.search_trigger').click(function() {
	$('.search_index').toggle('slow');
})
/** end search trigger **/

// top link toggle
$(window).load(function() {
	if($(window).width() <= 991) {
		$(document).click(function() {
			$('.top-links').hide();
		});
		$('#top_link_trigger').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$('.top-links').toggle();
		});
	}
});
// end top link toggle

// change state of collapse arrow
$('.filter_group a').click(function() {
	$(this).find('i').toggleClass('icon-angle-down');
	$(this).find('i').toggleClass('icon-angle-right');
});
// end change state of collapse arrow

// mark the chosen color
$('.color_block').click(function() {
	$(this).parent().toggleClass('bordercolor');
});
// end mark the chosen color 


/*** top search ***/

$(window).load(function() {
	$(this).scroll(function() {
		if($('#header').hasClass('sticky-header')) {
			$('.top_search').addClass('top_search_sticker');
		}
		else {
			$('.top_search').removeClass('top_search_sticker');
		}
	});
});


/*** four proudct group ***/
$(window).load(function() {
	if($(window).width() <= 767) {
		$(document).click(function() {
			$('.tab_nav_mb').hide();
		});
		$('.index_group_btn').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).next('.tab_nav_mb').toggle();
		});
		$('.tab_nav_mb li a').click(function(e) {
			$(this).parents('.tab_nav_mb').prev().html($(this).html()+' <i class="fa-caret-down fa"></i>');
		});
	}
});