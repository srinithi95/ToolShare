const db=require('./db.js')



const getReservations = (req, res) => {
  console.log("get reservations server", req.body.userdata);

  let user_id = req.body.userdata.userId.userId;

  let query = `select t.*,tr.start_date, tr.end_date,ti.image_url from tool t,
   tool_reservation tr, users u, tool_images ti where t.tool_id=tr.tool_id && tr.tool_id=ti.tool_id 
   && u.users_id=tr.user_id and tr.user_id=?;`; //  
  db.con.query(query, [user_id], (error, result, field) => {
    if (error) console.log(error);
    else {
      //hey
      //   console.log("result is", result);

   //   console.log("type is ", result[2].tool_name);

      // result.map((r) => {
      //     let endMonth = new Date(r.end_date).getMonth();
      //     let endDay = new Date(r.end_date).getDay();
      //     let endHour = new Date(r.end_date).getHours();

      //     let currentMonth = new Date().getMonth();
      //     let currentDay = new Date().getDay();
      //     let currentHour = new Date().getHours();

      //     console.log("for tool",r.tool_name,"end month",endMonth,"current month", currentMonth);

      //     if(parseInt(currentMonth) < parseInt(endMonth)){
      //         r.complete = "0";
      //         console.log("in month for", r.tool_name);
      //       }
      //       else if(parseInt(currentDay) < parseInt(endDay)){
      //         r.complete = "0";
      //         console.log("in day for", r.tool_name);
      //       }
      //       else if(parseInt(currentHour) < parseInt(endHour)){
      //         r.complete = "0";
      //         console.log("in hour for", r.tool_name);
      //       }
      //       else{
      //         r.complete = "1";
      //       }
      // })
      for (let i = 0; i < result.length; i++) {
        // let tempStartDate = Date.parse(result[i].start_date);
        // let tempEndDate = Date.parse(result[i].end_date);
        // let currentDate = Date();

        // let endMonth = new Date(result[i].end_date).getMonth();
        // let endDay = new Date(result[i].end_date).getDay();
        // let endHour = new Date(result[i].end_date).getHours();

        // let currentMonth = new Date().getMonth();
        // let currentDay = new Date().getDay();
        // let currentHour = new Date().getHours();

        // if(currentMonth > endMonth){
        //     result[i].complete = "0";
        //     break;
        //   }
        //   else if(currentDay > endDay){
        //     result[i].complete = "0";
        //     break;
        //   }
        //   else if(currentHour > endHour){
        //     result[i].complete = "0";
        //     break;
        //   }
        //   else{
        //     result[i].complete = "1";
        //   }

        let endMonth = new Date(result[i].end_date).getMonth();
        let endDay = new Date(result[i].end_date).getDay();
        let endHour = new Date(result[i].end_date).getHours();

        let currentMonth = new Date().getMonth();
        let currentDay = new Date().getDay();
        let currentHour = new Date().getHours();

        console.log(
          "for tool",
          result[i].tool_name,
          "end month",
          endMonth,
          "current month",
          currentMonth
        );

        // if(parseInt(currentMonth) < parseInt(endMonth)){
        //     result[i].complete = "0";
        //     console.log("in month for", result[i].tool_name);
        //     break;
        //   }
        //   else if(parseInt(currentDay) < parseInt(endDay)){
        //     result[i].complete = "0";
        //     console.log("in day for", result[i].tool_name);
        //     break;
        //   }
        //   else if(parseInt(currentHour) < parseInt(endHour)){
        //     result[i].complete = "0";
        //     console.log("in hour for", result[i].tool_name);
        //     break;
        //   }
        //   else{
        //     result[i].complete = "1";
        //     break;
        //   }
        if (parseInt(currentMonth) <= parseInt(endMonth)) {
          if (parseInt(currentDay) <= parseInt(endDay)) {
            if (parseInt(currentHour) <= parseInt(endHour)) {
              result[i].complete = false;
            } else {
              result[i].complete = false;
            }
          } else {
            result[i].complete = false;
          }
        } else {
          result[i].complete = true;
        }
      }

      console.log("after adding result is:", result);
      res.send(result);
    }
  });
};

module.exports = getReservations;
