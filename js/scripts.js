$(document).ready(function(){
  // mobile nav
  $(".mobile-nav").click(function(){
    $(this).toggleClass("active");
    $("nav").slideToggle()
  });

  // progressive image loading
  // adapted from https://www.sourcetoad.com/dev-trends/progressive-loading-of-images/
  var lazyLoad = function(){
    $(".progressive").each(function(){
      var image = new Image();
      var previewImage = $(this).find(".lowres");
      var newImage = $(this).find(".overlay");

      image.onload = function(){
        newImage.attr("src", image.src);
        newImage.css("opacity", "1");
        previewImage.css("opacity", "0");
      };

      image.src = previewImage.data("image");

    });
  }

  if ($(".progressive").length) {
    lazyLoad();
  }

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
