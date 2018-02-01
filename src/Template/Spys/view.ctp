<p>id</p>
<p><?=$spy->id?></p>
<p>content</p>
<p><?=$spy->content?></p>
<?=$this->Html->link('edit',['action'=>'edit',$spy->id])?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<?=$this->Html->link('bake to index page',['action'=>'index'])?>