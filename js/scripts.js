$(document).ready(function(){
  // fade in pretty
  $("#content").css("opacity", "1");

  // mobile nav
  $(".mobile-nav").click(function(){
    $(this).toggleClass("active");
    $("nav").slideToggle()
  });

  // progressive image loading
  // adapted from https://www.sourcetoad.com/dev-trends/progressive-loading-of-images/
  var lazyLoad = function(){
    $(".progressive").each(function(){
      var container = $(this),
          image = new Image(),
          previewImage = $(this).find(".lowres"),
          newImage = $("<img src='' class='overlay' alt='' />")
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

  // lightbox
  var lightbox = function(){
    $(".lightbox").click(function(e){
      e.preventDefault();
      var image = new Image(),
          container = $("#lightbox"),
          thumbnail = $(this).find(".thumbnail"),
          full = $("<img class='full' src='' />");
      $("#lightbox-container").fadeIn();
      image.onload = function(){
        full.attr("src", image.src).appendTo(container);
        $(".loading").hide();
      };

      image.src = thumbnail.data("image")

    });

    var hide = function(){
      $("#lightbox-container").fadeOut(function(){
        $(".full").remove();
      });
    };

    $("#lightbox-container").click(function(e){
      e.preventDefault();
      var clicked = $(e.target),
          lightbox = $("#lightbox");
      if (clicked.is(lightbox) || clicked.parents().is(lightbox)) {
        return
      } else { hide(); }
    });
    $("#lightbox .close").click(function(){
      hide();
    });
  };

  if ($(".lightbox").length) {
    lightbox();
  }

  // animations
  // adapted from https://www.sitepoint.com/scroll-based-animations-jquery-css3/
  var animate = $('.animate article'),
      $window = $(window),
      checkView = function() {
        var windowHeight = $window.height(),
            windowTop = $window.scrollTop(),
            windowBottom = ( windowTop + windowHeight + 200 );

        $.each(animate, function(){
          var el = $(this),
              elHeight = el.outerHeight(),
              elTop = el.offset().top,
              elBottom = ( elTop + elHeight );

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
      $window.on("scroll resize", checkView);

  /* contact form */
  // scroll to form
  $("a[title='contact']").click(function(e){
    e.preventDefault();
    var target = this.hash,
        $target = $(target);
    $(".mobile-nav").trigger("click");
    $("html, body").stop().animate({
      "scrollTop": $target.offset().top
    }, 900, "swing", function(){
      history.pushState(null, null, target);
    });
  });
  // keep adaptive placeholders in place
  $("input, textarea").change(function(){
    var el = $(this);
    el.val().trim().length ? el.addClass("focus") : el.removeClass("focus");
  });
  // initialize validation
  $("#form").validate({
    errorElement: "div",
    errorPlacement: function(error, element) {
      error.appendTo( element.parent("div") );
    },
    showErrors: function(errorMap, errorList) {
      this.defaultShowErrors();
      $.each(errorMap, function(key, value) {
        var error = $("input[name='" + key + "']").nextAll("div");
        if (error.text() !== value) {
          error.html(value);
        }
      });
    },
    submitHandler: function(form, event) {
      submitForm(form);
    }
  });
  // submit form logic
  var submitForm = function(form) {
    var formMessages = $("#form-messages"),
        formData = $(form).serialize();
		$.ajax({
			type: "POST",
			url: $(form).attr("action"),
			data: formData
		})
		.done(function(response) {
			$(formMessages).removeClass("error").addClass("success");
      $("input, textarea").removeClass("focus");
			$(formMessages).hide().text(response).fadeIn();
			$('#name, #email, #message').val("");
      $(form).validate().resetForm();
      setTimeout(function(){
        $(formMessages).hide("slow");
      }, 10000);
		})
		.fail(function(data) {
			$(formMessages).removeClass("success").addClass("error");
			if (data.responseText !== "") {
				$(formMessages).hide().text(data.responseText).fadeIn();
			} else {
				$(formMessages).hide().text("Oops! Something went wrong and we couldn't send your message. Please try again.").fadeIn();
			}
		});
  };
});
