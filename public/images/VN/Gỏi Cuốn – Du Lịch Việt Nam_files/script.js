//get_viewed_items_html...  
function get_viewed_items_html($current_product) {
	// saving current viewed-item 
	var jsonProducts = sessionStorage.getItem('products_viewed'); 
	var arrPro = {}; 
	if( jsonProducts != null  ) 
		arrPro = JSON.parse( jsonProducts );  
	else
	{
		sessionStorage.removeItem('products_viewed'); 
		sessionStorage.removeItem('products_viewed_indexing'); // must-have this LOC 
	}

	// var $current_product = ; // $current_product object, ko phải string...   
	if($current_product != null && arrPro[$current_product.id] == null) // null / undefined 
	{ 
		arrPro[$current_product.id] = $current_product;   
		sessionStorage.setItem('products_viewed', JSON.stringify( arrPro ));  // 


		// saving current index 
		var jsonProIndex = sessionStorage.getItem('products_viewed_indexing'); 

		var arrProIndex = []; 
		if( jsonProIndex != null )  
			arrProIndex = JSON.parse( jsonProIndex );  
		arrProIndex.unshift($current_product.id);  
		sessionStorage.setItem('products_viewed_indexing', JSON.stringify( arrProIndex ));  // 

	}


	var jsonProIndex = sessionStorage.getItem('products_viewed_indexing'); 
	var jsonProducts = sessionStorage.getItem('products_viewed'); 
	var arrProIndex = []; 
	var $strHTML = ''; 
	var $countViewedItem = 0; 
	var $intMaxViewedItems = ''; 
	if($intMaxViewedItems == '')
		$intMaxViewedItems = 3; 
	else 
		$intMaxViewedItems = parseInt($intMaxViewedItems); 
	if(jsonProIndex != null & jsonProducts != null & $current_product != null )
	{
		//parse indexing, products...  
		arrProIndex = JSON.parse(jsonProIndex);   
		arrPro = JSON.parse( jsonProducts );   

		// assign count_items = 0;
		for (i=0; i<arrProIndex.length; i++ )
		{

			$strProID = arrProIndex[i];  
			if( $current_product.id != $strProID && $strProID != null && $countViewedItem < $intMaxViewedItems)
			{ 

				var product_viewed = arrPro[$strProID];
				//console.log(product_viewed);
				var price = Haravan.formatMoney(product_viewed.price, "") + '' + ' đ</b>'; 
				var compare_price = Haravan.formatMoney(product_viewed.compare_at_price, "") + '' + ' đ</b>'; 
				var old_price = '';
				if (product_viewed.price < product_viewed.compare_at_price) {
					old_price = '<del>'+compare_price+'</del>';
				}
				// for (img_idx ; i<product_viewed.images.length; img_idx++) 

				$bo_found = true;  
				//product_viewed['images'][0]; 
				//==JSON.parse(localStorage.getItem('products_viewed'))['1000302443']['images'][0]		
				$strHTML += '<div class="spost clearfix"> <div class="entry-image">'
				+'<a href="'+ product_viewed.url + '" title="'+ product_viewed.title + '">'  
				+' <img' 
				+ ' u="image" '
				+' src="'+ product_viewed['images'][0] + '"'
				+' alt="'+ product_viewed.title + '"'
				+ ' data-big="'+ product_viewed['images'][0] + '"'
				+' data-title="'+ product_viewed.title + '"'
				+' data-description="'+ product_viewed.title + '"'
				+'/>' 
				+'</a>'
				+'</div>'
				+'<div class="entry-c">'
				+'<div class="entry-title">'
				+'<h4><a href="'+ product_viewed.url +'">'+ product_viewed.title +'</a></h4>'
				+'</div>'
				+'<ul class="entry-meta"><li class="color">'+ old_price +'<ins> '+price+'</ins></li></ul>'
				+'</div></div>'

				$countViewedItem = $countViewedItem + 1; 

			} //  
		} // endfor: arrProIndex   
	} // endif: jsonProIndex

	return $strHTML;
}// get_vied_items_html

