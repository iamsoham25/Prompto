"use client";

interface HistoryCardProps {
  item: any;
  onDelete: (id: string) => void;
}

export default function HistoryCard({
  item,
  onDelete,
}: HistoryCardProps) {

  return (

    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold mb-2">
            📝 Prompt
          </h2>

          <p className="text-slate-600 whitespace-pre-wrap">
            {item.prompt}
          </p>

        </div>

        <div className="text-right">

          <div className="bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-bold">

            {item.overall_score}/10

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

        <Score title="Clarity" value={item.clarity} />

        <Score title="Context" value={item.context} />

        <Score title="Constraints" value={item.constraints} />

        <Score title="Examples" value={item.examples} />

      </div>

      <div className="mt-8 flex justify-between items-center">

        <span className="text-slate-500">

          {new Date(item.created_at).toLocaleString()}

        </span>

        <button

          onClick={() => onDelete(item._id)}

          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"

        >

          Delete

        </button>

      </div>

    </div>

  );

}

function Score({

  title,

  value,

}: {

  title: string;

  value: number;

}) {

  return (

    <div className="bg-slate-100 rounded-xl p-4 text-center">

      <p className="text-slate-500 text-sm">

        {title}

      </p>

      <h3 className="text-xl font-bold">

        {value}/10

      </h3>

    </div>

  );

}