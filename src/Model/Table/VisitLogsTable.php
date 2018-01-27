<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/26
 * Time: 18:41
 */
namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Utility\Text;
class VisitLogsTable extends Table
{
    public function initialize(array $config)
    {
        $this->addBehavior('Timestamp');
    }
    //before save
    public function beforeSave($event,$entity,$options)
    {
        if($entity->isNew())
        {
            //$slug=Text::slug($entity->site);
            //$entity->site=$slug;
        }
    }
}
