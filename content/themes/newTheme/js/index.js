+function(){
    $(window).on("scroll",function(){
        $(window).scrollTop()>80? navf():navd();
    });
    function navf(){
        $(".nav").addClass("float");
        $(".cont").css("margin-top","74px");
    }
    function navd(){
        $(".nav").removeClass("float");
        $(".cont").css("margin-top","20px");
    }
}();