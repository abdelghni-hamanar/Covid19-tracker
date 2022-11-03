import React from 'react';
import { Bar } from "react-chartjs-2";

function Bars({data}) {
    console.log(data);
    const BarChart = (
        data 
        ? <Bar 
             data = {{
                labels:['Cases', 'Recovered','Deaths'],
                datasets : [{
                    label:'People',
                    backgroundColor: ['rgba(0, 0,255,0.5)','rgba(0, 255,0,0.5)','rgba(255, 0,0,0.5)'],
                    data:[data.cases,data.recovered,data.deaths],
                }],
             }}
             option={{
                 legend: {display:false},
                 title:{display:true, text:`current state`},
             }}
           />
        : null
    );



  return (
    <div>
        {BarChart}
    </div>
    
  )
}

export default Bars