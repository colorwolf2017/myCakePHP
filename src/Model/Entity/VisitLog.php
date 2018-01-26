<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/26
 * Time: 18:44
 */

namespace App\Model\Entity;

use Cake\ORM\Entity;

class VisitLog extends Entity
{
    protected $_accessible=
        [
            '*'=>true,
            'id'=>false
        ];
}