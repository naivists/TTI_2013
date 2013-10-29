<?php

/**
 * The Welcome Controller.
 *
 * A basic controller example.  Has examples of how to set the
 * response body and status.
 * 
 * @package  app
 * @extends  Controller
 */
class Controller_Welcome extends Controller
{
	public function action_helloworld(){
//	    $response  = Response::forge();
//	    
//	    $viewdata = array();
//	    $viewdata["title"] = rand(13284, 130249132);
//	    $viewdata["data"] = "<script>alert('blabla')</script>";
	    $events = new Model_Crudevent();
	    
	    print_r($events->find_all());
	    die();
	    
	    
	    $viewdata["countries"] = array(); //model_Welcomecountries::get_list();
	    
	    $response->body = View::forge('welcome/helloworld', $viewdata);
	    
	    return $response;
	}
    
	/**
	 * The basic welcome message
	 * 
	 * @access  public
	 * @return  Response
	 */
	public function action_index()
	{
		return Response::forge(View::forge('welcome/index'));
	}

	/**
	 * A typical "Hello, Bob!" type example.  This uses a ViewModel to
	 * show how to use them.
	 * 
	 * @access  public
	 * @return  Response
	 */
	public function action_hello()
	{
	    phpinfo();
	    return Response::forge(ViewModel::forge('welcome/hello'));
	}

	/**
	 * The 404 action for the application.
	 * 
	 * @access  public
	 * @return  Response
	 */
	public function action_404()
	{
		return Response::forge(ViewModel::forge('welcome/404'), 404);
	}
}
