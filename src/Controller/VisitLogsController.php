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
    public $paginate=
    [
        'limit'=>1000,
        'order'=>
        [
            'VisitLogs.id'=>'asc'
        ]
    ];
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Paginator');
        $this->loadComponent('Flash');
    }
    public function index()
    {
        //$this->loadComponent('Paginator');
        //$visitLogs=$this->Paginator->paginate($this->VisitLogs->find());
        $this->response=$this->response->withHeader('Access-Control-Allow-Origin','*');
        $visitLogs=$this->paginate($this->VisitLogs);
        $this->set(compact('visitLogs'));
    }
    public function view($id=null)
    {
        $visitLog=$this->VisitLogs->findById($id)->firstOrFail();
        $this->set(compact('visitLog'));
    }
    //find the host name
    private function url2Host($url)
    {
        $return='';
        $reg='/^https{0,1}:\/\/[^\/]+\//';
        $array=array();
        if(preg_match($reg,$url,$array))
        {
            $return=$array[0];
        }
        else
        {
            $return=$url;
        }
        return $return;
    }
    public function add()
    {
        $visitLog=$this->VisitLogs->newEntity();
        if($this->request->is('post'))
        {
            $visitLog=$this->VisitLogs->patchEntity($visitLog,$this->request->getData());
            $visitLog->site=$this->url2Host($this->request->getHeader('Referer')[0]);
            $visitLog->ip=$this->request->clientIp();
            $visitLog->useragent=$this->request->getHeader('User-Agent')[0];

            if($this->VisitLogs->save($visitLog))
            {
                $this->Flash->success('visit log save success');
                return $this->redirect(['action'=>'index']);
            }
            $this->Flash->error('save failed');
        }
        $this->set('visitLog',$visitLog);
    }

    public function add2()
    {
        $this->response=$this->response->withHeader('Access-Control-Allow-Origin','*');
        $json='{"success":false,"msg":"server error"}';
        do
        {
            if(!$this->request->is('post'))
            {
                break;
            }
            $visitLog=$this->VisitLogs->newEntity();
            $visitLog=$this->VisitLogs->patchEntity($visitLog,$this->request->getData());
            $visitLog->site=$this->url2Host($this->request->getHeader('Referer')[0]);
            if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            {
                $visitLog->ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
            }
            else
            {
                $visitLog->ip=$this->request->clientIp();
            }
            $visitLog->useragent=$this->request->getHeader('User-Agent')[0];
            if($this->VisitLogs->save($visitLog))
            {
                $json='{"success":true,"msg":"none"}';
            }
        }while(false);
        $this->set('json',$json);
    }
}
?>
