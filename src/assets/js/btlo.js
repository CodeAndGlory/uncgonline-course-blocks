jQuery(document).ready(function ($) {
	$('.btlo').btlo();
});

jQuery(document).ready(
	(function ($) {
		jQuery.fn.btlo = function () {
			return this.each(function () {

				const $this = $(this); // reference to btlo
				const $btloNodes = $('.wp-block-uncgonline-block-btlo-node', $this); // all nodes
				let $currentNode = $($btloNodes[0]); // first node

				// get height of each btlo node
				let nodeHeights = $btloNodes.map(function ()
				{
					return $(this).outerHeight();
				}).get();

				// get max height
				let maxNodeHeight = Math.max.apply(null, nodeHeights);

				// set min-height of btlo to max height of the tallest node
				$this.css('min-height', maxNodeHeight);

				//hide all nodes
				$btloNodes.hide();
				// show first node
				$currentNode.show();

				// for each nav button in node
				// set click event to hide current node and show target node
				$('.btlo-nav-button', $btloNodes).on('click', function () {
					const targetNodeClientId = $(this).attr('data-targetnode'); // get target node id
					const $targetNode = $('[data-nodeclientid=' + targetNodeClientId + ']', $this); // reference of target node

					$currentNode.fadeOut(400, function(){
						$currentNode = $targetNode; // update current node
						$currentNode.fadeIn();
					});

				}); // end onClick

			}); // end this.each
		}; // end btlo()
	})(jQuery)
);
