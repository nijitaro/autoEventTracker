(function($){
	/**
	 * autoEventTracker
	 * @param {String} action
	 * @param {Object} options
	 * @example
	   [example 1]
	   $(".selector").autoEventTracker("Action 1");
	   => pageTracker._trackEvent( $href_value$, "Action 1", $location_value$);
	   
	   [example 2]
	   $(".selector").autoEventTracker("Action 2", {trackSearch: true, trackHash: true})
	   => pageTracker._trackEvent( $href_value$, "Action 2", $location_value with Query and Hash$);
	 */
	$.fn.autoEventTracker = function (action, options) {
		var $target = $(this).find("a, area");
		$target.each(function(){
			$(this).click(function(){
				var opts = $.extend({}, $.fn.autoEventTracker.defaults, options);

				try {
					var pathname = location.pathname.replace(/^[^a-zA-Z0-9]/,"");
					var search = location.search;
					var hash = location.hash;
					var option_local = (function(){
						var str = pathname;
						if(opts.trackSearch) str += search;
						if(opts.trackHash) str += hash;
						return str;
					})();
					
					var category = (function(target){
						var str = "";
						if($.browser.msie && $.browser.version < 6){
							var str = target.getAttribute("href", 2)
						} else {
							var str = target.href;
						}
						return str;
					})(this);

					pageTracker._trackEvent( category, action, option_local );

				} catch(err) {}
			});
		});
		return this;
	};
	
	$.fn.autoEventTracker.defaults = {
		trackSearch: false,
		trackHash: false
	};

})(jQuery);
