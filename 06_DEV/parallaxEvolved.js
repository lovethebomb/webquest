
		/*

		Cette fonction améliore le plugin parallax en appliquant l'effet non plus uniquement aux backgrounds mais
		également aux blocks

		*/


			function parallaxEvolved(section, nextSection, prevSection) {


				var scroll;
				var offset;
				var nextSectionHeight;
				var nextSectionPositionY;
				var prevSection;
				var prevSectionOffset;
				var isFixed;
				var scrollBottom;
			
				nextSectionHeight = nextSection.height();
				nextSectionOffset = nextSection.offset();
				nextSectionOffsetOffsetTop = nextSectionOffset.top;
				nextSectionPositionY = nextSectionOffsetOffsetTop - nextSectionHeight;
				prevSectionHeight = prevSection.height();

				jQuery(document).scroll(function()  {

					scroll = $(document).scrollTop();	

					
					if(scroll >= nextSectionPositionY) {

						section.css('position', 'fixed');
						section.css('bottom', '0');
						nextSection.css('position', 'relative');
						nextSection.css('top', $(window).height());

						nextSectionOffset = nextSection.offset();
						nextSectionOffsetOffsetTop = nextSectionOffset.top;
						nextSectionPositionY = nextSectionOffsetOffsetTop - nextSectionHeight;
						isFixed = true;

					} 

					else if (scroll < nextSectionPositionY && isFixed == true) {

						
						
						section.css('position', 'relative');
						nextSection.css('position', 'relative');
						nextSection.css('top', '0');

						nextSectionOffset = nextSection.offset();
						nextSectionOffsetOffsetTop = nextSectionOffset.top;
						nextSectionPositionY = nextSectionOffsetOffsetTop - nextSectionHeight;
						$(document).scrollTo(section.height());
						isFixed = false;
					}

					
				
				});

				$(".clic").click(function() {

						alert(isFixed);
						alert($(document).scrollTop());

					});

			}