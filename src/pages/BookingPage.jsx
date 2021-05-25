import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./bookingpage.css";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useCookies } from 'react-cookie';

const BookingPage = (propBooking
  
) => {

  console.log("checking props",propBooking)

  //const location = useLocation();
  const [startDateInCalendar, setStartDateInCalendar] = React.useState(
    new Date()
  );
  const [startDate, setStartDate] = React.useState(new Date());
  const [startMonth, setStartMonth] = React.useState(new Date());
  const [startHour, setStartHour] = React.useState(new Date());
  const [startMinute, setStartMinute] = React.useState(new Date());

  const [endDateInCalendar, setEndDateInCalendar] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [endMonth, setEndMonth] = React.useState(new Date());
  const [endHour, setEndHour] = React.useState(new Date());
  const [endMinute, setEndMinute] = React.useState(new Date());
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);

  const [toolReservationData, setToolReservationData] = React.useState([]);
  const [userDetails, setUserDetails]=React.useState([]);
  const [firstName,setFirstName]=React.useState("")
  const [userAddress,setUserAddress]=React.useState("")
  const [userCity,setUserCity]=React.useState("")
  const [userState,setUserState]=React.useState("")
  const [userZipCode,setUserZipCode]=React.useState("")
  const [userContactNumber,setUserContactNumber]=React.useState("")
  const [userEmail,setuserEmail]=React.useState("")

  
  React.useEffect(async () => {
    const userId=cookies.userId;
    
    const toolData = {
      toolId: propBooking.state.toolId,
    }
    await axios
      .post("/api/gettoolreservationdates", { toolData })
      .then((response) => {
        let x = response.data;
        // setToolReservationData(response.data);
        console.log("reservation array",x);
        toolReservationData.push(response.data);
      });
      console.log("here",toolReservationData);
  
   axios
      .post("/api/getUsers", { userId })
      .then((response) => {
        let x = response.data;
        
        // setToolReservationData(response.data);
        setFirstName(response.data[0].first_name)
        setUserAddress(response.data[0].address)
        setUserCity(response.data[0].city)
        setUserState(response.data[0].state)
        setUserZipCode(response.data[0].zipcode)
        setUserContactNumber(response.data[0].contact_number)
        setuserEmail(response.data[0].email)
       
      });
      
  }, []);




  const handleStartDate = (date) => {
    console.log("in start date", date);
    console.log("before", startDate);
  };

  const handleStartValueUpdate = (date) => {
    console.log("in test1", date);
    setStartDate(date[0].getDate());
    setStartMonth(date[0].getMonth());
    setStartHour(date[0].getHours());
    setStartMinute(date[0].getMinutes());
    setStartDateInCalendar(date);
    console.log("after", startDate, startMonth, startHour, startMinute);
    console.log("start Date for server is:", startDateInCalendar);
  };

  const handleEndDate = (date) => {
    setEndDateInCalendar(date);
  };

  const handleEndValueUpdate = (date) => {
    console.log("in handle end value update", date);
    setEndDate(date[0].getDate());
    setEndMonth(date[0].getMonth());
    setEndHour(date[0].getHours());
    setEndMinute(date[0].getMinutes());
    setEndDateInCalendar(date);
    console.log("in end, after", endDate, endMonth, endHour, endMinute);
    console.log("end date for server is:", endDateInCalendar);
  };

  const handleSubmit = () => {
    const userId=cookies.userId;
    const reservationData = {
      startDateInCalendar,
      endDateInCalendar,
      userId,
      toolId: propBooking.state.toolId,
    };
 console.log("Inside booking page",userId);
    console.log("*************", reservationData);
    //send tool_id, user_id, start_date, end_date
    axios
      .post("/api/reserveTool", { reservationData })
      .then((response) => {
        console.log(response);
      });
  };
console.log("ou",userDetails)
  return (
    <div id="el">
      You are trying to reserve <strong>{propBooking.state.toolname}</strong> for
      you.
      
      
      <div className="margin-top-30px">
        <strong>Your personal details </strong>
      </div>
      <div className="inside-wrapper1">
        <div className="width-100px1">Name: </div>
        <div>{firstName}</div>
      </div>
      <div className="inside-wrapper1">
        <div className="width-100px1">Address: </div>
        <div>
          {userAddress} <br />
          {userCity} <br />
          {userState} - {userZipCode}
        </div>
      </div>
      <div className="inside-wrapper1">
        <div className="width-100px1">Contact: </div>
        <div> {userContactNumber}</div>
      </div>
      <div className="inside-wrapper1">
        <div className="width-100px1">Email: </div>
        <div> {userEmail}</div>
      </div>
      

      <div className="margin-top-30px">
        <strong>Other details</strong>
        <div>
          Reason for borrowing:{" "}
          <div>
            <textarea
              cols="50"
              rows="4"
              placeholder="Tell us what you plan to do with this tool..."
              onChange={(e) => {}}
            />
          </div>
        </div>
      </div>
      <div className="margin-top-30px">
        <strong>Booking duration</strong>
        {/* <div className="picker-1">From: <button onClick={() => handleSelectStartTime}> Select Start Time</button></div> */}
        <div>From</div>
        <div>
          {/* <DateTimePicker
            value={startDateInCalendar}
            onChange={(e) => {
              handleStartDate(e);
            }}
          /> */}
          <Flatpickr
            data-enable-time
            value={startDateInCalendar}
            onChange={(selectedDates) => {
              handleStartDate(selectedDates);
            }}
            onValueUpdate={(selectedDates) => {
              handleStartValueUpdate(selectedDates);
            }}
            options={{ minDate: "today", dateFormat: "Y-m-d H:i", disable: [function(date){
              // for(let i=0; i<{toolReservationData}.length; i++){
                // return(date.getDate === toolReservationData[0].start_date.getDate())
              // }
              return(date.getDay() === 1);
            }] }}
          />
        </div>
        <div>To</div>
        <div>
          <Flatpickr
            data-enable-time
            value={endDateInCalendar}
            onChange={(selectedDates) => {
              handleEndDate(selectedDates);
            }}
            onValueUpdate={(selectedDates) => {
              handleEndValueUpdate(selectedDates);
            }}
            options={{ minDate: "today", dateFormat: "Y-m-d H:i" }}
          />
        </div>
      </div>
      <div className="align-centre1 inside-wrapper">
        <div>
          <button onClick={handleSubmit}> Submit </button>{" "}
        </div>
      </div>
    </div>
  );
};



export default BookingPage;
