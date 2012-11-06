 $(document).ready(function(){       

    /* Tooltip */
    $("nav ul li a").hover(function() {
        console.log('hovering ' + $(this).attr('title'));
        $(this).append('<div class="tooltip"><span>'+ $(this).attr('title') + '</span></div>');
    }, function() {
        $('div .tooltip').remove();
    });

    /* scrollTo */
    $("nav ul li a, a.scrollTo").click(function(event){     
        event.preventDefault();
        console.log('Hash : ' + $(this.hash).offset().top);
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1700);
    });

    /* EPawn */
    var i = 0;
    var colors = new Array('jaune', 'red', 'vert', 'bleu');
    $("div#epawn div").click(function() {
    	$(this).parent().css('background-image','url("img/commercialisation/_epawn_'+ colors[i] +'.png")');
    	if(i == colors.length-1) 
    		i = 0;
    	else 
    		i++;
    });

    /* Drag and Drop - PIXEL SENSE */
    jQuery(function($){
        var inside = false;
        var insideDrop = false;

        $('div#objets ul li div.drag').drag(function( ev, dd ){
            console.log('drag');
            if($(this).hasClass('dropped')) return false;

            $(this).css('opacity', .6);
            // console.log(dd.offsetX);
            // console.log(dd.offsetY);
            $(this).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        }).drag("end", function() {
            $(this).css('opacity', 1);
            console.log("drag end!");

            if(insideDrop) {
                // if there is an item already dropped
                if(inside) {
                    console.log('someone already here!');
                    old = $('div#objets li div.drag.dropped');
                    $(old).css({
                        top: $(old).parent().css('top'),
                        left: $(old).parent().css('left'),
                    });
                    $(old).removeClass('dropped');
                }
                
                $('div#surface div#text').animate({'opacity':'0'});
                // continue
                adjustX = ( ($('div#surface div.dropzone').width() - $(this).width()) / 2);
                adjustY = ( ($('div#surface div.dropzone').height() - $(this).height()) / 2);
                $(this).css({
                    left: $('div#surface div.dropzone').position().left + adjustX - 210,
                    top: $('div#surface div.dropzone').position().top + adjustY,
                })
                $(this).addClass('dropped');

                // show text info
                id = $(this).parent().attr('id');
                console.log(id);
                if($('div#surface div.description div').hasClass('active')) {
                    $('div#surface div.description div').removeClass('active');
                }
                $('div#surface div.description div#' + id).addClass('active');
					
                inside = true;
                insideDrop = false;
            } else {
                // Back to original pos
                if($(this).hasClass('dropped')) return false;
                $(this).css({
                    top: $(this).parent().css('top'),
                    left: $(this).parent().css('left'),
                });
                console.log($(this).parent().css('top'));
                console.log('back to zero bitches!');
            }
        });
        $('div#surface div.dropzone')
            .drop("start",function(){
                $( this ).addClass("active");
                console.log('inside!');
                insideDrop = true;
            })
            .drop("end",function(){
                $( this ).removeClass("active");
        });
    });
            
    /* Drag and Drop - EDITIONS VOLUMIQUE */
    jQuery(function($){
        var inside = false;
        var insideDrop = false;

        $('ul#pions li div.drag').drag(function( ev, dd ){
            
            if($(this).hasClass('dropped')) return false;

            $(this).css('opacity', .6);
            // console.log(ev);
            // console.log(dd);
            $( this ).css({
                top: dd.offsetY,
                left: dd.offsetX
            });
        }).drag("end", function() {
            $(this).css('opacity', 1);
            // console.log("drag end!");

            if(insideDrop) {
                // if there is an item already dropped
                if(inside) {
                    // console.log('someone already here!');
                    old = $('ul#pions li div.drag.dropped');
                    $(old).css({
                        top: $(old).parent().css('top'),
                        left: $(old).parent().css('left'),
                    });
                    $(old).removeClass('dropped');
                }
                
                // continue
                adjustX = ( ($('div#ipad #dropzone').width() - $(this).width()) / 2);
                adjustY = ( ($('div#ipad #dropzone').height() - $(this).height()) / 2);
                $(this).css({
                    left: $('div#ipad').position().left + adjustX,
                    top: $('div#ipad').position().top + adjustY + 50,
                })
                $(this).addClass('dropped');

                // show text info
                id = $(this).parent().attr('id');
                if($('div#ipad div.description div').hasClass('active')) {
                    $('div#ipad div.description div').removeClass('active');
                }
                $('div#ipad div.description div#' + id).addClass('active');

                inside = true;
                insideDrop = false;
            } else {
                // Back to original pos
                if($(this).hasClass('dropped')) return false;
                $(this).css({
                    top: $(this).parent().css('top'),
                    left: $(this).parent().css('left'),
                });
                // console.log('back to zero bitches!');
            }
        });
        $('div#ipad #dropzone')
            .drop("start",function(){
                $( this ).addClass("active");
                // console.log('inside!');
                insideDrop = true;
            })
            .drop("end",function(){
                $( this ).removeClass("active");
        });
    }); 

	/* LES ENJEUX - Click */
	$('ul#pieces li img').click(function() {
		console.log('clickon');
		id = $(this).parent().attr('id');
		$('div#tablette div.description div.active').removeClass('active');
		$('div#tablette div.description div#mini_' + id).addClass('active');
		$('div#tablette div.description div#illu_' + id).addClass('active');

		$('ul#pieces li img.desactivate').removeClass('desactivate');
		$(this).addClass('desactivate');
	});

	/* LES ENJEUX - Mouse follow */
	$('div#table').mousemove(function(e){
		yTop = $(this).position().top;
		xTop = $(this).position().left;
		degree = (((e.pageY-yTop)/2)-(e.pageY-yTop)+100)*0.1;
		left = ((e.pageX/(e.pageX-1))-1)*100;

		oldValue = $('div#main').css('left');
		if(left < 0.16)	{
			newValue = parseFloat(oldValue)+parseFloat(left);
		} else {
			newValue = parseFloat(oldValue)-parseFloat(left);
		} 
		
		$('div#main').css({ 'left': ' '+ newValue + 'px'});

		if((degree > -20) && (degree < 14)) {
			$('div#main').css({ 'transform':'rotate(' + degree + 'deg)'});
		} else {
			return false;
		}
	});
});