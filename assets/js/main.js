(function($) {

	var	$window = $(window),
		$header = $('#header'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 1000);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}
	
	// Image Slider
    var customImageSlider = $('.custom-image-slider'),
        currentIndex = 0;

    function showImage(index) {
        var translateValue = -index * 100 + "%";
        customImageSlider.css('transform', 'translateX(' + translateValue + ')');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % customImageSlider.children.length;
        showImage(currentIndex);
    }

    // Change slide every 3 seconds (adjust as needed)
    var sliderInterval = setInterval(nextImage, 3000);

    // Optional: Pause on hover
    customImageSlider.on('mouseenter', function () {
        clearInterval(sliderInterval);
    });

    customImageSlider.on('mouseleave', function () {
        sliderInterval = setInterval(nextImage, 3000);
    });
	
	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350,
			baseZIndex: 100000
		});

	// Menu.
		$('<a href="#navPanel" class="navPanelToggle">Menu</a>')
			.appendTo($header);

		$(	'<div id="navPanel">' +
				'<nav>' +
					$('#nav') .navList() +
				'</nav>' +
				'<a href="#navPanel" class="close"></a>' +
			'</div>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

})(jQuery);

function toggleAccordion(row) {
	var content = row.nextElementSibling;
  
	// Toggle the visibility of the content row
	if (content.style.display === "table-row") {
	  content.style.display = "none";
	} else {
	  content.style.display = "table-row";
	}
  }