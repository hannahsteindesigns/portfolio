<?php snippet("html-header") ?>
<?php snippet("site-header") ?>
<!-- content -->
<section id="content" class="width">
  <?php
    if($page->image('teaser.jpg')):
    $image = $page->image('teaser.jpg')->url();
  ?>
    <div id="main-image">
      <img src="<?php echo $image ?>" />
    </div>
  <?php endif; ?>
  <div class="meta"><?php echo date("M d, Y", $page->date()) ?> by <?php echo $page->author() ?></div>
  <h2><?php echo $page->title() ?></h2>
  <p><?php echo $page->text()->kirbytext() ?></p>
</section>

<?php snippet("site-footer") ?>
<?php snippet("html-footer") ?>
