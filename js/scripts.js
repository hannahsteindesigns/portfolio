$(document).ready(function(){
  // fade in pretty
  $("#content").css("opacity", "1");


  // slide up




  // mobile nav
  $(".mobile-nav").click(function(){
    $(this).toggleClass("active");
    $("nav").slideToggle()
  });

  /* scroll to top */
  let scrolling = false;
  const showArrow = function(){
          $(window).scrollTop() > 300 ? $("#scrollTop").fadeIn() : $("#scrollTop").fadeOut();
        };
  $(window).scroll(function(){ scrolling = true; });
  setInterval(function(){
    if (scrolling) {
      scrolling = false;
      showArrow();
    }
  }, 250);
  showArrow();
  $("#scrollTop").click(function(){
    $("html,body").animate({
      scrollTop: 0
    }, 600);
  });
  // break out of script scrolling on user scroll
  $("html,body").bind("DOMMouseScroll touchmove wheel", function(e){
    scrolling = false;
    $("html,body").stop();
  });

  /* progressive image loading */
  // adapted from https://www.sourcetoad.com/dev-trends/progressive-loading-of-images/
  const lazyLoad = function(){
    $(".progressive").each(function(){
      let container = $(this);
      let image = new Image();
      let previewImage = $(this).find(".lowres");
      let newImage = $("<img src='' class='overlay' alt='' />");
      image.onload = function(){
        newImage.attr("src", image.src).attr("alt", previewImage.attr("alt")).appendTo(container).css("opacity", "1");
        previewImage.css("opacity", "0");
      };

      image.src = previewImage.data("image");

    });
  }

  if ($(".progressive").length) {
    lazyLoad();
  }

  /* animations */
  // adapted from https://www.sitepoint.com/scroll-based-animations-jquery-css3/
  const animate = $('.animate article');
  const $window = $(window)
  const checkView = function() {
        let windowHeight = $window.height();
        let windowTop = $window.scrollTop();
        let windowBottom = windowTop + windowHeight + 200;

        $.each(animate, function(){
          let el = $(this);
          let elHeight = el.outerHeight();
          let elTop = el.offset().top;
          let elBottom = ( elTop + elHeight );

          if ( (elBottom >= windowTop) && (elTop <= windowBottom) ) {
            el.addClass("in-view");
            el.removeClass("slide");
          } else {
            el.removeClass("in-view");
          }

          if (windowTop === 0) {
            el.addClass("slide");
          }
        });
      };

      checkView();
      $window.on("scroll", checkView);

  /* detect flex support & redirect */
  // detect adapted from http://johanronsse.be/2016/01/03/simple-flexbox-check/
  const detectFlex = function(){
    const doc = document.documentElement;
    const f = doc.style.flex;
    const fw = doc.style.webkitFlex;
    const updateLink = "http://hannahsteindesigns.com/update";

        // TO DO: can this be !f.length ?
        ( f === "" || fw === "" ) ? doc.className = "flex" : doc.className = "no-flex";
        if ( f === "" || fw === "" ) {
          doc.className = "flex";
        } else if (window.location.href != updateLink) {
          window.location.replace(updateLink);
        } else {
          return;
        }
  };
  detectFlex();
});
