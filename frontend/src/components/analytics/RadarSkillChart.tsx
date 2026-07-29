"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function RadarSkillChart({
    data,
        }:{
        data:any[];
    }){

    return(

        <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
                🎯 Skill Radar
            </h2>

            <div className="h-96">

                <ResponsiveContainer>

                    <RadarChart data={data || []}>

                        <PolarGrid/>

                        <PolarAngleAxis dataKey="skill"/>

                        <PolarRadiusAxis domain={[0,10]}/>

                        <Radar
                            dataKey="score"
                            stroke="#6366F1"
                            fill="#6366F1"
                                        fillOpacity={0.6}
                                    />

                    </RadarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}