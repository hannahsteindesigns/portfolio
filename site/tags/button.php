<?php

kirbytext::$tags['button'] = array(
  'attr' => array(
    'link', 'class'
  ),
  'html' => function($tag) {
    $class = $tag->attr('class', 'button');
  	$link = $tag->attr('link', false);

  	$html  = '<a href="'. url($link) .'" class="'. $class .'">';
    $html .= $tag->attr('button');
    $html .= '</a>';

    return $html;
  }
);
