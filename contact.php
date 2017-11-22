<?php
    // adapted from http://blog.teamtreehouse.com/create-ajax-contact-form
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }
        $recipient = "me@hannahsteindesigns.com";
        $subject = "New message from $name";
        $mail_host = "sub4.mail.dreamhost.com";

        $email_content = "From: ".$name."\n";
        $email_content .= "Email: ".$email."\n";
        $email_content .= "Message: "."\n";
        $email_content .= $message;

        $email_headers = "From: Portfolio Contact Form <$recipient>";

        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Thank you! We'll be in touch.";
        } else {
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message. Please try again.";
        }

    } else {
        http_response_code(403);
        echo "There was a problem with your submission. Please try again.";
    }

?>
