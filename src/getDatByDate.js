import axios from "axios";


function getKtp1Data(data){
    let newData = [];
    let one = {};
    data.map((item)=>{
        one = {y:item.temperature1,x:new Date(item.date_time).getTime()}
        newData.push(one);
    })
    return newData;
}
function getKtp2Data(data){
    let newData = [];
    let one = {};
    data.map((item)=>{
        one = {y:item.temperature2,x:new Date(item.date_time).getTime()}
        newData.push(one);
    })
    return newData;
}
function getKtp3Data(data){
    let newData = [];
    let one = {};
    data.map((item)=>{
        one = {y:item.temperature3,x:new Date(item.date_time).getTime()}
        newData.push(one);
    })
    return newData;
}
function getKtp4Data(data){
    let newData = [];
    let one = {};
    data.map((item)=>{
        one = {y:item.temperature4,x:new Date(item.date_time).getTime()}
        newData.push(one);
    })
    return newData;
}



export default async function GetDataByDate(date,setDataktp1,setDataktp2,setDataktp3,setDataktp4) {
    console.log('date for server  ',date);

    let newDate = (new Date(date).getFullYear())+'-'
        +((new Date(date).getMonth())+1).toString()+'-'
        +(new Date(date).getDate());
    //const apiUrl =`http://localhost:5000/db/get_ktp_date/${newDate}`;
    const apiUrl2 =`http://192.168.60.197:5000/db/get_ktp_date/${newDate}`;
    const apiUrl1 =`http://localhost:5000/db/get_ktp_date/${newDate}`;
    //const apiUrl =`http://192.168.0.89:5000/db/get_ktp_date/${newDate}`;
    //const apiUrl =`http://192.168.0.35:5000/db/get_ktp_date/${newDate}`;
    axios.get(apiUrl1)
        .then((resp) => {
            const data = resp.data;
            console.log('i have data from server',data);
            if (data != undefined){
                setDataktp1(getKtp1Data(data));
                setDataktp2(getKtp2Data(data));
                setDataktp3(getKtp3Data(data));
                setDataktp4(getKtp4Data(data));}
            return data;
        })
        .catch(err => {
            console.log('---ERROR-1--',err);
            axios.get(apiUrl2)
                .then((resp) => {
                    const data = resp.data;
                    console.log('i have data from server',data);
                    if (data != undefined){
                        setDataktp1(getKtp1Data(data));
                        setDataktp2(getKtp2Data(data));
                        setDataktp3(getKtp3Data(data));
                        setDataktp4(getKtp4Data(data));}
                    return data;
                })
                .catch(err => {
                    console.log('---ERROR--2-',err);
                });

        });

}

