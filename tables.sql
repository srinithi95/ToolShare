create table users(userId int, first_name varchar(30),
 last_name varchar(30) , email varchar(30), address varchar(30), city varchar(30),
 state varchar(30),zipcode varchar(30),
 contact_number int(20),password varchar(30));
 select * from tool;
 create table story_category(stroy_category_id int(25), story_id varchar(50) ,
 category1 varchar(50), category2 varchar(50), category3 varchar(50));
 
 create table story_tag(story_tag_id INT(20) AUTO_INCREMENT primary key , story_id varchar(25), tag1 varchar(50) , tag2 varchar(50),tag3 varchar(50));
 
 CREATE table story_steps(steps_id int(20) AUTO_INCREMENT primary key, text varchar(255), story_id varchar(255));
 
 create table story_images(story_images_id int(11) auto_increment primary key, story_id varchar(255), image_url varchar(255));
 
 create table story_tools(story_tools_id int(11) auto_increment primary key, story_id varchar(50), tool1 varchar(100), tool2 varchar(100),
 tool3 varchar(100), tool4 varchar(100), tool5 varchar(100));
 
 create table story_materials(story_materials_id int(11), story_id varchar(50), material1 varchar(50),material2 varchar(50),
 material3 varchar(50), material4 varchar(50), material5 varchar(50));
 
 create table tool_images(tool_images_id int(11) auto_increment primary key, tool_id varchar(255), image_url varchar(255));
 
 create table tool_contact_details(tool_contact_details_id int(11) auto_increment primary key, tool_id varchar(25),
 contact_name varchar(25),email varchar(25),address varchar(25),city varchar(25),state varchar(25),zipcode varchar(25),
 contact_number varchar(25));
 
 create table tool(tool_id varchar(255)  primary key, user_id int(20), tool_name varchar(50), price int(50),availability varchar(50), description varchar(50),
 make varchar(50), model_name varchar(50), suggested_project varchar(50), email varchar(50),contact_number int(20), contact_name varchar(50),
 address varchar(50), city varchar(50), state varchar(50),zipcode varchar(50),tool_condition varchar(50));
 
 create table tool_reservation(tool_reservation_id int(11) primary key, user_id varchar(50), tool_id varchar(50), start_date varchar(50), end_date varchar(50));
 
 create table user_saved_story(user_saved_id int(200), user_id varchar(255),story_id varchar(255));
 
 create table review(review_id int(11), borrower_id int(11),owner_id int(11), review_text varchar(100), review_point int(11));
 
 create table story(story_id varchar(255), user_id int(15), description varchar(500), tool varchar(100),material varchar(100), category varchar(100)
 ,tag varchar(100),posting_title varchar(50));
 