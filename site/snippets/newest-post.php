<article class="newest">
  <div class="meta"><?php echo date("M d, Y", $newestPost->date()) ?> by <?php echo $newestPost->author() ?></div>
  <h2><?php echo $newestPost->title() ?></h2>
  <div class="thumbnail"><img src="<?php echo $newestPost->image('teaser.jpg')->url() ?>" /></div>
  <p class="excerpt"><?php echo $newestPost->text()->kirbytext()->excerpt(c::get('excerpt.newest')) ?></p>
  <p class="continue-reading"><a href="<?php echo $newestPost->url() ?>">Continue Reading</a></p>
</article>
