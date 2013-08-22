$(document).ready(function() {

        window.setTimeout(function() {
            $('.screen').each(function() {
                var $$ = $(this)
                    , h = $$.height()
                $$.css({
                    height:h+'px'
                    , position: 'relative'
                })
                $$.find('img').each(function() {
                    var $$$ = $(this)
                    $$$.css({
                        position:'absolute'
                        , top:'0'
                        , left:'0'
                    })
                    $$$.click(function() {
                        var $s = $(this).siblings('img')
                        $(this).fadeOut('slow')
                        $s.fadeIn('slow');

                        var n = noty({text: $s.attr('alt'),timeout:3000});
                    })
                })
            })
        },5000)
    })

