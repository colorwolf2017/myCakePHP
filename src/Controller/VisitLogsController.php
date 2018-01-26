<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/26
 * Time: 18:36
 */

namespace App\Controller;
use App\Controller\AppController;
class VisitLogsController extends AppController
{
    public function index()
    {
        $this->loadComponent('Paginator');
        $visitLogs=$this->Paginator->paginate($this->VisitLogs->find());
        $this->set(compact('visitLogs'));
    }
    public function view($site=null)
    {
        $visitLog=$this->VisitLogs->findBySite($site)->firstOrFail();
        $this->set(compact('visitLog'));
    }
    public function add()
    {
        $visitLog=$this->VisitLogs->newEntity();
        if($this->request->is('post'))
        {
            $visitLog=$this->VisitLogs->patchEntity($visitLog,$this->request->getData());
            if($this->VisitLog->save($visitLog))
            {

            }
        }
    }
}
?>