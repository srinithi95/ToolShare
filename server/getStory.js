const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const getStory = (req, res) => {
    console.log("get story server");
    
    // let query = `select u.first_name, s.*, si.image_url from users u,story s, story_images si where u.users_id=s.user_id && s.story_id=si.story_id order by s.story_id desc`;
    let query = `select u.first_name, s.story_id, s.user_id, s.description, s.posting_title, si.image_url, st.tool1, st.tool2, st.tool3, st.tool4, st.tool5, sm.material1, sm.material2, sm.material3, sm.material4, sm.material5, sta.tag1, sta.tag2, sta.tag3, sc.category1, sc.category2, sc.category3 from users u,story s, story_images si, story_tools st, story_materials sm, story_tag sta, story_category sc where u.users_id=s.user_id && s.story_id=si.story_id && st.story_id=s.story_id && sm.story_id=s.story_id && sta.story_id=s.story_id && sc.story_id=s.story_id order by s.story_id desc;`
    con.query(query, (error, result, field) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getStory;