// <<<<<< product BEGIN  
function refreshProductSelections($tagSelectOption0, $option0, $tagSelectOption1 , $option1, $tagSelectOption2, $option2) 
{
	if($option0 != null && $option0 != '')
	{ 	
		//change option 0  
		$($tagSelectOption0 + ' option[value="'+$option0+'"]').prop('selected', true); // option-0 => Shape...  okok 
		$($tagSelectOption0).change(); 
	}


	if($option1 != null && $option1 != '')
	{ 
		//change option 1  
		$($tagSelectOption1 + ' option[value="'+$option1+'"]').prop('selected', true); // option-1 => Color...  okok 
		$($tagSelectOption1).change();  
	}
	if($option2 != null && $option2 != '')
	{ 
		//change option 2
		$($tagSelectOption2 + ' option[value="'+$option2+'"]').prop('selected', true); // option-1 => Color...  okok 
		$($tagSelectOption2).change();  
	}
}

function update_variant(variant, $tagPrice, $tagPriceCompare, $tagAddToCart, $tagProductSection) 
{
	var $unit_price = 0; 
	var $unit_price_compare = 0; 
	if(variant != null && variant.available==true )
	{ 
		$unit_price = variant.price;
		if(variant.price < variant.compare_at_price){
			$unit_price_compare = variant.compare_at_price;  

			//show onsale label
			$($tagProductSection).find('.sticker-sale').removeClass('hidden');  
		} else{

			//hide onsale label... nono: find matching ids: ('[id^="ProductDetails"]')  
			$($tagProductSection).find('.sticker-sale').addClass('hidden');  
		}

		$($tagAddToCart).html('Thêm vào giỏ'); 
		$($tagAddToCart).removeAttr('disabled');  
	}   
	else{

		$($tagAddToCart).html('Hết hàng'); 
		$($tagAddToCart).prop('disabled', true); 
	}

	var $strUnitPrice = Haravan.formatMoney($unit_price, "") + 'đ';  // ''  shop.money_format
	var $strUnitPriceCompare = Haravan.formatMoney($unit_price_compare, "") + 'đ';  // ''  shop.money_format
	$($tagPrice).html($strUnitPrice); 
	if($unit_price_compare > 0)
	{
		$($tagPriceCompare).html($strUnitPriceCompare);   
	}
	else 
		$($tagPriceCompare).html('');   

	$($tagProductSection).find('.unit_price_not_formated').val($unit_price);    
	// update_total();
}

//ajax: add to cart 
function addItem(form_id) {
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		dataType: 'json',
		data: $('#'+form_id).serialize(),
		success: function(data) {
			Haravan.onSuccess(data, '#'+form_id)
		},
		error: function(XMLHttpRequest, textStatus) {
			Haravan.onError(XMLHttpRequest, textStatus);
		}
	});
}

