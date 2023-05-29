import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis,VictoryScatter,VictoryTooltip, VictoryGroup } from "victory";
import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
import DateButton from "./date_button";
import GetDataByDate from "./getDatByDate"

const boxList = [
    '  КТП 1',
    '  КТП 2',
    '  КТП 3',
    '  КТП 4'
];


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


export default  function BuildGraph(){

    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(true);
    const [checked4, setChecked4] = useState(true);

    const [dataKtp1, setDataktp1] = useState([]);
    const [dataKtp2, setDataktp2] = useState([]);
    const [dataKtp3, setDataktp3] = useState([]);
    const [dataKtp4, setDataktp4] = useState([]);
    const [temp1, setTemp1]= useState(null);
    const [temp2, setTemp2]= useState(null);
    const [temp3, setTemp3]= useState(null);
    const [temp4, setTemp4]= useState(null);
    const [date, setDate]= useState('  ');
    const [date1, setDate1]= useState('  ');
    const [dataDate, setDateDate]= useState(null);
    const [time, setTime]= useState('  ');


   async function getDataFromServer(date) {
       console.log('getDataFromServer(date)', date);
       let data = await GetDataByDate(date);
       if (data != undefined){
       setDataktp1(getKtp1Data(data));
       setDataktp2(getKtp2Data(data));
       setDataktp3(getKtp3Data(data));
       setDataktp4(getKtp4Data(data));}
   }



    useEffect(() => {
        let data1 = [];
        let dataItem = {x:'00:00', y : 20};
        const apiUrl = `http://localhost:5000/db/get_ktp_all`;
            axios.get(apiUrl)
            .then((resp) => {
              const data = resp.data;

                setTemp1(data[data.length-1].temperature1);
                setTemp2(data[data.length-1].temperature2);
                setTemp3(data[data.length-1].temperature3);
                setTemp4(data[data.length-1].temperature4);
                let today = (new Date(data[data.length-1].date_time).getDate()) +'-'
                          +((new Date(data[data.length-1].date_time).getMonth())+1).toString()+'-'
                           +(new Date(data[data.length-1].date_time).getFullYear()) ;
                setDate(today);


                setDate1(getDataFromServer(data[data.length-1].date_time));

                setTime(new Date(data[data.length-1].date_time).getHours()+':'
                             +new Date(data[data.length-1].date_time).getMinutes());

                data.map((item) => {
                    dataItem = {x:item.date_time, y:item.temperature1};
                    data1.push(dataItem);
                    let nd=new Date(item.date_time).getDate();
                    console.log('nd',nd);
                });

                setDataktp1(getKtp1Data(data));
                setDataktp2(getKtp2Data(data));
                setDataktp3(getKtp3Data(data));
                setDataktp4(getKtp4Data(data));

            })
            .catch(err => {
                console.log('---ERROR---',err);
            });

    }, [setDataktp1]);


    return (
        <div className={'div'}>
            <div className={'div1'}>
                <div className={'div2'}>
                    <div className={'div4'}><h2> Температура КТП</h2></div>
                    <div className={'div4'}><DateButton dataDate={dataDate}
                                                        setDateDate={setDateDate}
                                                        setDataktp1={setDataktp1}
                                                        setDataktp2={setDataktp2}
                                                        setDataktp3={setDataktp3}
                                                        setDataktp4={setDataktp4}
                    /></div>

                    {/*<div className={'div4'}><label>  {date1.length}</label></div>*/}

                </div>
                <VictoryChart
                    height={400}
                    width={600}
                    theme={VictoryTheme.material}
                    maxDomain={{ y: 125 }}
                    minDomain={{ y: -60 }}
                >
                    {checked1 && (<VictoryGroup
                        color="#c43a31"
                        labels={({ datum }) =>
                            `температура: ${datum.y} \n время: ${new Date(datum.x).getHours()+':'+new Date(datum.x).getMinutes()}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp1}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    {checked2 && (<VictoryGroup
                        color="#85e0b2"
                        labels= {({ datum }) => `температура: ${datum.y} \n время: ${new Date(datum.x).getHours()+':'+new Date(datum.x).getMinutes()}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp2}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    {checked3 && (<VictoryGroup
                        color="#3a31c4"
                        labels={({ datum }) => `температура: ${datum.y} \n время: ${new Date(datum.x).getHours()+':'+new Date(datum.x).getMinutes()}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp3}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    {checked4 && (<VictoryGroup
                        color="#0e0403"
                        labels= {({ datum }) => `температура: ${datum.y} \n время: ${new Date(datum.x).getHours()+':'+new Date(datum.x).getMinutes()}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp4}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    <VictoryAxis label=" Время (часы) "
                                 tickFormat={(x) => new Date(x).getHours() + ':' + new Date(x).getMinutes()}
                        />

                    <VictoryAxis dependentAxis
                                 label="Темп. С"
                                 tickValues={[-50,-40,-30,-20,-10, 10, 50,60,70,80,90,100,110,120]}/>

                </VictoryChart>

            </div>
            <div className={'div3'}>
                <label>
                <input type="checkbox" checked={checked1} onChange={() => setChecked1(!checked1)} />
                <span >{boxList[0]}</span>
                </label>
                <label>
                <input   type="checkbox" checked={checked2} onChange={() => setChecked2(!checked2)} />
                <span >{boxList[1]}</span>
                </label>
                <label>
                <input  type="checkbox" checked={checked3} onChange={() => setChecked3(!checked3)} />
                <span >{boxList[2]}</span>
                </label>
                <label>
                <input   type="checkbox" checked={checked4} onChange={() => setChecked4(!checked4)} />
                <span >{boxList[3]}</span>
                </label>

            </div>
            <div className={'div3'}>
                <label> Текущие показания</label>
                <label> Дата : {date} </label>
                <label> Время : {time} </label>
                <label> {boxList[0]} ( {temp1}  <sup>o</sup>C )</label>
                <label> {boxList[1]} ( {temp2}  <sup>o</sup>C )</label>
                <label> {boxList[2]} ( {temp3}  <sup>o</sup>C )</label>
                <label> {boxList[3]} ( {temp4}  <sup>o</sup>C )</label>
            </div>
            <div className={'div3'}>
                <a href="http://localhost:5000/db/get_ktp_all_file" download>Данные за все время одним файлом</a>
            </div>

        </div>
    )

}

export class Graph extends Component {
    render() { return ( <BuildGraph/>)}
}