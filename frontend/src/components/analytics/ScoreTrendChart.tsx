"use client";

import{

ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip

}from"recharts";

export default function ScoreTrendChart({

data

}:{

data:number[];

}){

const chart = (data || []).map(

(score,index)=>({

attempt:index+1,

score

})

);

return(

<div className="bg-white rounded-3xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

📈 Score Trend

</h2>

<div className="h-96">

<ResponsiveContainer>

<LineChart data={chart}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="attempt"/>

<YAxis domain={[0,10]}/>

<Tooltip/>

<Line

type="monotone"

dataKey="score"

stroke="#8B5CF6"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

);

}