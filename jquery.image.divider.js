//custom jQuery plug-in. http://docs.jquery.com/Plugins/Authoring

(function ($) {

    $.fn.imageDivider = function () {

        var beforeImg = $("img[alt='before']")
        , afterImg = $("img[alt='after']")
        , beforeImgBtn = $(".firstImg")
        , afterImgBtn = $(".secondImg")
        , currentId
        , sliderOpacity = $('input[type="range"]')
        , opacityVal
        , drag_btn = $(".drag-btn")
        , screen = $(".testScreen")
        , currentScreenImg;

        beforeImgBtn.click(function () {
            
            currentId = $(this).attr("data-before");
            currentScreenImg = $("img[data-before-id='" + currentId + "']").attr("src");
            $("img[data-before-id='" + currentId + "']").hide();
            $("img[data-after-id='" + currentId + "']").show();
            $("img[data-after-id='" + currentId + "']").parent().css("z-index", "2");
            $("[data-screen='" + currentId + "']").css("border", "none");
            $("[data-screen='" + currentId + "']").css("background-image", "url('" + currentScreenImg + "')");

        });

        afterImgBtn.click(function () {
            currentId = $(this).attr("data-after");
            currentScreenImg = $("img[data-after-id='" + currentId + "']").attr("src");
            $("img[data-after-id='" + currentId + "']").hide();
            $("img[data-before-id='" + currentId + "']").show();
            $("img[data-before-id='" + currentId + "']").parent().css("z-index", "2");
            $("[data-screen='" + currentId + "']").css("border", "none");
            $("[data-screen='" + currentId + "']").css("background-image", "url('" + currentScreenImg + "')");
        });

        sliderOpacity.change(function () {
            currentId = $(this).attr("data-slider");
            opacityVal = $(this).val() / 10;

            $("[data-screen='" + currentId + "']").css("opacity", opacityVal);

        });

        beforeImg.each(function (i) {
            $(this).attr("data-before-id", i);
        });

        afterImg.each(function (i) {
            $(this).attr("data-after-id", i);
        });

        beforeImgBtn.each(function (i) {
            $(this).attr("data-before", i);
        });

        afterImgBtn.each(function (i) {
            $(this).attr("data-after", i);
        });

        sliderOpacity.each(function (i) {
            $(this).attr("data-slider", i);
        });

        drag_btn.each(function (i) {
            $(this).attr("data-drag-btn", i);
        });

        screen.each(function (i) {
            $(this).attr("data-screen", i);
        });
    };
})(jQuery);