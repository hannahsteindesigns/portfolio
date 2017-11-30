<?php foreach($recentPosts as $recentPost): ?>

    <article class="recent">
      <div class="meta"><?php echo date("M d, Y", $recentPost->date()) ?> by <?php echo $recentPost->author() ?></div>
      <h3><?php echo $recentPost->title() ?></h3>
      <p class="excerpt"><?php echo $recentPost->text()->kirbytext()->excerpt(c::get('excerpt.recent')) ?></p>
      <p class="continue-reading"><a href="<?php echo $recentPost->url() ?>">Continue Reading</a></p>
    </article>

<?php endforeach; ?>
