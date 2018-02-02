<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/2/2
 * Time: 0:00
 */

namespace App\Controller;

class SpysController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('Paginator');
        $this->loadComponent('Flash');
    }

    //index
    public function index()
    {
        $spys=$this->Paginator->paginate($this->Spys->find());
        $this->set(compact('spys'));

        //$spy=$this->Spys->find()->firstOrFail();
        //$this->set('spy',$spy);
    }
    //add
    public function add()
    {
        if($this->request->is('post'))
        {
            $spy=$this->Spys->newEntity();
            $spy=$this->Spys->patchEntity($spy,$this->request->getData());
            if($this->Spys->save($spy))
            {
                $this->Flash->success('add spy success');
                $this->redirect(['action'=>'index']);
            }
            else
            {
                $this->Flash->error('add spy failed');
                $this->set('spy',$spy);
            }
        }
    }
    //view
    public function view($id=null)
    {
        $spy=$this->Spys->findById($id)->firstOrFail();
        $this->set('spy',$spy);
    }
    //edit
    public function edit($id=null)
    {
        $spy=$this->Spys->findById($id)->firstOrFail();
        if($this->request->is(['post','put']))
        {
            $spy=$this->Spys->patchEntity($spy,$this->request->getData());
            if($this->Spys->save($spy))
            {
                $this->Flash->success('edit spy success');
                $this->redirect(['action'=>'view',$spy->id]);
            }
            else
            {
                $this->Flash->error('edit spy failed');
                $this->set('spy',$spy);
            }
        }
        else
        {
            $this->set('spy',$spy);
        }
    }
    //first
    public function first()
    {
        if($this->request->is(['post','get']))
        {
            $this->response=$this->response->withHeader('Access-Control-Allow-Origin','*');
            $spy=$this->Spys->find()->firstOrFail();
            $strSpy=$spy->content;
            $this->set('strSpy',$strSpy);
        }
    }
}