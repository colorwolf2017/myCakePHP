<?php
$this->layout = false;
?>
<h1>Articles</h1>
<table>
	<tr>Title</tr>
	<tr>Created time</tr>
	<?php foreach($articles as $article):?>
		<tr>
			<td>
				<?=$this->Html->link($article->title,['action'=>'view',$article->slug])?>
			</td>
			<td>
				<?=$article->created->format(DATE_RFC850)?>
			</td>
		</tr>
	<?php endforeach;?>
</table>