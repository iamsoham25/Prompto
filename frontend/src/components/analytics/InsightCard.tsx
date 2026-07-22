"use client";

export default function InsightCard({

title,

value,

color

}:{

title:string;

value:string;

color:string;

}){

return(

<div className={`${color} rounded-3xl shadow-lg p-6`}>

<h3 className="text-lg font-semibold">

{title}

</h3>

<p className="mt-3 text-3xl font-bold">

{value}

</p>

</div>

);

}