"use client";

import{ ResponsiveContainer, PieChart, Pie, Tooltip }from"recharts";

export default function ScorePieChart({

    score

    }:{

    score:number;

}){

const data=[

    {

        name:"Score",

        value: score ?? 0

    },

    {

        name:"Remaining",

        value: 10 - (score ?? 0)

}

];

return(

<div className="bg-white rounded-3xl shadow-lg p-6">

<h2 className="text-2xl font-bold mb-6">

🥧 Average Score

</h2>

<div className="h-96">

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="value"

outerRadius={120}

fill="#10B981"

/>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

);

}