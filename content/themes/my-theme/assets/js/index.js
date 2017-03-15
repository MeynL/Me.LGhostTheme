+function(){
    $(window).on("scroll",function(){
        $(window).scrollTop()>300?$(".backtop").fadeIn():$(".backtop").fadeOut();
    });
    var flag = false;
    $("#slect").click(function(){
        if(!flag){
            $(".slect-input").show();
            flag=!flag;
        }else{
            $(".slect-input").hide();
            flag=!flag;
        }
    });
    var mcolor=new Array("red","yellow","blue","green");
    var mfcolor=new Array("#fff","#000","#fff","#000");
    var mtag = $(".tag content a");
    var index;
    for(var i=0;i<mtag.length;i++){
        index = i%mcolor.length;
        mtag.eq(i).css("background",mcolor[index]);
        mtag.eq(i).css("color",mfcolor[index]);
    }
}()