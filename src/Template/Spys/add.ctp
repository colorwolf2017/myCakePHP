<h1>add new spy here</h1>
<?php
    echo $this->Form->create();
    echo $this->Form->control('content',['rows'=>10]);
    echo $this->Form->button('add spy');
    echo $this->Form->end();
?>