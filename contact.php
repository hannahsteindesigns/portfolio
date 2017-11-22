<?php
function spamcheck($field) {
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);
  if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
    return TRUE;
  } else {
    return FALSE;
  }
}
?>
<?php
$field_name = $_POST['name'];
$field_email = $_POST['email'];
$field_phone = $_POST['phone'];
$field_message = $_POST['message'];

if (!empty($field_name)&&!empty($field_email)&&!empty($field_message))
  {
  $mail_to = 'hannahsteindesigns@gmail.com';
  $subject = 'Message from a site visitor: '.$field_name;

  $body_message = 'From: '.$field_name."\n";
  $body_message .= 'Email: '.$field_email."\n";
  $body_message .= 'Phone: '.$field_phone."\n";
  $body_message .= 'Message: '."\n";
  $body_message .= $field_message;

  $headers = 'From: '.$field_email."\r\n";
  $headers .= 'Reply-To: '.$field_email."\r\n";

  $mail_status = mail($mail_to, $subject, $body_message, $headers);

  echo "We'll be in touch!";
  }

else {
  echo "Sorry, something isn't right!";
}
?>
