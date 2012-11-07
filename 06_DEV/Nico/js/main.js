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


    /* Drag and Drop */
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
            console.log("drag end!");

            if(insideDrop) {
                // if there is an item already dropped
                if(inside) {
                    console.log('someone already here!');
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
                console.log('back to zero bitches!');
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
});