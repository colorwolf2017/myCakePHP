<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/1
 * Time: 23:58
 */
namespace App\Model\Endity;

use Cake\ORM\Entity;

class Spy extends Entity
{
    protected $_accessible=
        [
            '*'=>true,
            'id'=>false
        ];
}