Haravan.onSuccess = function(data, form_id) {
	addToCartPopup(data);
	//update top cart: qty, total price
	var $product_page = $(form_id).parents('[class^="product-page"]'); 
	var quantity = parseInt($product_page.find('[name="quantity"]').val(), 10) || 1;
	var $item_qty_new = 0; 
	var $item_price_new = 0; 
	var $item_price_increase = 0; 
	var $boUpdated = false; 

	//insert "no_item" html  
	if($('.top-cart-block .top-cart-content .top-cart-item').size() <= 0) 
	{
		$('.top-cart-block .top-cart-content').html(top_cart_no_item);  
	} 
	//update items 
	$('.top-cart-block .top-cart-content .top-cart-item').each(function(){	
		if($(this).find('.item_id').val() == $product_page.find('[name="id"]').val() ){
			$item_qty_new = parseInt($(this).find('.item_qty').val()) + quantity ;
			$item_price_single = parseFloat($(this).find('.item_unit_price_not_formated').val());
			$item_price_new = $item_qty_new * $item_price_single;   

			$item_price_increase = quantity * parseFloat($(this).find('.item_unit_price_not_formated').val());   
			$(this).find('.item_qty').val($item_qty_new);  // !!!
			$(this).find('.top-cart-item-quantity').html('x ' + $item_qty_new); 
			$(this).find('.top-cart-item-price').html(Haravan.formatMoney($item_price_new, "") + 'đ');  // ''  shop.money_format
			$boUpdated = true; // updated item 
		} 
	});

	if($boUpdated == false){ // current item is not existed!!!  
		var $proURL = $product_page.find('.product_url').val();
		var $proTitle = $product_page.find('.product_title_hd').val();
		var $proUnitPrice = parseFloat($product_page.find('.unit_price_not_formated').val());
		var $strNewItem = '<div class="top-cart-item clearfix">'
		+ ' <input type="hidden" class="item_id" value="'+ $product_page.find('[name="id"]').val() +'"></input>'  
		+ ' <input type="hidden" class="item_qty" value="'+ quantity +'"></input>' 
		+ ' <input type="hidden" class="item_unit_price_not_formated" value="'+ $proUnitPrice +'"></input>' 

		+ '<div class="top-cart-item-image">'
		+ ' <a href="'+ $proURL +'"><img src="'+ $product_page.find('.product_img_small').val() +'" alt="'+ $proTitle +'" ></a>'
		+ '</div>'
		+ '<div class="top-cart-item-desc">'
		//+ ' <span class="cart-content-count">x'+ quantity +'</span>'
		+ '<a href="'+ $proURL +'">' + $proTitle + '</a>'
		+ '<span class="top-cart-item-price">'+ Haravan.formatMoney($proUnitPrice * quantity, "") + 'đ' +'</span>' 
		+ '<span class="top-cart-item-quantity">x '+ quantity +'</span>'
		+'<a class="top_cart_item_remove" onclick = "deleteCart('+ $product_page.find('[name="id"]').val() +');"><i class="fa fa-times-circle"></i></a>'
		+ ' </div>'
		+ '</div>';
		$('.top-cart-block .top-cart-content .top-cart-items').append($strNewItem); 
		$item_price_increase = $proUnitPrice * quantity; 

	}  
	//check is emptiness...   
	check_topcart_empty();  

	//update total 
	var $quantity_new = parseInt($('.top-cart-block #top-cart-trigger span').text()) + quantity;  
	var $price_new = parseFloat($('.top-cart-block .top_cart_total_price_not_format').val()) + $item_price_increase;  
	$('.top-cart-block .top_cart_total_price_not_format').val($price_new);  // !!!
	// top cart total quantity
	$('.top-cart-block #top-cart-trigger span').html($quantity_new); 
	// scroll cart total quantity
	$('.scroll_cart span').html($quantity_new);
	$('.top-cart-block .top-checkout-price').html(Haravan.formatMoney($price_new, "") + 'đ'); 	

};

