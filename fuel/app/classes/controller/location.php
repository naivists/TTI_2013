<?php
/* This controller and its actions was generated by
 * an "oil generate" command. 
 * 
 * > oil generate controller location index create view delete 
 * 
 * The default action implementations are very simple.
 */
class Controller_Location extends Controller_Template
{

	public function action_index()
	{
		$this->template->title = 'Location &raquo; Index';
		$this->template->content = View::forge('location/index');
	}

	public function action_create()
	{
		$this->template->title = 'Location &raquo; Create';
		$this->template->content = View::forge('location/create');
	}

	public function action_view()
	{
		$this->template->title = 'Location &raquo; View';
		$this->template->content = View::forge('location/view');
	}

	public function action_delete()
	{
		$this->template->title = 'Location &raquo; Delete';
		$this->template->content = View::forge('location/delete');
	}
	
	public function action_search($term=null){
	    if ($term==null) {
		$term = Input::get("term");
	    }
	    //only ajax requests served here 
	    //(! Input::is_ajax()) and Response::redirect("location");
	    $clean_query =  Security::clean($term);
	    $data["locations"] = array();
	    if ($clean_query != "") {
		$data["locations"] = Model_Orm_Location::query()
					->where("title", "like", Security::clean($term)."%")
					->get();
	    }
	    
	    $response = Response::forge(View::forge("location/search", $data));
	    $response->set_header("Content-Type","application/json");
	    return $response;
	}

}
