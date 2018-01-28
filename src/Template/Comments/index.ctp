<h1>comment list here</h1>
<table>
    <tr>
        <th>author</th>
        <th>email</th>
        <th>site</th>
        <th>content</th>
        <th>post to</th>
        <th>post ip</th>
        <th>post time</th>
    </tr>
    <?php foreach($comments as $comment):?>
        <tr>
        <td><?=$comment->postauthor?></td>
        <td><?=$comment->postemail?></td>
        <td><?=$comment->postsite?></td>
        <td><?=$comment->postcontent?></td>
        <td><?=$comment->postto?></td>
        <td><?=$comment->postip?></td>
        <td><?=$comment->posttime?></td>
        </tr>
    <?php endforeach;?>
</table>