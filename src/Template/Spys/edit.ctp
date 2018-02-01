<h1>edit page</h1>
<?php
    echo $this->Form->create($spy);
    echo $this->Form->control('content',['rows'=>10]);
    echo $this->Form->button('update spy');
    echo $this->Form->end();
?>