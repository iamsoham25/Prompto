"use client";

import{ ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip }from"recharts";

export default function SkillBarChart({

    data

    }:{

    data:any[];

}){

    return(

        <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                📊 Skill Comparison

            </h2>

            <div className="h-96">

                <ResponsiveContainer>

                    <BarChart data={data || []}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="skill"/>

                        <YAxis domain={[0,10]}/>

                        <Tooltip/>

        <Bar

dataKey="score"

fill="#4F46E5"

/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

);

}