<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/26
 * Time: 10:39
 */
$targetURL="http://localhost/?p=1";
?>
<html>
<head>
    <meta charset="UTF-8">
    <title>This is a top secret file!</title>
</head>
<body>
<iframe src="<?=$targetURL?>">
</iframe>
<h1>This is a top secret file.</h1>
<br/>
<img src="img/topSecret.jpg"/>
</body>
</html>