var top_cart_empty = '<div> Chưa có sản phẩm trong giỏ!</div>';  
var top_cart_no_item = ''; 
function check_topcart_empty(){  

	//Bạn chưa mua sản phẩm nào! 
	if($('.top-cart-block .top-cart-content .top-cart-item').size() <= 0) 
	{		
		top_cart_no_item = $('.top-cart-block .top-cart-content').html();   
		$('.top-cart-block .top-cart-content').html(top_cart_empty); 
		$('.top-cart-block .top-cart-content').css('width', '200px'); 
	}
	else{
		//remove width, okok!!! 
		$('.top-cart-block .top-cart-content').css('width', '');
	}
}
jQuery(document).ready(function($){

	//select first size&color. 
	//second item: $($("#colorPicker option").get(1))...  
	$("#sizePicker option:first").attr('selected', 'selected'); 
	$("#colorPicker option:first").attr('selected', 'selected'); 

	// function: choose size  
	$('#option-0 select').change(function(){
		var $size = $(this).val(); 
		var $color = $('#option-1 select').val();
		var $material	= $('#option-2 select').val();
		var $tagSelectOption0 = '#product-select-option-0'; 
		var $tagSelectOption1 = '#product-select-option-1'; 
		var $tagSelectOption2 = '#product-select-option-2'; 

		refreshProductSelections($tagSelectOption0, $size, $tagSelectOption1 , $color,$tagSelectOption2 , $material);
	});

	// function: choose color  
	$('#option-1 select').change(function(){
		var $size = $('#option-0 select').val(); 
		var $color = $(this).val();
		var $material	= $('#option-2 select').val();  
		var $tagSelectOption0 = '#product-select-option-0'; 
		var $tagSelectOption1 = '#product-select-option-1'; 
		var $tagSelectOption2 = '#product-select-option-2'; 

		refreshProductSelections($tagSelectOption0, $size, $tagSelectOption1 , $color,$tagSelectOption2 , $material);
	});

	// function: choose material
	$('#option-2 select').change(function(){
		var $size = $('#option-0 select').val(); 
		var $color = $('#option-1 select').val();
		var $material = $(this).val();  
		var $tagSelectOption0 = '#product-select-option-0'; 
		var $tagSelectOption1 = '#product-select-option-1'; 
		var $tagSelectOption2 = '#product-select-option-2'; 

		refreshProductSelections($tagSelectOption0, $size, $tagSelectOption1 , $color,$tagSelectOption2 , $material);
	});

	$("#option-0 select option:first").attr('selected', 'selected'); 
	$("#option-1 select option:first").attr('selected', 'selected'); 
	$("#option-2 select option:first").attr('selected', 'selected'); 
	var $size = $("#option-0 select option:first").val(); 
	var $color = $("#option-1 select option:first").val();
	var $material	= $("#option-2 select option:first").val();
	var $tagSelectOption0 = '#product-select-option-0'; 
	var $tagSelectOption1 = '#product-select-option-1'; 
	var $tagSelectOption2 = '#product-select-option-2'; 

	refreshProductSelections($tagSelectOption0, $size, $tagSelectOption1 , $color,$tagSelectOption2 , $material);


	//add to cart 
	/*$(".add-to-cart").on('click', function(e) {  //.click(function(e){ // 
		e.preventDefault();
		addItem('ProductDetailsForm');
	});*/ 

	//add to cart for QuickView
	$("#addtocartQV").on('click', function(e) {  //.click(function(e){ // 
		e.preventDefault();
		addItem('ProductDetailsFormQV');

	});

	//check empty for top-cart... 
	check_topcart_empty(); 

	//change qty... 
	$('.product-quantity input.quantity').on('change', function(){
		var $qty = parseInt($(this).val()); 
		if($qty <= 0){
			$(this).parents('[class^="product-page"]').find('[id^="addtocart"]').addClass('disabled'); 
		}
		else{
			$(this).parents('[class^="product-page"]').find('[id^="addtocart"]').removeClass('disabled'); 
		}
	});
	// buy now
	$('.buynow').on('click', function(e) {
		var form = $(this).closest('form').attr('id');
		e.preventDefault();
		buyNow(form);
	});
	// end buy now
	$('.scroll_buynow a').on('click', function(e) {
		e.preventDefault();
		$('.single-product .buynow').click();
	})
});  

// >>>>>> product END

// buy now 
function buyNow(form) {
	var varArr = {};
	var totalQty = 0;
	var note = '';
	$.each($('#'+form).find('.pd_variants_content ul.variant_list'), function(i,v) {
		if(parseInt($(this).find('[name="quantity"]').val()) > 0) {
			var id = $(this).find('[name="id"]').val();
			var quantity = $(this).find('[name="quantity"]').val();
			totalQty += parseInt(quantity);
			varArr[id] = quantity;
		}
	});
	if(totalQty <= 0) {
		alert('Vui lòng nhập số lượng Tour')
	}
	else {
		var countItem = 0;
		var size = Object.keys(varArr).length;
		var departureDate = $('#'+form).find('#dateDepartured').val();
		note = (departureDate != undefined || departureDate != null) ? 'ngayKhoiHanh_'+departureDate : '';
		var callback = function(line_item) {
			setTimeout(function() {
				if(countItem == size) {
					Haravan.updateCartNote(note, redirectToCart);
				}
			}, 500);
		}
		var redirectToCart = function() {
			window.location.href='/checkout'
		}
		var clearCart = function() {
			for(var v in varArr) {
				countItem += 1;
				addMultiItems(v, varArr[v], callback);
			}
		}
		//Haravan.clear(clearCart);
		clearCart();
	}
}

