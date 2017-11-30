<?php

return function($site, $pages, $page) {
  $allPosts = $pages->get('posts')->children()->visible();
  $newestPost = $allPosts->last();
  $recentPosts = $allPosts->flip()->slice(1);
  return compact('newestPost', 'recentPosts');
};
