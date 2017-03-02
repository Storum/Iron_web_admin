<?php


function connect_db (){
	//$db = mysqli_connect('localhost', 'u0194327_root', 'HYvtP5uM', 'u0194327_iron')
	$db = mysqli_connect('localhost', 'root', '', 'u0194327_iron')
	//$db = mysqli_connect('localhost', 'root', '', 'iron_base')
		or die('Unable to connect to MySQL');
	
	mysqli_set_charset($db, 'utf8');

	return $db;
}

//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------ПОЛЬЗОВАТЕЛИ--------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

function get_user_list (){

	$db = connect_db ();

	$sql = 'SELECT SQL_NO_CACHE * FROM tbl_users where name is not null';
	
	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_user:'.$row{'id_user'}.
					', nick:"'.$row{'nick'}.
					'", name:"'.$row{'name'}.
					'", surname:"'.$row{'surname'}.
					'", patronymic:"'.$row{'patronymic'}.
					'", date_create:"'.$row{'date_create'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
	   		$result_list .= ',{id_user:'.$row{'id_user'}.
					', nick:"'.$row{'nick'}.
					'", name:"'.$row{'name'}.
					'", surname:"'.$row{'surname'}.
					'", patronymic:"'.$row{'patronymic'}.
					'", date_create:"'.$row{'date_create'}.
					'", comment:"'.$row{'comment'}.'"}';

		}

		$result_list .= ']';
	}
	else
		$result_list .= '[]';
	

	mysqli_close ($db);


	echo $_GET['callback'].'({user_list:'.$result_list.'})';
}