function addMultiItems(variantId, quantity, callback) {
	jQuery.ajax({
		url: '/cart/add.js', 
		data: {quantity: quantity,id: variantId},
		type: 'POST', 
		async: false,
		success: function(line_item) { 
			if ((typeof callback) === 'function') {
				callback(line_item);
			}
			else {
				Haravan.onItemAdded(line_item);
			}
		},
	});
}

// quick delete cart

function getCartAjax(){
	var cart = null;
	jQuery.getJSON('/cart.js', function(cart, textStatus) {
		if(cart)
		{
			var html = '';
			// update item for top cart
			$.each(cart.items,function(i,item) {
				html += '<div class="top-cart-item clearfix"> '
				+'<input type="hidden" class="item_id" value="'+ item.variant_id +'">'
				+'<input type="hidden" class="item_qty" value="'+ item.quantity +'">'
				+'<input type="hidden" class="item_unit_price_not_formated" value="' + item.price + '">'
				+'<div class="top-cart-item-image">'
				+'<a href="'+ item.url +'">'
				+'<img src="'+ Haravan.resizeImage(item.image,'small') +'" alt="' + item.product_title + '"></a>'
				+'</div>'
				+'<div class="top-cart-item-desc">'
				+'<a href="'+ item.url +'">' + item.product_title + '</a>';
				if ( typeof(formatMoney) != 'undefined' ){
					html += '<span class="top-cart-item-price">' + Haravan.formatMoney(cart.total_price, formatMoney) + '</span>';
				}
				else {
					html += '<span class="top-cart-item-price">' + Haravan.formatMoney(cart.total_price, "") + ' đ' + '</span>';
				}
				html +='<span class="top-cart-item-quantity">x '+ item.quantity +'</span>'
				+'<a class="top_cart_item_remove" onclick = "deleteCart('+ item.variant_id +');"><i class="fa fa-times-circle"></i></a>'
				+'</div></div>';
			});
			if(cart.item_count > 0){
				$('.top-cart-items').html(html);
				$('.top-cart-block #top-cart-trigger span').html(cart.item_count);
				$('.top-cart-block .top-checkout-price').html(Haravan.formatMoney(cart.total_price, "") + 'đ'); 	
			}
			else {
				$('.top-cart-block #top-cart-trigger span').html(cart.item_count);
				$('.top-cart-block .top-cart-content').html(top_cart_empty); 
				$('.top-cart-block .top-cart-content').css('width', '220px'); 
			}
		}
		else {
			$('.top-cart-block .top-cart-content').html(top_cart_empty);
			$('.top-cart-block .top-cart-content').html(top_cart_empty); 
			$('.top-cart-block .top-cart-content').css('width', '200px'); 
		}
	});

}

// delete cart
function deleteCart(variant_id) {
	var params = {
		type: 'POST',
		url: '/cart/change.js',
		data: 'quantity=0&id=' + variant_id,
		dataType: 'json',
		success: function(cart) {
			getCartAjax();
		},
		error: function(XMLHttpRequest, textStatus) {
			Haravan.onError(XMLHttpRequest, textStatus);
		}
	};
	jQuery.ajax(params);
}

// add to cart popup
/**
 * Popup notify add-to-cart
 */
function notifyProduct($info){
	var wait = setTimeout(function(){
		$.jGrowl($info,{
			life: 5000
		});	
	});
}

function addToCartPopup(jqXHR, textStatus, errorThrown) {
	$.ajax({
		type: 'GET',
		url: '/cart.js',
		async: false,
		cache: false,
		dataType: 'json',
		//success: updateCartDesc
	});

	var $info = '<div class="row"><div class="col-md-4"><a href="'+ jqXHR['url'] +'"><img width="70px" src="'+ Haravan.resizeImage(jqXHR['image'], 'small') +'" alt="'+ jqXHR['title'] +'"/></a></div><div class="col-md-8"><div class="jGrowl-note"><a class="jGrowl-title" href="'+ jqXHR['url'] +'">'+ jqXHR['title'] +'</a><ins>'+ Haravan.formatMoney(jqXHR['price'], "") + '' + ' đ' +'</ins></div></div></div>';
	//notifyProduct($info);
}


