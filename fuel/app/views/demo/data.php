<?php
     foreach ($events as $event) : ?>
	 <h2><?php echo $event["title"];?></h2>
	 <p><?php echo $event["description"];?></p>
     <? endforeach; ?>
