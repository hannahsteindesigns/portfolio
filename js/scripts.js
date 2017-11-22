$(document).ready(function(){
  // mobile nav
  $(".mobile-nav").click(function(){
    $(this).toggleClass("active");
    $("nav").slideToggle()
  });

  /* contact form */
  // scroll to form
  $("a[title='contact']").click(function(e){
    e.preventDefault();
    var target = this.hash,
        $target = $(target);
    $("html, body").stop().animate({
      "scrollTop": $target.offset().top
    }, 900, "swing", function(){
      history.replaceState(null, null, target);
    });
  });
  // keep adaptive placeholders in place
  $("input, textarea").change(function(){
    var el = $(this);
    el.val().trim().length ? el.addClass("focus") : el.removeClass("focus");
  });
  // validation
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
    }
  });
  // submit form logic
  $(function() {
  	var form = $("#form"),
        formMessages = $("#form-messages");

  	$(form).submit(function(e) {
  		e.preventDefault();

  		var formData = $(form).serialize();

  		$.ajax({
  			type: "POST",
  			url: $(form).attr("action"),
  			data: formData
  		})
  		.done(function(response) {
  			$(formMessages).removeClass("error");
  			$(formMessages).addClass("success");
        $("input, textarea").removeClass("focus");
        form.validate().resetForm();
  			$(formMessages).hide().text(response).fadeIn();
  			$('#name').val("");
  			$('#email').val("");
  			$('#message').val("");
        setTimeout(function(){
          $(formMessages).hide("slow");
        }, 10000);
  		})
  		.fail(function(data) {
  			$(formMessages).removeClass("success");
  			$(formMessages).addClass("error");

  			if (data.responseText !== "") {
  				$(formMessages).hide().text(data.responseText).fadeIn();
  			} else {
  				$(formMessages).hide().text("Oops! Something went wrong and we couldn't send your message. Please try again.").fadeIn();
  			}
  		});

  	});

  });

});
