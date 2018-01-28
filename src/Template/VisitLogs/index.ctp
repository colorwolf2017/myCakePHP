<h1>visit logs list</h1>
<table>
    <tr>
        <th>site</th>
        <th>ip</>
        <th>username</th>
        <th>view more</th>
    </tr>
    <?php foreach ($visitLogs as $visitLog):?>
    <tr>
        <td><?=$visitLog->site?></td>
        <td><?=$visitLog->ip?></td>
        <td><?=$visitLog->username?></td>
        <td><?=$this->Html->link('view more',['action'=>'view',$visitLog->id])?></td>
    </tr>
    <?php endforeach; ?>
</table>
<?=$this->Html->link('add visit log',['action'=>'add'])?>
