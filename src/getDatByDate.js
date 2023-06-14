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
    const apiUrl2 =`http://192.168.60.197:5000/db/get_ktp_date/${newDate}`;
    const apiUrl1 =`http://localhost:5000/db/get_ktp_date/${newDate}`;
    axios.get(apiUrl1)
        .then((resp) => { const data = resp.data;
            if (data !== undefined){
                console.log('data+++   ',data);
                setDataktp1(getKtp1Data(data));
                setDataktp2(getKtp2Data(data));
                setDataktp3(getKtp3Data(data));
                setDataktp4(getKtp4Data(data));
            }

            return data; })
        .catch(err => { console.log('---ERROR-1--',err);
            axios.get(apiUrl2)
            .then((resp) => { const data = resp.data;
                 return data; })
                .catch(err => { console.log('---ERROR--2-',err); });
        });
}


export async function GetDataByRange(dateA, dateZ, setDataktp1, setDataktp2, setDataktp3, setDataktp4) {
    let newDateA = (new Date(dateA).getFullYear())+'-'
        +((new Date(dateA).getMonth())+1).toString()+'-'
        +(new Date(dateA).getDate());
    let newDateZ = (new Date(dateZ).getFullYear())+'-'
        +((new Date(dateZ).getMonth())+1).toString()+'-'
        +(new Date(dateZ).getDate());

    const apiUrl2 =`http://192.168.60.197:5000/db/get_ktp_range/${newDateA},${newDateZ}`;
    const apiUrl1 =`http://localhost:5000/db/get_ktp_range/${newDateA},${newDateZ}`;

    axios.get(apiUrl1)
        .then((resp) => { const data = resp.data;
            if (data !== undefined){
                setDataktp1(getKtp1Data(data));
                setDataktp2(getKtp2Data(data));
                setDataktp3(getKtp3Data(data));
                setDataktp4(getKtp4Data(data));
            }
            return data; })
        .catch(err => {  console.log('---ERROR-1--',err);
            axios.get(apiUrl2)
                .then((resp) => { const data = resp.data;
                    if (data !== undefined){
                        setDataktp1(getKtp1Data(data));
                        setDataktp2(getKtp2Data(data));
                        setDataktp3(getKtp3Data(data));
                        setDataktp4(getKtp4Data(data));
                    }
                    return data; })
                .catch(err => { console.log('---ERROR--2-',err); });
        });
}

