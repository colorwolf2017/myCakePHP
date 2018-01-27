<h1></h1>
<?php
    echo $this->Form->create();
    echo $this->Form->control('site');
    echo $this->Form->control('ip');
    echo $this->Form->control('username');
    echo $this->Form->button('add visit log');
    echo $this->Form->end();
?>
