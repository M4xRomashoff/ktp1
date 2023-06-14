import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, {useState} from "react";
import GetDataByDate from "./getDatByDate";
import {GetDataByRange} from "./getDatByDate";






export default  function DateButton({setDateEnd,range, setDateF, dateEnd, setDateA, setDateDate,setDataktp1,setDataktp2,setDataktp3,setDataktp4}){
    const [startDate, setStartDate] = useState(new Date());

    function setDate(date){
        let endDate = new Date();
        setDateF(date);
        setDateDate(date.getDate()+'-'+(date.getMonth()+1).toString()+'-'+date.getFullYear());
        setDateA(date.getDate()+'-'+(date.getMonth()+1).toString()+'-'+date.getFullYear());

        if (range === 'День')  {let res = GetDataByDate(date,setDataktp1,setDataktp2,setDataktp3,setDataktp4);}
        if (range === 'Неделя')  {
            endDate.setDate(date.getDate()+7);
            setDateEnd(endDate.getDate()+'-'+(endDate.getMonth()+1)+'-'+endDate.getFullYear());
            let res = GetDataByRange(date, endDate,setDataktp1,setDataktp2,setDataktp3,setDataktp4);}
        if (range === 'Месяц')  {
            endDate.setDate(date.getDate()+30);
            setDateEnd(endDate.getDate()+'-'+(endDate.getMonth()+1)+'-'+endDate.getFullYear());
            let res = GetDataByRange(date, endDate,setDataktp1,setDataktp2,setDataktp3,setDataktp4);}
        if (range === 'Год')  {
            endDate.setDate(date.getDate()+356);
            setDateEnd(endDate.getDate()+'-'+(endDate.getMonth()+1)+'-'+endDate.getFullYear());
            let res = GetDataByRange(date, endDate,setDataktp1,setDataktp2,setDataktp3,setDataktp4);}


    }

    return (
        <DatePicker className={'select'}
            closeOnScroll={(e) => e.target === document}
            selected={startDate}
            onChange={(date) => {setStartDate(date); setDate(date)}}
        />
    );
};