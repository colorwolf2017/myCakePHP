<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/1/28
 * Time: 18:02
 */
namespace App\Controller;
class CommentsController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Paginator');
        $this->loadComponent('Flash');
    }
    public function index()
    {
        $comments=$this->Paginator->paginate($this->Comments->find());
        $this->set(compact('comments'));
    }
    public function add()
    {
        $this->response=$this->response->withHeader('Access-Control-Allow-Origin','*');
        $json='{"success":false,"msg":"server error"}';
        do
        {
            if(!$this->request->is('post'))
            {
                break;
            }
            $comment=$this->Comments->newEntity();
            $comment=$this->Comments->patchEntity($comment,$this->request->getData());
            $comment->ip=$this->request->clientIp();
            if($this->Comments->save($comment))
            {
                $json='{"success":true,"msg":"none"}';
            }
        }while(false);
        $this->set('json',$json);
    }
}