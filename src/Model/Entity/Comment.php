<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/28
 * Time: 18:00
 */
namespace App\Model\Entity;
use Cake\ORM\Entity;
class Comment extends Entity
{
    protected $_accessible=
        [
            '*'=>true,
            'id'=>false
        ];
}
?>