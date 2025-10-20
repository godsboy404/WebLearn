// Moved from inline <script> in index.html

function setTab(name, cursel) {
    $(".info_list div").hide();
    $(".infor_nav span.hover").removeClass("hover").addClass("out");
    $("#"+name+cursel).removeClass("out").addClass("hover");
    $("#con_"+name+"_"+cursel).show();
}

// 导航栏需要的js
function dropMenu(obj){
    $(obj).each(function(){
        var theSpan = $(this);
        var theMenu = theSpan.find(".submenu");
        var tarHeight = theMenu.height();
        theMenu.css({height:0,opacity:0});
        theSpan.hover(
            function(){
                $(this).addClass("selected");
                theMenu.stop().show().animate({height:tarHeight,opacity:1},400);
            },
            function(){
                $(this).removeClass("selected");
                theMenu.stop().animate({height:0,opacity:0},400,function(){
                    $(this).css({display:"none"});
                });
            }
        );
    });
}

$(document).ready(function(){
    // Ensure drop menus are initialized
    if (typeof dropMenu === 'function') {
        dropMenu('.drop-menu-effect');
    }

    // adjust nav widths
    try {
        var lis = document.getElementById('nav').getElementsByTagName("li");
        var lilength=0;
        for(var i = 0; i < lis.length; i++) {
            var classes = lis[i].className.split(" ");
            for(var a = 0; a < classes.length; a++) {
                if(classes[a] === "drop-menu-effect") {
                    lilength=lilength+1;
                    break;
                }
            }
        }
        if (lilength === 0) lilength = 1; // avoid division by zero
        var spanlength=1200/lilength;
        spanlength=parseInt(spanlength, 10);
        var spans=document.getElementById('nav').getElementsByTagName("span");
        for(var i = 0; i < spans.length; i++) {
            var classes = spans[i].className.split(" ");
            for(var a = 0; a < classes.length; a++) {
                if(classes[a] === "span") {
                    spans[i].style.width = spanlength+"px";
                    break;
                }
            }
        }
        var uls = document.getElementById("nav").getElementsByTagName("ul");
        for(var i = 0; i < uls.length; i++) {
            var classes = uls[i].className.split(" ");
            for(var a = 0; a < classes.length; a++) {
                if(classes[a] === "submenu") {
                    uls[i].style.width = spanlength+"px";
                    break;
                }
            }
        }
        var navUl = document.getElementById("nav_ul");
        if (navUl) navUl.style.width=spanlength*lilength+"px";
    } catch (e) {
        // fail silently for pages without expected structure
        console.warn('nav sizing failed', e);
    }

});
