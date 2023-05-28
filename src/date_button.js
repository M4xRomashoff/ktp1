import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, {useState} from "react";
import GetDataByDate from "./getDatByDate";







export default  function DateButton({dataDate, setDateDate,setDataktp1,setDataktp2,setDataktp3,setDataktp4}){
    const [startDate, setStartDate] = useState(new Date());

    function setDate(date){
        setDateDate(date.getDate()+'-'+(date.getMonth()+1).toString()+'-'+date.getFullYear());
        GetDataByDate(date,setDataktp1,setDataktp2,setDataktp3,setDataktp4);
    }

    return (
        <DatePicker
            closeOnScroll={(e) => e.target === document}
            selected={startDate}
            onChange={(date) => {setStartDate(date);setDate(date)}}
        />
    );
};