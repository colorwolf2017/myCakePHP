<h1>all spy js here</h1>
<table>
    <tr>
        <th>id</th><th>content</th><th>view more</th>
    </tr>
    <?php foreach($spys as $spy):?>
        <tr>
            <td><?=$spy->id?></td>
            <td><?=$spy->content?></td>
            <td><?=$this->Html->link('view',['action'=>'view',$spy->id])?></td>
        </tr>
    <?php endforeach;?>
</table>
<?=$this->Html->link('add spy',['action'=>'add'])?>