/*
* Tu.Nguyen
* v.1.0 20160728
* EGA lazyload
*/
var lazyLoad = function() {
	var lazyLoadEl = $('[data-lazyload]');
	lazyLoadEl.each( function(){
		var element = $(this),
				elementImg = element.attr( 'data-lazyload' );
		element.attr({"width": "100%", "height": "100%" });
		element.appear(function () { 
			element.css({'background': 'none', 'content': 'normal' })
			.removeAttr('width height')
			.attr('src', elementImg);
		}, {accX: 0, accY: 120},'easeInCubic');
	});
}

var accordions = function(){
	var $accordionEl = $('.accordion');
	if( $accordionEl.length > 0 ){
		$accordionEl.each( function(){
			var element = $(this),
					elementState = element.attr('data-state'),
					accordionActive = element.attr('data-active');

			if( !accordionActive ) { accordionActive = 0; } else { accordionActive = accordionActive - 1; }

			element.find('.acc_content').hide();

			if( elementState != 'closed' ) {
				element.find('.acctitle:eq('+ Number(accordionActive) +')').addClass('acctitlec').next().show();
			}

			element.find('.acctitle').click(function(){
				if( $(this).next().is(':hidden') ) {
					element.find('.acctitle').removeClass('acctitlec').next().slideUp("normal");
					$(this).toggleClass('acctitlec').next().slideDown("normal");
				}
				return false;
			});
		});
	}
}

var superfishMenu = function(){

	if ( $().superfish ) {
		if( $('body').hasClass('device-lg') || $('body').hasClass('device-md') ) {
			$('#primary-menu ul ul, #primary-menu ul .mega-menu-content').css('display', 'block');
			//SEMICOLON.header.menuInvert();
		}

		$('body:not(.side-header) #primary-menu > ul, body:not(.side-header) #primary-menu > div > ul,.top-links > ul').superfish({
			popUpSelector: 'ul,.mega-menu-content,.top-link-section',
			delay: 250,
			speed: 350,
			animation: {opacity:'show'},
			animationOut:  {opacity:'hide'},
			cssArrows: false
		});

		$('body.side-header #primary-menu > ul').superfish({
			popUpSelector: 'ul',
			delay: 250,
			speed: 350,
			animation: {opacity:'show',height:'show'},
			animationOut:  {opacity:'hide',height:'hide'},
			cssArrows: false
		});
	}
}
/*
  * Tu.Nguyen
  * v.1.0 20160922
  * goToTop()
  * Go To Top
  */
goToTop = function(options) {
	var goTopEl = $('#gotoTop'),
			elementScrollSpeed = 700,
			elementScrollEasing = 'swing',
			elementOffset = 450;

	var goToTopShow = function() {
		if( $(window).scrollTop() > Number(elementOffset) ) {
			goTopEl.fadeIn();
		} 
		else {
			goTopEl.fadeOut();
		}
	};
	var goToTopScroll = function() {
		goTopEl.click(function() {
			$('body, html').stop(true).animate({
				'scrollTop': 0
			}, elementScrollSpeed, elementScrollEasing);
			return false;
		});
	};

	$(window).on('scroll', goToTopShow);
	goToTopScroll();
}

document.addEventListener('DOMContentLoaded', function() {
	lazyLoad();
	accordions();
	superfishMenu();
	goToTop()
})

