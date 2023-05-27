import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel, VictoryAxis,VictoryScatter,VictoryTooltip, VictoryGroup } from "victory";
import React, {Component, useEffect, useState} from 'react';
import axios from "axios";

const boxList = [
    '  КТП 1',
    '  КТП 2',
    '  КТП 3',
    '  КТП 4'

];

let currentDate = '25 мая';
let currentTime = '16:45';
let temperature = [25,35,33,88];

function convertTime(oldTime){
    let [hours, minutes] = oldTime.split(':');
    let hrs = Number(hours);
    hrs += 3;
    hours = hrs.toString();
    return hours+':'+minutes;
}

function blancDataDay(){
    let newData=[];
    let time = 0;
    let item = {};

    for (let i = 0; i < 24; i++) {
        item = {temperature1:null,temperature2:null,temperature3:null,temperature4:null,time: i};
        newData.push(item);
    }
    return newData;
}

function blancDataHour(){
    let newData=[];
    let time = 0;
    let item = {};

    for (let i = 0; i < 61; i++) {
        item = {temperature1:-300,temperature2:-300,temperature3:-300,temperature4:-300,time: i.toString()};
        newData.push(item);
    }
    return newData;
}

function prepareOneDayData(oldData){
    let newData = blancDataDay();
    let time = 0;

    oldData.map((item)=>{
        time = Number(item.date_time.slice(11,13))+3;
        if (time > 23) time = time - 24;
        newData[time] = {temperature1: item.temperature1,
                         temperature2: item.temperature2,
                         temperature3: item.temperature3,
                         temperature4: item.temperature4,
                         time: time}
    })

    return newData
}

function getKtp1(dataOld){
    let newData = [];
    let one = {};
    dataOld.map((item)=>{
        one = {y:item.temperature1,x:item.time}
        newData.push(one);
    })
    return newData;
}

function getKtp2(dataOld){
    let newData = [];
    let one = {};
    dataOld.map((item)=>{
        one = {y:item.temperature2,x:item.time}
        newData.push(one);
    })
    return newData;
}

function getKtp3(dataOld){
    let newData = [];
    let one = {};
    dataOld.map((item)=>{
        one = {y:item.temperature3,x:item.time}
        newData.push(one);
    })
    return newData;
}

function getKtp4(dataOld){
    let newData = [];
    let one = {};
    dataOld.map((item)=>{
        one = {y:item.temperature4,x:item.time}
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
    const [temp1, setTemp1]= useState(-300);
    const [temp2, setTemp2]= useState(-300);
    const [temp3, setTemp3]= useState(-300);
    const [temp4, setTemp4]= useState(-300);
    const [date, setDate]= useState('  ');
    const [time, setTime]= useState('  ');






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
                setDate(data[data.length-1].date_time.slice(0,10));
                setTime(convertTime(data[data.length-1].date_time.slice(11,16)));
                data.map((item) => {
                    dataItem = {x:item.date_time, y:item.temperature1};
                    data1.push(dataItem);
                });

                setDataktp1(getKtp1(prepareOneDayData(data)));
                setDataktp2(getKtp2(prepareOneDayData(data)));
                setDataktp3(getKtp3(prepareOneDayData(data)));
                setDataktp4(getKtp4(prepareOneDayData(data)));

            })
            .catch(err => {
                console.log('---ERROR---',err);
            });

    }, [setDataktp1]);


    return (
        <div className={'div'}>
            <div className={'div1'}>
                <h1> Температура КТП</h1>
                <VictoryChart
                    height={400}
                    width={600}
                    theme={VictoryTheme.material}
                    maxDomain={{ y: 125 }}
                    minDomain={{ y: -60 }}
                >
                    {checked1 && (<VictoryGroup
                        color="#c43a31"
                        labels={({ datum }) => `y: ${datum.y}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp1}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    {checked2 && (<VictoryGroup
                        color="#85e0b2"
                        labels= {({ datum }) => `y: ${datum.y}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp2}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    {checked3 && (<VictoryGroup
                        color="#3a31c4"
                        labels={({ datum }) => `y: ${datum.y}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp3}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    {checked4 && (<VictoryGroup
                        color="#0e0403"
                        labels= {({ datum }) => `y: ${datum.y}`}
                        labelComponent={<VictoryTooltip style={{ fontSize: 10 }} /> }
                        data={dataKtp4}
                    >
                        <VictoryLine/>
                        <VictoryScatter size={({ active }) => active ? 8 : 6} />
                    </VictoryGroup>)}

                    <VictoryAxis label=" Время (часы) "
                                 tickValues={[0,1,2, 3, 4, 5,6,7,8,9,14,15,16,17,18,19,20,21,22,23]}/>

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
                <label> {boxList[0]} - {temp1} <sup>o</sup>C</label>
                <label> {boxList[1]} - {temp2} <sup>o</sup>C</label>
                <label> {boxList[2]} - {temp3} <sup>o</sup>C</label>
                <label> {boxList[3]} - {temp4} <sup>o</sup>C</label>
            </div>
        </div>
    )

}

export class Graph extends Component {
    render() { return ( <BuildGraph/>)}
}