<h1>visit logs list</h1>
<table>
    <tr>
        <th>site</th>
        <th>ip</>
        <th>username</th>
    </tr>
    <?php foreach ($visitLogs as $visitLog):?>
        <td><?=$visitLog->site?></td>
        <td><?=$visitLog->ip?></td>
        <td><?=$visitLog->username?></td>
    <?php endforeach; ?>
</table>