jQuery.fn.piscoToolTip = function(options) {

	var defaults = {
		id: 'piscoToolTip',
		className: 'tooltip',
		position: 'bottom',
		separation: 10,
		delay: 0
	}
	
	var options = $.extend(defaults, options);
	
	var bubble = function(options){};
	
	$(this).each(function() {
					
		$(this).hover(function() {
			$this = $(this);
			title = $this.attr('title');
			if(title) createBubble();
		}, function(){
			destroyBubble();
		});
		
		function createBubble() {
			$this.attr('title', '');
			bubble.content = $("<div id='" + options.id + "' class='" + options.className + "'><div class='cont'>" + title + "</div></div>").appendTo(document.body).hide();
			offset = $this.offset();
			height = $this.height();
			bubbleHeight = bubble.content.height();
			bubbleWidth = bubble.content.width();
			width = $this.width();
			switch(options.position) {
				case 'right':
					posX = offset.left + width + 10 + options.separation;
					posY = offset.top + (height/2) - (bubbleHeight/2);		
					$('#'+options.id+' .cont').before("<span class='arrow arrowLeft'></span>");
					break;
				case 'left':
					posX = offset.left - bubbleWidth - 10 - options.separation;
					posY = offset.top + (height/2) - (bubbleHeight/2);
					$('#'+options.id+' .cont').before("<span class='arrow arrowRight'></span>");
					break;
				case 'top':
					posX = offset.left + (width/2);
					posY = offset.top - bubbleHeight - options.separation;
					$('#'+options.id+' .cont').after("<span class='arrow arrowTop'></span>");
					break;
				default: //case 'bottom'
					posX = offset.left + (width/2);
					posY = offset.top + height + options.separation;
					$('#'+options.id+' .cont').before("<span class='arrow arrowBottom'></span>");
			}
			bubble.content.css({top: posY, left: posX});
			bubble.content.show(options.delay);
		}
		
		function destroyBubble() {
			$this.attr('title', title);
			bubble.content.remove();
		}
		
	});
	
}