function update_user_data ($id_user, $nick, $name, $surname, $patronymic, $comment){

	$db = connect_db ();

	$sql = "UPDATE tbl_users set nick='$nick', name='$name', surname='$surname', patronymic='$patronymic', comment='$comment' where id_user=$id_user";

	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function add_user ($nick, $password, $name, $surname, $patronymic, $comment){

	$db = connect_db ();

	$sql = "INSERT INTO tbl_users(nick, name, surname, patronymic, date_create, password, comment) VALUES ('$nick','$name','$surname','$patronymic',CURDATE(),'$password','$comment')";

	if (mysqli_query ($db, $sql))
	{
		$sql = "SELECT max(id_user) as id_user from tbl_users where 1";
		$sql_result = mysqli_query ($db, $sql)
			or die('Error querying database.');

		$row = mysqli_fetch_array($sql_result);
		$new_user_id = 0;

		if (mysqli_num_rows ($sql_result) <> 0)
		{
			$new_user_id = $row{'id_user'};
			echo $_GET['callback'].'({result:"ok", id_user:'.$new_user_id.', text:"Пользователь добавлен"})';
		}
		else
			echo $_GET['callback'].'({result:"error of adding new user", text:"Ошибка сервера"})'; 
		
	}
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function delete_user ($id_user){

	$db = connect_db ();

	$sql = "DELETE FROM tbl_users where id_user='$id_user'";
	$sql2 = "DELETE FROM tbl_user_phone_set where id_user='$id_user'";
	$sql2 = "DELETE FROM bl_user_address_set where id_user='$id_user'";
	

	if (mysqli_query ($db, $sql) && mysqli_query ($db, $sql2) && mysqli_query ($db, $sql3))
		echo $_GET['callback'].'({result:"ok", text:"Пользователь удален"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}




//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------АДРЕСА--------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

// Получение списка адресов
function get_address_list ($id_owner, $owner_type){
	if ($owner_type = 'user') {
		get_user_address_list ($id_owner);
	}
	else if ($owner_type = 'client')
		get_client_address_list ($id_owner);
}

function get_user_address_list ($id_user){

	$db = connect_db ();

	$sql = "SELECT 	
					addrs.id_address_set,
					addrs.id_address_type, 
					addrs.name, 
					addrs.comment, 
					addr_tps.name add_type_name, 
					addr_tps.comment add_type_comment 
			FROM tbl_user_address_set AS addrs 
				JOIN tbl_address_types addr_tps ON addrs.id_address_type = addr_tps.id_address_type 
			WHERE id_user=$id_user";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_address_set:'.$row{'id_address_set'}.
					', id_address_type:"'.$row{'id_address_type'}.
					'", name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.
					'", add_type_name:"'.$row{'add_type_name'}.
					'", add_type_comment:"'.$row{'add_type_comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_address_set:'.$row{'id_address_set'}.
						', id_address_type:"'.$row{'id_address_type'}.
						'", name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.
						'", add_type_name:"'.$row{'add_type_name'}.
						'", add_type_comment:"'.$row{'add_type_comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({address_list:'.$result_list.'})';
}

function get_client_address_list ($id_user){

	$db = connect_db ();

	$sql = "SELECT 	
					addrs.id_address_set,
					addrs.id_address_type, 
					addrs.name, 
					addrs.comment, 
					addr_tps.name add_type_name, 
					addr_tps.comment add_type_comment 
			FROM tbl_clients_address_set AS addrs 
				JOIN tbl_address_types addr_tps ON addrs.id_address_type = addr_tps.id_address_type 
			WHERE id_user=$id_user";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_address_set:'.$row{'id_address_set'}.
					', id_address_type:"'.$row{'id_address_type'}.
					'", name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.
					'", add_type_name:"'.$row{'add_type_name'}.
					'", add_type_comment:"'.$row{'add_type_comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_address_set:'.$row{'id_address_set'}.
						', id_address_type:"'.$row{'id_address_type'}.
						'", name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.
						'", add_type_name:"'.$row{'add_type_name'}.
						'", add_type_comment:"'.$row{'add_type_comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({address_list:'.$result_list.'})';
}


// Добавление адреса
function add_address ($id_owner, $owner_type, $id_address_type, $name, $comment){

	if ($owner_type = 'user') {
		add_user_address ($id_owner, $id_address_type, $name, $comment);
	}
	else if ($owner_type = 'client')
		add_client_address ($id_owner, $id_address_type, $name, $comment);
}

function add_user_address ($id_user, $id_address_type, $name, $comment){
	$db = connect_db ();
	$sql = "INSERT INTO tbl_user_address_set(id_user, id_address_type, name, comment) VALUES ('$id_user','$id_address_type','$name','$comment')";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Адрес добавлен"})'; 
	else
		echo $_GET['callback'].'({result:"error of adding new user", text:"Ошибка сервера"})'; 

	mysqli_close ($db);
}

function add_client_address ($id_client, $id_address_type, $name, $comment){
	$db = connect_db ();
	$sql = "INSERT INTO tbl_client_address_set(id_client, id_address_type, name, comment) VALUES ('$id_client','$id_address_type','$name','$comment')";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Адрес добавлен"})'; 
	else
		echo $_GET['callback'].'({result:"error of adding new client", text:"Ошибка сервера"})'; 

	mysqli_close ($db);
}



// Удаление адреса
function delete_address ($id_address_set, $owner_type){
	if ($owner_type = 'user') {
		delete_user_address ($id_address_set);
	}
	else if ($owner_type = 'client')
		delete_client_address ($id_owner);
}

function delete_user_address ($id_address_set){
	$db = connect_db ();

	$sql = "DELETE FROM tbl_user_address_set where id_address_set='$id_address_set'";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Адрес удален"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function delete_client_address ($id_address_set){
	$db = connect_db ();

	$sql = "DELETE FROM tbl_client_address_set where id_address_set='$id_address_set'";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Адрес удален"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}



// Обновление адреса 
function update_address ($id_address_set, $owner_type, $id_address_type, $name, $comment){

	if ($owner_type = 'user') {
		update_user_address ($id_address_set, $id_address_type, $name, $comment);
	}
	else if ($owner_type = 'client')
		update_client_address ($id_address_set, $id_address_type, $name, $comment);
}

function update_user_address ($id_address_set, $id_address_type, $name, $comment){
	$db = connect_db ();

	$sql = "UPDATE tbl_user_address_set set name='$name', comment='$comment', id_address_type='$id_address_type' where id_address_set=$id_address_set";

	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok", text:"Обновление прошло успешно"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function update_client_address ($id_address_set, $id_address_type, $name, $comment){
	$db = connect_db ();

	$sql = "UPDATE tbl_client_address_set set name='$name', comment='$comment', id_address_type='$id_address_type' where id_address_set=$id_address_set";

	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok", text:"Обновление прошло успешно"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------ТЕЛЕФОНЫ------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

// Получение списка телефонов
function get_phone_list ($id_owner, $owner_type){

	if (strcasecmp($owner_type, 'user') == 0) {
		get_user_phone_list ($id_owner);
	}
	else if (strcasecmp($owner_type, 'client') == 0)
		get_client_phone_list ($id_owner);
}

function get_user_phone_list ($id_user){
	$db = connect_db ();

	$sql = "SELECT 	
					id_phone_set,
					phone, 
					if (is_primary=1, 'Основной', 'Не основной') as is_primary_text,
					is_primary, 
					comment
			FROM tbl_user_phone_set 
			WHERE id_user=$id_user";


	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_phone_set:'.$row{'id_phone_set'}.
					', phone:"'.$row{'phone'}.
					'", is_primary_text:"'.$row{'is_primary_text'}.
					'", is_primary:'.$row{'is_primary'}.
					', comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_phone_set:'.$row{'id_phone_set'}.
					', phone:"'.$row{'phone'}.
					'", is_primary_text:"'.$row{'is_primary_text'}.
					'", is_primary:'.$row{'is_primary'}.
					', comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({phone_list:'.$result_list.'})';
}

function get_client_phone_list ($id_client){
	$db = connect_db ();

	$sql = "SELECT 	
					id_phone_set,
					phone, 
					if (is_primary=1, 'Основной', 'Не основной') as is_primary_text,
					is_primary, 
					comment
			FROM tbl_client_phone_set 
			WHERE id_client=$id_client";


	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_phone_set:'.$row{'id_phone_set'}.
					', phone:"'.$row{'phone'}.
					'", is_primary_text:"'.$row{'is_primary_text'}.
					'", is_primary:'.$row{'is_primary'}.
					', comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_phone_set:'.$row{'id_phone_set'}.
					', phone:"'.$row{'phone'}.
					'", is_primary_text:"'.$row{'is_primary_text'}.
					'", is_primary:'.$row{'is_primary'}.
					', comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({phone_list:'.$result_list.'})';
}



// Добавление телефона
function add_phone ($id_owner, $owner_type, $phone, $is_primary, $comment){


	if (strcasecmp($owner_type, 'user') == 0) {
		add_user_phone ($id_owner, $phone, $is_primary, $comment);
	}
	else if (strcasecmp($owner_type, 'client') == 0)
	{
		add_client_phone ($id_owner, $phone, $is_primary, $comment);
	}
}

function add_user_phone ($id_user, $phone, $is_primary, $comment){
	$db = connect_db ();
	$sql = "INSERT INTO tbl_user_phone_set(id_user, phone, is_primary, comment) VALUES ('$id_user','$phone', $is_primary,'$comment')";

	//echo $sql;
	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Телефон добавлен"})'; 
	else
		echo $_GET['callback'].'({result:"error of adding user phone", text:"Ошибка сервера"})'; 

	mysqli_close ($db);
}

function add_client_phone ($id_client, $phone, $is_primary, $comment){
	$db = connect_db ();
	$sql = "INSERT INTO tbl_client_phone_set(id_client, phone, is_primary, comment) VALUES ('$id_client','$phone', $is_primary,'$comment')";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Телефон добавлен"})'; 
	else
		echo $_GET['callback'].'({result:"error of adding client phone", text:"Ошибка сервера"})'; 

	mysqli_close ($db);
}




// Удаление телефона
function delete_phone ($id_phone_set, $owner_type){

	if (strcasecmp($owner_type, 'user') == 0) {
		delete_user_phone ($id_phone_set);
	}
	else if (strcasecmp($owner_type, 'client') == 0)
		delete_client_phone ($id_phone_set);
}

function delete_user_phone ($id_phone_set){
	$db = connect_db ();

	$sql = "DELETE FROM tbl_user_phone_set where id_phone_set='$id_phone_set'";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Телефон удален"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function delete_client_phone ($id_phone_set){
	$db = connect_db ();

	$sql = "DELETE FROM tbl_client_phone_set where id_phone_set='$id_phone_set'";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Телефон удален"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}



// Обновление телефона
function update_phone ($id_phone_set, $owner_type, $phone, $is_primary, $comment){

	if (strcasecmp($owner_type, 'user') == 0) {
		update_user_phone ($id_phone_set, $phone, $is_primary, $comment);
	}
	else if (strcasecmp($owner_type, 'client') == 0)
		update_client_phone ($id_phone_set, $phone, $is_primary, $comment);
}

function update_user_phone ($id_phone_set, $phone, $is_primary, $comment){
	$db = connect_db ();

	$sql = "UPDATE tbl_user_phone_set set phone='$phone', comment='$comment', is_primary=$is_primary where id_phone_set=$id_phone_set";

	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok", text:"Обновление прошло успешно"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function update_client_phone ($id_phone_set, $phone, $is_primary, $comment){
	$db = connect_db ();

	$sql = "UPDATE tbl_client_phone_set set phone='$phone', comment='$comment', is_primary=$is_primary where id_phone_set=$id_phone_set";

	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok", text:"Обновление прошло успешно"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}




//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Группы типов одежды-------------------------------------
//-------------------------------------------------------------------------------------------------------------------

// Получение списка групп типов одежды
function get_itemgroup_list (){
	$db = connect_db ();

	$sql = "SELECT  id_item_type_group, 
					name, 
					comment
			FROM tbl_item_type_group";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_item_type_group:'.$row{'id_item_type_group'}.
					', name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_item_type_group:'.$row{'id_item_type_group'}.
						', name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({itemgroup_list:'.$result_list.'})';
}

// Удаление группы типа одежды
function delete_itemgroup ($id_item_type_group){
	$db = connect_db ();

	$sql = "DELETE FROM tbl_item_type_group where id_item_type_group='$id_item_type_group'";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Группа типа удалена"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

// Обновление группы типа одежды
function update_itemgroup_data ($id_item_type_group, $name, $comment){

	$db = connect_db ();

	$sql = "UPDATE tbl_item_type_group set name='$name', comment='$comment' where id_item_type_group=$id_item_type_group";

	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok", text:"Обновление прошло успешно"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}




//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Клиенты-------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

// Получение списка клиентов
function get_client_list (){

	$db = connect_db ();

	$sql = 'SELECT SQL_NO_CACHE c.id_client, c.name, c.surname, c.patronymic, c.birthday, c.date_create, c.comment, s.name as gender, c.id_gender
			FROM tbl_clients as c
				join tbl_gender s on c.id_gender = s.id_gender
			where 1';

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_client:'.$row{'id_client'}.
					', name:"'.$row{'name'}.
					'", surname:"'.$row{'surname'}.
					'", patronymic:"'.$row{'patronymic'}.
					'", birthday:"'.$row{'birthday'}.
					'", gender:"'.$row{'gender'}.
					'", id_gender:"'.$row{'id_gender'}.
					'", date_create:"'.$row{'date_create'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
	   		$result_list .= ',{id_client:'.$row{'id_client'}.
					', name:"'.$row{'name'}.
					'", surname:"'.$row{'surname'}.
					'", patronymic:"'.$row{'patronymic'}.
					'", birthday:"'.$row{'birthday'}.
					'", gender:"'.$row{'gender'}.
					'", id_gender:"'.$row{'id_gender'}.
					'", date_create:"'.$row{'date_create'}.
					'", comment:"'.$row{'comment'}.'"}';

		}

		$result_list .= ']';
	}
	else
		$result_list .= '[]';
	

	mysqli_close ($db);


	echo $_GET['callback'].'({client_list:'.$result_list.'})';
}

// Обновление данных клиента
function update_client_data ($id_client, $name, $surname, $patronymic, $birthday, $id_gender, $comment){

	$db = connect_db ();

	$sql = "UPDATE tbl_clients set name='$name', surname='$surname', patronymic='$patronymic', birthday='$birthday', id_gender='$id_gender', comment='$comment' where id_client=$id_client";


	if (mysqli_query ($db, $sql))

		echo $_GET['callback'].'({result:"ok"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

// Добавить клиента
function add_client ($name, $surname, $patronymic, $id_gender, $birthday, $comment){

	$db = connect_db ();

	$sql = "INSERT INTO tbl_clients(name, surname, patronymic, date_create, birthday, id_gender, comment) 
					VALUES ('$name','$surname','$patronymic',CURDATE(),'$birthday', $id_gender, '$comment')";


	if (mysqli_query ($db, $sql))
	{
		$sql = "SELECT max(id_client) as id_client from tbl_clients where 1";
		$sql_result = mysqli_query ($db, $sql)
			or die('Error querying database.');

		$row = mysqli_fetch_array($sql_result);
		$new_client_id = 0;

		if (mysqli_num_rows ($sql_result) <> 0)
		{
			$new_client_id = $row{'id_client'};
			echo $_GET['callback'].'({result:"ok", id_user:'.$new_client_id.', text:"Клиент добавлен"})';
		}
		else
			echo $_GET['callback'].'({result:"error of adding new client", text:"Ошибка сервера"})'; 
		
	}
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

function delete_client ($id_client){

	$db = connect_db ();

	$sql = "DELETE FROM tbl_clients where id_client='$id_client'";
	$sql2 = "DELETE FROM tbl_client_phone_set where id_client='$id_client'";
	$sql3 = "DELETE FROM tbl_clients_address_set where id_client='$id_client'";

	if (mysqli_query ($db, $sql) && mysqli_query ($db, $sql2) && mysqli_query ($db, $sql3))
		echo $_GET['callback'].'({result:"ok", text:"Клиент удален. НАВЕЧНО! Крутитесь как хотите теперь!"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}


// Получить количество заказов у клиента
function get_client_order_count ($id_client){
	$db = connect_db ();

	$sql = "SELECT * from tbl_orders where id_client = '$id_client'";
	$sql_result = mysqli_query ($db, $sql)
			or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);

	echo $_GET['callback'].'({result:"ok", order_count:'.mysqli_num_rows ($sql_result).'})';

	mysqli_close ($db);
}


//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Справочники---------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

// Получение списка типов адресов
function get_address_type_list (){
	$db = connect_db ();

	$sql = "SELECT 	id_address_type, 
					name, 
					comment
			FROM tbl_address_types";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_address_type:'.$row{'id_address_type'}.
					', name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_address_type:'.$row{'id_address_type'}.
						', name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({address_type_list:'.$result_list.'})';
}

// Получить список полов
function get_gender_list (){
	$db = connect_db ();

	$sql = "SELECT 	id_gender, 
					name, 
					comment
			FROM tbl_gender";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_gender:'.$row{'id_gender'}.
					', name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_gender:'.$row{'id_gender'}.
						', name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({gender_list:'.$result_list.'})';
}

// Получение списка типов групп одежды
function get_item_type_groups (){
	$db = connect_db ();

	$sql = "SELECT 	id_item_type_group, 
					name, 
					comment
			FROM tbl_item_type_groups";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_item_type_group:'.$row{'id_item_type_group'}.
					', name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_item_type_group:'.$row{'id_item_type_group'}.
						', name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({item_type_groups_list:'.$result_list.'})';
}

// Получение списка типов одежды по идентификатору группы
function get_item_types_by_group_type ($id_item_type_group){
	$db = connect_db ();

	$sql = "SELECT 	id_item_type, 
					name,
					is_home_weight,
					is_only_piece,
					comment
			FROM tbl_item_types 
			where id_item_type_group='$id_item_type_group'";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_item_type:'.$row{'id_item_type'}.
					',is_home_weight:'.$row{'is_home_weight'}.
					',is_only_piece:'.$row{'is_only_piece'}.
					', name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_item_type:'.$row{'id_item_type'}.
		   				',is_home_weight:'.$row{'is_home_weight'}.
		   				',is_only_piece:'.$row{'is_only_piece'}.
						', name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({item_types_list:'.$result_list.'})';
}

// Получение списка цветов
function get_color_list (){
	$db = connect_db ();

	$sql = "SELECT 	id_color, 
					name, 
					color_code,
					comment
			FROM tbl_colors";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_color:'.$row{'id_color'}.
					', name:"'.$row{'name'}.
					'", color_code:"'.$row{'color_code'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_color:'.$row{'id_color'}.
						', name:"'.$row{'name'}.
						'", color_code:"'.$row{'color_code'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({color_list:'.$result_list.'})';
}

// Получение списка статусов заказов
function get_order_status_list (){
	$db = connect_db ();

	$sql = "SELECT 	id_status, 
					name, 
					comment
			FROM tbl_status_types";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_status:'.$row{'id_status'}.
					', name:"'.$row{'name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_status:'.$row{'id_status'}.
						', name:"'.$row{'name'}.
						'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({status_list:'.$result_list.'})';
}




//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Прайс-листы---------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


// Получить все действующие прайсы вещей 
function get_current_price_list_by_item_id ($id_item_type){

	$db = connect_db ();

	$sql = "SELECT 	p.id_price, 
					pt.name price_type_name, 
					price
			FROM  `tbl_item_prices` p
			JOIN  `tbl_item_price_types` pt ON p.id_item_price_type = pt.id_item_price_type
			WHERE id_item_type = '$id_item_type'
			AND CURDATE( ) 
			BETWEEN ds
			AND IFNULL( df,  '4000-01-01' ) ";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_price:'.$row{'id_price'}.
					', price_type_name:"'.$row{'price_type_name'}.
					'", price:'.$row{'price'}.'}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_price:'.$row{'id_price'}.
						', price_type_name:"'.$row{'price_type_name'}.
						'", price:'.$row{'price'}.'}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({current_price_list:'.$result_list.'})';
}

// Получить все действующие прайсы на итог заказа
function get_current_order_price_list (){

	$db = connect_db ();

	$sql = "SELECT 	p.id_price, 
					pt.name price_type_name, 
					price
			FROM  `tbl_order_prices` p
			JOIN  `tbl_order_price_types` pt ON p.id_price_type = pt.id_price_type
			WHERE CURDATE( ) 
			BETWEEN ds
			AND IFNULL(df,  '4000-01-01' ) ";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_price:'.$row{'id_price'}.
					', price_type_name:"'.$row{'price_type_name'}.
					'", price:'.$row{'price'}.'}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_price:'.$row{'id_price'}.
						', price_type_name:"'.$row{'price_type_name'}.
						'", price:'.$row{'price'}.'}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({current_order_price_list:'.$result_list.'})';
}




//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Акции---------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

// Получить все действующие акции по идентификатору вещи
function get_current_action_by_item_id ($id_item_type){

	$db = connect_db ();

	$sql = "SELECT 	a.id_action, 
					a.name action_name, 
					at.name action_type,
					action_value,
					id_item_type
			FROM  `tbl_item_actions` a
			JOIN  `tbl_item_action_detail` ad ON a.id_action = ad.id_action
			JOIN  `tbl_action_types` at ON a.id_action_type = at.id_action_type
			WHERE id_item_type = '$id_item_type'
				AND CURDATE( ) 
				BETWEEN ds AND IFNULL(df, '4000-01-01')";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_action:'.$row{'id_action'}.
					', action_name:"'.$row{'action_name'}.
					'",action_type:"'.$row{'action_type'}.
					'", action_value:'.$row{'action_value'}.
					',id_item_type:'.$row{'id_item_type'}.'}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_action:'.$row{'id_action'}.
					', action_name:"'.$row{'action_name'}.
					'",action_type:"'.$row{'action_type'}.
					'", action_value:'.$row{'action_value'}.
					',id_item_type:'.$row{'id_item_type'}.'}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({current_item_action_list:'.$result_list.'})';
}

// Получить все действующие акции на сумму заказа
function get_current_order_actions (){

	$db = connect_db ();

	$sql = "SELECT 	a.id_action, 
					a.name action_name, 
					at.name action_type,
					action_value
			FROM  `tbl_order_actions` a
			JOIN  `tbl_action_types` at ON a.id_action_type = at.id_action_type
			WHERE CURDATE( ) BETWEEN ds AND IFNULL(df, '4000-01-01')
			ORDER BY action_name";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_action:'.$row{'id_action'}.
					', action_name:"'.$row{'action_name'}.
					'",action_type:"'.$row{'action_type'}.
					'", action_value:'.$row{'action_value'}.'}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_action:'.$row{'id_action'}.
					', action_name:"'.$row{'action_name'}.
					'",action_type:"'.$row{'action_type'}.
					'", action_value:'.$row{'action_value'}.'}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({current_order_action_list:'.$result_list.'})';
}


//-------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------Заказы--------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------


// Добавление шапки заказа
function add_order ($id_client, $id_action, $container_count, $weight_home, $weight_dress, $ticket_number, $is_white, $comment){

	$db = connect_db ();

	$sql = "INSERT INTO tbl_orders(id_client, id_action, date_create, сontainer_count, weight_home, weight_dress, ticket_number, is_white, comment) 
			VALUES ('$id_client', '$id_action', CURDATE(), '$container_count','$weight_home', '$weight_dress', '$ticket_number', $is_white,'$comment')";

			

	if (mysqli_query ($db, $sql))
	{


		$sql = "SELECT max(id_order) as id_order from tbl_orders where 1";
		$sql_result = mysqli_query ($db, $sql)
			or die('Error querying database.');

		

		$row = mysqli_fetch_array($sql_result);
		$new_id_order= 0;

		if (mysqli_num_rows ($sql_result) <> 0)
		{

			$new_id_order = $row{'id_order'};
			add_order_status ($new_id_order, get_order_id_status_by_name ('Заказ создан'));


			echo $_GET['callback'].'({result:"ok", id_order:'.$new_id_order.', text:"Заказ добавлен"})';
		}
		else
			echo $_GET['callback'].'({result:"error of adding new order", text:"Ошибка сервера"})'; 
		
	}
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}


// Добавляет статус закаа в таблицу статусов
function add_order_status ($id_order, $id_status){

	
	$db = connect_db ();

	$sql = "INSERT INTO tbl_order_status (id_order, id_status, ds) 
			VALUES ('$id_order', '$id_status', NOW())";
	

	mysqli_query ($db, $sql);
	mysqli_close ($db);
}


// Добавление деталей заказа
function add_order_detail ($id_order, $id_item_type, $id_action, $id_color, $id_gender, $wear, $count, $id_price, $is_label, $comment){

	$db = connect_db ();

	$sql = "INSERT INTO tbl_order_details (id_order, id_item_type, id_action, id_color, id_gender, wear, count, id_price, is_label, comment) 
			VALUES ('$id_order', '$id_item_type', '$id_action', '$id_color', '$id_gender', '$wear', '$count', '$id_price', '$is_label', '$comment')";


	if (mysqli_query ($db, $sql))
	{
		$sql = "SELECT max(id_order_detail) as id_order_detail from tbl_order_details where 1";
		$sql_result = mysqli_query ($db, $sql)
			or die('Error querying database.');

		$row = mysqli_fetch_array($sql_result);
		$new_id_order_detail= 0;

		if (mysqli_num_rows ($sql_result) <> 0)
		{
			$new_id_order_detail = $row{'id_order_detail'};
			echo $_GET['callback'].'({result:"ok", id_order_detail:'.$new_id_order_detail.', text:"Деталь заказа добавлена"})';
		}
		else
			echo $_GET['callback'].'({result:"error of adding new order detail", text:"Ошибка сервера"})'; 
		
	}
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}


// получить идентификатор статуса по наименованию статуса
function get_order_id_status_by_name ($name_status){

	$db = connect_db ();

	$sql = "SELECT 	s.id_status
			FROM  `tbl_status_types` s
			WHERE s.name = '$name_status'";



	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$id_status = 0;

	if (mysqli_num_rows ($sql_result) <> 0)
		return $row{'id_status'};
	
	mysqli_close ($db);

	return $id_status;
}


// Получить все заказы
function get_order_list (){

	$db = connect_db ();

	$sql = "SELECT 	o.id_order, 
					o.id_action, 
					o.id_client,
					o.id_executor,
					o.сontainer_count as cont_count,
					o.weight_home,
					o.weight_dress,
					o.ticket_number,
					o.is_white,
					o.date_create,
					(select id_status
					from tbl_order_status s 
					where s.id_order = o.id_order 
                     	and ds = (select max(ds) from tbl_order_status where id_order=o.id_order)) as id_status,
					o.comment
			FROM  tbl_orders o";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_order:'.$row{'id_order'}.
					', id_action:'.$row{'id_action'}.
					', id_client:'.$row{'id_client'}.
					', id_executor:'.$row{'id_executor'}.
					', cont_count:'.$row{'cont_count'}.
					', weight_home:'.$row{'weight_home'}.
					', weight_dress:'.$row{'weight_dress'}.
					', ticket_number:'.$row{'ticket_number'}.
					', date_create:"'.$row{'date_create'}.
					'", is_white:'.$row{'is_white'}.
					', id_status:'.$row{'id_status'}.
					', comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_order:'.$row{'id_order'}.
					', id_action:'.$row{'id_action'}.
					', id_client:'.$row{'id_client'}.
					', id_executor:'.$row{'id_executor'}.
					', cont_count:'.$row{'cont_count'}.
					', weight_home:'.$row{'weight_home'}.
					', weight_dress:'.$row{'weight_dress'}.
					', ticket_number:'.$row{'ticket_number'}.
					', date_create:"'.$row{'date_create'}.
					'", is_white:'.$row{'is_white'}.
					', id_status:'.$row{'id_status'}.
					', comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({order_list:'.$result_list.'})';
}

// Получить все заказы для прозвона
function get_order_for_phone_list (){

	$db = connect_db ();

	$sql = "SELECT * 
		    FROM
		    (SELECT s.id_order, o.date_create, st.name status_name, c.surname, c.name, c.patronymic, p.phone,
		     	(SELECT max(ds) 
		         FROM tbl_order_status osi 
		            JOIN tbl_status_types sti ON osi.id_status = sti.id_status
		         WHERE osi.id_order = s.id_order AND sti.name = 'Заказ готов') as done_date,
		        (SELECT max(ds) 
		         FROM tbl_order_status osi 
		            JOIN tbl_status_types sti ON osi.id_status = sti.id_status
		         WHERE osi.id_order = s.id_order AND sti.name = 'Клиент оповещен') as last_phone_date
		    FROM tbl_orders o  
				JOIN tbl_clients c ON o.id_client = c.id_client
		     	JOIN tbl_client_phone_set p ON c.id_client = p.id_client
		     	JOIN tbl_order_status s ON o.id_order = s.id_order
		        JOIN 
		            (SELECT id_order, max(ds) ds
		            FROM tbl_order_status st
		            GROUP BY id_order) ls 
		        ON s.id_order = ls.id_order AND s.ds=ls.ds
		        JOIN tbl_status_types st ON s.id_status = st.id_status) as s
		WHERE (status_name = 'Заказ готов' ) or (status_name='Клиент оповещен' AND last_phone_date < now()-interval 8 second)
		ORDER BY status_name, date_create";
	//AND last_phone_date is null
		//echo $sql;

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';

	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$last_phone_date = 'Не прозванивался';
		if (!is_null($row{'last_phone_date'}))
			$last_phone_date = date_format(date_create_from_format('Y-m-d G:i:s', $row{'last_phone_date'}),'Y.m.d G:i:s');


		$result_list = '[{id_order:'.$row{'id_order'}.
					', date_create:"'.date_format(date_create_from_format('Y-m-d', $row{'date_create'}),'Y.m.d').
					'", status_name:"'.$row{'status_name'}.
					'", surname:"'.$row{'surname'}.
					'", name:"'.$row{'name'}.
					'", patronymic:"'.$row{'patronymic'}.
					'", phone:"'.$row{'phone'}.
					'", done_date:"'.date_format(date_create_from_format('Y-m-d G:i:s', $row{'done_date'}),'Y.m.d').
					'", last_phone_date:"'.$last_phone_date.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {

			$last_phone_date = 'Не прозванивался';
			if (!is_null($row{'last_phone_date'}))
				$last_phone_date = date_format(date_create_from_format('Y-m-d G:i:s', $row{'last_phone_date'}),'Y.m.d G:i:s');

		   $result_list .= ',{id_order:'.$row{'id_order'}.
					', date_create:"'.date_format(date_create_from_format('Y-m-d', $row{'date_create'}),'Y.m.d').
					'", status_name:"'.$row{'status_name'}.
					'", surname:"'.$row{'surname'}.
					'", name:"'.$row{'name'}.
					'", patronymic:"'.$row{'patronymic'}.
					'", phone:"'.$row{'phone'}.
					'", done_date:"'.date_format(date_create_from_format('Y-m-d G:i:s', $row{'done_date'}),'Y.m.d').
					'", last_phone_date:"'.$last_phone_date.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({order_for_phone_list:'.$result_list.'})';
}


// Получить детали заказа по id_order
function get_order_detail_by_id_order ($id_order){

	$db = connect_db ();

	$sql = " SELECT @rn:=@rn+1 AS number, 
				id_order_detail,
				id_order, 
				it.id_item_type, 
				it.name item_type_name,
				it.id_item_type_group,
				it.hanger,
				o.count,
				c.id_color,
				c.name color,
				IFNULL(g.id_gender,0) id_gender,
				g.name gender,
				wear,
				p.id_price,
				ipt.name price_type,
				price,
				price result_price,
				IFNULL(a.id_action,0) id_action,
				a.name as action_name,
				at.name as action_type,
				IFNULL(a.action_value,0) as action_value,
				is_label as is_lable,
				o.comment,
				it.is_home_weight,
				it.name wear_name
			    FROM tbl_order_details as o
			        join tbl_item_types as it on o.id_item_type = it.id_item_type
					join tbl_colors c on o.id_color = c.id_color
					join tbl_item_prices p on o.id_price = p.id_price
					join tbl_item_price_types ipt on p.id_item_price_type = ipt.id_item_price_type
					left join tbl_item_actions a on o.id_action = a.id_action
					left join tbl_action_types at on a.id_action_type = at.id_action_type
					left join tbl_gender g on o.id_gender = g.id_gender,
				(SELECT @rn:=0) t2
			where id_order = '$id_order'";

	$sql_result = mysqli_query ($db, $sql)
		or die('Error querying database.');

	$row = mysqli_fetch_array($sql_result);
	$result_list = '';


	if (mysqli_num_rows ($sql_result) <> 0)
	{
		$result_list = '[{id_order:'.$row{'id_order'}.
					', id_item_type:'.$row{'id_item_type'}.
					', id_order_detail:'.$row{'id_order_detail'}.
					', item_type_name:"'.$row{'item_type_name'}.
					'", id_item_type_group:'.$row{'id_item_type_group'}.
					', count:'.$row{'count'}.
					', id_color:'.$row{'id_color'}.
					', color:"'.$row{'color'}.
					'", id_gender:'.$row{'id_gender'}.
					', gender:"'.$row{'gender'}.
					'", wear:'.$row{'wear'}.
					', id_price:'.$row{'id_price'}.
					', price_type:"'.$row{'price_type'}.
					'", price:'.$row{'price'}.
					', result_price:'.$row{'result_price'}.
					', id_action:'.$row{'id_action'}.
					', action_name:"'.$row{'action_name'}.
					'", action_type:"'.$row{'action_type'}.
					'", action_value:'.$row{'action_value'}.
					', is_lable:'.$row{'is_lable'}.
					', hanger:'.$row{'hanger'}.
					', is_home_weight:'.$row{'is_home_weight'}.
					', wear_name:"'.$row{'wear_name'}.
					'", comment:"'.$row{'comment'}.'"}';

		while ($row = mysqli_fetch_array($sql_result)) {
		   $result_list .= ',{id_order:'.$row{'id_order'}.
					', id_item_type:'.$row{'id_item_type'}.
					', id_order_detail:'.$row{'id_order_detail'}.
					', item_type_name:"'.$row{'item_type_name'}.
					'", id_item_type_group:'.$row{'id_item_type_group'}.
					', count:'.$row{'count'}.
					', id_color:'.$row{'id_color'}.
					', color:"'.$row{'color'}.
					'", id_gender:'.$row{'id_gender'}.
					', gender:"'.$row{'gender'}.
					'", wear:'.$row{'wear'}.
					', id_price:'.$row{'id_price'}.
					', price_type:"'.$row{'price_type'}.
					'", price:'.$row{'price'}.
					', result_price:'.$row{'result_price'}.
					', id_action:'.$row{'id_action'}.
					', action_name:"'.$row{'action_name'}.
					'", action_type:"'.$row{'action_type'}.
					'", action_value:'.$row{'action_value'}.
					', is_lable:'.$row{'is_lable'}.
					', hanger:'.$row{'hanger'}.
					', is_home_weight:'.$row{'is_home_weight'}.
					', wear_name:"'.$row{'wear_name'}.
					'", comment:"'.$row{'comment'}.'"}';
		}
		$result_list .= ']';
	}
	else
		$result_list .= '[]';

	mysqli_close ($db);

	echo $_GET['callback'].'({order_detail_list:'.$result_list.'})';
}

// Удалить заказ (и детали и историю стстусов)
function delete_order ($id_order){

	$db = connect_db ();

	$sql = "DELETE FROM tbl_orders where id_order='$id_order'";
	$sql_2 = "DELETE FROM tbl_order_details where id_order='$id_order'";
	$sql_3 = "DELETE FROM tbl_order_status where id_order='$id_order'";


	if (mysqli_query ($db, $sql) && mysqli_query ($db, $sql_2) && mysqli_query ($db, $sql_3))
		echo $_GET['callback'].'({result:"ok", text:"Заказ удален. НАВЕЧНО! Крутитесь как хотите теперь!"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}


// Обновлние шапки заказа
function update_order ($id_order, $id_client, $id_action, $container_count, $weight_home, $weight_dress, $ticket_number, $is_white, $comment){

	$db = connect_db ();


	$sql = "UPDATE tbl_orders set id_client=$id_client, id_action=$id_action, сontainer_count=$container_count, weight_home=$weight_home, weight_dress=$weight_dress, ticket_number = $ticket_number, is_white = $is_white, comment='$comment' where id_order = $id_order";


	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}


// Расширенное обновлние шапки заказа и статуса
function update_order_ext ($id_order, $id_status, $id_client, $id_executor, $id_action, $container_count, $weight_home, $weight_dress, $ticket_number, $is_white, $comment){

	$db = connect_db ();

	$sql = "UPDATE tbl_orders set id_client=$id_client, id_action=$id_action, id_executor=$id_executor, сontainer_count=$container_count, weight_home=$weight_home, weight_dress=$weight_dress, ticket_number = $ticket_number, is_white = $is_white, comment='$comment' where id_order = $id_order";

	$sql2 = "INSERT INTO tbl_order_status (id_order, id_status, ds) VALUES ('$id_order', '$id_status', NOW())";


	if (mysqli_query ($db, $sql) && mysqli_query ($db, $sql2))
		echo $_GET['callback'].'({result:"ok", text:"Данные обновлены"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

// Обновить статус как прозвоненный
function update_order_status_as_phoned ($id_order){

	$db = connect_db ();

	$sql = "INSERT INTO tbl_order_status (id_order, id_status, ds) select $id_order, id_status, NOW() from tbl_status_types where name='Клиент оповещен'";


	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok", text:"Данные обновлены"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}


//  Обновление деталей заказа
function update_order_detail ($id_order_detail, $id_item_type, $id_action, $id_color, $id_gender, $wear, $count, $id_price, $is_label, $comment){

	$db = connect_db ();

	$sql = "UPDATE tbl_order_details set id_item_type=$id_item_type, id_action=$id_action, id_color=$id_color, id_gender=$id_gender, wear=$wear, count = $count, id_price=$id_price, is_label=$is_label, comment=$comment where id_order_detail = $id_order_detail";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

// Удаление детали заказа
function delete_order_detail ($id_order_detail){
	$db = connect_db ();

	$sql = "DELETE FROM tbl_order_details where id_order_detail=$id_order_detail";

	if (mysqli_query ($db, $sql))
		echo $_GET['callback'].'({result:"ok"})';
	else
		echo $_GET['callback'].'({result:"error in database"})';

	mysqli_close ($db);
}

$function_name = $_GET['function_name'];

switch ($function_name) {
	case 'get_address_type_list':
		get_address_type_list ();
		break;
	case 'get_order_status_list':
		get_order_status_list ();
		break;
	case 'get_gender_list':
		get_gender_list ();
		break;
	case 'get_item_type_groups':
		get_item_type_groups ();
		break;
	case 'get_item_types_by_group_type':
		get_item_types_by_group_type ($_GET['id_item_type_group']);
		break;
	case 'get_color_list':
		get_color_list ();
		break;
	case 'get_user_list':
		get_user_list ();
		break;
	case 'update_user_data':
		update_user_data ($_GET['id_user'], $_GET['nick'], $_GET['name'], $_GET['surname'], $_GET['patronymic'], $_GET['comment']);
		break;
	case 'add_user':
		add_user ($_GET['nick'], $_GET['password'], $_GET['name'], $_GET['surname'], $_GET['patronymic'], $_GET['comment']);
		break;
	case 'delete_user':
		delete_user ($_GET['id_user']);
		break;
	case 'get_address_list':
		get_address_list ($_GET['id_owner'], $_GET['owner_type']);
		break;
	case 'add_address':
		add_address ($_GET['id_owner'], $_GET['owner_type'], $_GET['id_address_type'], $_GET['name'], $_GET['comment']);
		break;
	case 'delete_address':
		delete_user_address ($_GET['id_address_set'], $_GET['owner_type']);
		break;
	case 'update_address':
		update_address ($_GET['id_address_set'], $_GET['owner_type'], $_GET['id_address_type'], $_GET['name'], $_GET['comment']);
		break;
	case 'get_phone_list':
		get_phone_list ($_GET['id_owner'], $_GET['owner_type']);
		break;
	case 'add_phone':
		add_phone ($_GET['id_owner'], $_GET['owner_type'], $_GET['phone'], $_GET['is_primary'], $_GET['comment']);
		break;
	case 'delete_phone':
		delete_phone ($_GET['id_phone_set'], $_GET['owner_type']);
		break;
	case 'update_phone':
		update_phone ($_GET['id_phone_set'], $_GET['owner_type'], $_GET['phone'], $_GET['is_primary'], $_GET['comment']);
		break;
	case 'get_client_list':
		get_client_list ();
		break;
	case 'update_client_data':
		update_client_data ($_GET['id_client'], $_GET['name'], $_GET['surname'], $_GET['patronymic'], $_GET['birthday'], $_GET['id_gender'], $_GET['comment']);
		break;
	case 'add_client':
		add_client ($_GET['name'], $_GET['surname'], $_GET['patronymic'], $_GET['id_gender'], $_GET['birthday'], $_GET['comment']);
		break;
	case 'delete_client':
		delete_client ($_GET['id_client']);
		break;
	case 'get_client_order_count':
		get_client_order_count ($_GET['id_client']);
		break;
	case 'get_itemgroup_list':
		get_itemgroup_list ();
		break;
	case 'delete_itemgroup':
		delete_itemgroup ($_GET['id_item_type_group']);
		break;
	case 'update_itemgroup_data':
		update_itemgroup_data ($_GET['id_item_type_group'], $_GET['name'], $_GET['comment']);
		break;
	case 'get_current_price_list_by_item_id':
		get_current_price_list_by_item_id ($_GET['id_item_type']);
		break;
	case 'get_current_order_price_list':
		get_current_order_price_list ();
		break;
	case 'add_order':
		add_order ($_GET['id_client'], $_GET['id_action'], $_GET['container_count'], $_GET['weight_home'], $_GET['weight_dress'], $_GET['ticket_number'], $_GET['is_white'], $_GET['comment']);
		break;
	case 'update_order':
		update_order ($_GET['id_order'], $_GET['id_client'], $_GET['id_action'], $_GET['container_count'], $_GET['weight_home'], $_GET['weight_dress'], $_GET['ticket_number'], $_GET['is_white'], $_GET['comment']);
		break;
	case 'update_order_ext':
		update_order_ext ($_GET['id_order'], $_GET['id_status'], $_GET['id_client'], $_GET['id_executor'], $_GET['id_action'], $_GET['container_count'], $_GET['weight_home'], $_GET['weight_dress'], $_GET['ticket_number'], $_GET['is_white'], $_GET['comment']);
		break;
	case 'update_order_status_as_phoned':
		update_order_status_as_phoned ($_GET['id_order']);
		break;
	case 'add_order_detail':
		add_order_detail ($_GET['id_order'], $_GET['id_item_type'], $_GET['id_action'], $_GET['id_color'], $_GET['id_gender'], $_GET['wear'], $_GET['count'], $_GET['id_price'], $_GET['is_label'], $_GET['comment']);
		break;
	case 'update_order_detail':
		update_order_detail ($_GET['id_order_detail'], $_GET['id_item_type'], $_GET['id_action'], $_GET['id_color'], $_GET['id_gender'], $_GET['wear'], $_GET['count'], $_GET['id_price'], $_GET['is_label'], $_GET['comment']);
		break;
	case 'delete_order_detail':
		delete_order_detail ($_GET['id_order_detail']);
		break;
	case 'get_order_detail_by_id_order':
		get_order_detail_by_id_order ($_GET['id_order']);
		break;
	case 'get_order_for_phone_list':
		get_order_for_phone_list ();
		break;
	case 'delete_order':
		delete_order ($_GET['id_order']);
		break;
	case 'get_current_action_by_item_id':
		get_current_action_by_item_id ($_GET['id_item_type']);
		break;
	case 'get_current_order_actions':
		get_current_order_actions ();
		break;
	case 'get_order_list':
		get_order_list ();
		break;
	default:
		# code...
		break;
}



?>