$(document).ready(function(){
	$( "#hotel_search_input" ).focus(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$("#hotel_suggestion").show();
	});

	$( "body").click(function(e) {

		if(!$(e.target).is('#hotel_search_input')) {
			$("#hotel_suggestion").hide();
		}
	});

	var swiper = new Swiper('.hotel_page_slide .swiper-container', {
		pagination: {
			el: '.hotel_page_slide .swiper-pagination',
			clickable:true,
		},
		loop:true,
	});

	$(".bovaoinput a").click(function(e){
		e.preventDefault();
		var title = $(this).html();
		var link = $(this).attr("href");
		$(".hotel_search_input").val(title);
		$(".hotel_search_input").attr("dataref",link);
	})

	$(".mypagehotel form").submit(function(e){
		e.preventDefault();
		var $checkin_date = $(this).find("#datepicker_chkin");
		var $checkout_date = $(this).find("#datepicker_chkout");
		sessionStorage.setItem('checkinDate', $checkin_date.val());
		sessionStorage.setItem('checkoutDate', $checkout_date.val());
		var url = $(this).find(".hotel_search_input").attr("dataref");
		window.location.href = url;
	})


	$( ".datepicker" ).datepicker({
		dateFormat: 'dd-mm-yy',
		currentText: $.datepicker.formatDate('dd-mm-yy', new Date()),
		minDate: 0
	});
	$( ".datepicker.today" ).datepicker().datepicker("setDate", new Date());

	if ($.datepicker != undefined) {
		$.datepicker.setDefaults($.datepicker.regional['vn']);
	}
	var today = new Date();
	var checkin_date = new Date(today.getTime() + 24 * 2 * 60 * 60 * 1000);
	var checkout_date = new Date(checkin_date.getTime() + 24 * 60 * 60 * 1000);
	var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
	var nextDay = new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000);
	$('#dateDepartured').datepicker("setDate", checkin_date);

	if(typeof sessionStorage.checkinDate != 'undefined') {
		$('#datepicker_chkin').datepicker("setDate", sessionStorage.checkinDate);
	}
	else {
		$('#datepicker_chkin').datepicker("setDate", checkin_date);
	}
	if(typeof sessionStorage.checkoutDate != 'undefined') {
		$('#datepicker_chkout').datepicker("setDate", sessionStorage.checkoutDate);
	}
	else {
		$('#datepicker_chkout').datepicker("setDate", checkout_date);
	}

	
$('.search_form.hkt1').submit(function(e) {
	e.preventDefault();
	var tour = $(this).find(".tour_group").val();	
	var noikhoihanh = $(this).find(".noikhoihanh").val();	
	var noiden = $(this).find(".noiden").val();	
	var ngaydi = $(this).find(".ngaydi").val();

	var urltour = "&&(tag:product**"+tour+")";
	var noikhoihanhurl = "&&(tag:product**"+noikhoihanh+")";
	var noidenurl = "&&(tag:product**"+noiden+")";
	var ngaydiurl = "&&(tag:product**"+ngaydi+")";
	if(tour == ''){
		urltour = "";
	}
	if(noikhoihanh == ''){
		noikhoihanhurl = "";
	}
	if(noiden == ''){
		noidenurl = "";
	}
	if(ngaydi == ''){
		ngaydiurl = "";
	}
	var filterUrl = "/search?q=filter=((collectionid:product>0)"+encodeURIComponent(urltour)+""+encodeURIComponent(noikhoihanhurl)+""+encodeURIComponent(noidenurl)+""+encodeURIComponent(ngaydiurl)+")";
	if(noikhoihanh == '' && noiden == '' && ngaydi == '' && tour == '' ){
		alert("bạn phải chọn ít nhất 1 loại fillter");
	}else{
		location.href = filterUrl;
	}

})

$('.search_form.hkt2').submit(function(e) {
	e.preventDefault();
	var tour = $(this).find(".tour_group").val();	
	var noikhoihanh = $(this).find(".ngayden").val();	
	var noiden = $(this).find(".ngaydi").val();	
	var ngaydi = $(this).find(".nhomstour").val();

	var urltour = "&&(tag:product**"+tour+")";
	var noikhoihanhurl = "&&(tag:product**"+noikhoihanh+")";
	var noidenurl = "&&(tag:product**"+noiden+")";
	var ngaydiurl = "&&(tag:product**"+ngaydi+")";
	if(tour == ''){
		urltour = "";
	}
	if(noikhoihanh == ''){
		noikhoihanhurl = "";
	}
	if(noiden == ''){
		noidenurl = "";
	}
	if(ngaydi == ''){
		ngaydiurl = "";
	}
	var filterUrl = "/search?q=filter=((collectionid:product>0)"+encodeURIComponent(urltour)+""+encodeURIComponent(noikhoihanhurl)+""+encodeURIComponent(noidenurl)+")";
	if(noikhoihanh == '' && noiden == '' && tour == '' ){
		alert("bạn phải chọn ít nhất 1 loại fillter");
	}else{
		location.href = filterUrl;
	}

})






})

















