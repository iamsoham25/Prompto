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

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <div className="flex items-center gap-4 mb-2">

            <div className="bg-orange-50 rounded-xl p-3 text-xl">
              📝
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase">
                Prompt
              </p>

              <h2 className="text-2xl font-bold text-slate-900">
                Saved prompt
              </h2>
            </div>

          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-orange-50 border border-orange-200 px-6 py-4 rounded-2xl text-center min-w-[110px]">

          <div className="text-3xl font-bold text-orange-600">
            {item.overall_score}/100
          </div>

          <div className="text-xs font-bold text-orange-500 uppercase tracking-wide">
            Overall
          </div>

        </div>

      </div>


      {/* Prompt Content */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-7">

        <p className="text-lg leading-8 text-slate-700 whitespace-pre-wrap break-words">
          {item.prompt}
        </p>

      </div>


      {/* Evaluation Breakdown */}
      <div className="mt-8">

        <p className="text-sm font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">
          Evaluation Breakdown
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">

          <Score
            title="Clarity"
            value={item.clarity_score}
          />

          <Score
            title="Specificity"
            value={item.specificity_score}
          />

          <Score
            title="Context"
            value={item.context_score}
          />

          <Score
            title="Constraints"
            value={item.constraints_score}
          />

          <Score
            title="Role"
            value={item.role_definition_score}
          />

          <Score
            title="Output"
            value={item.output_format_score}
          />

          <Score
            title="Examples"
            value={item.examples_score}
          />

        </div>

      </div>


      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">

        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase">
            Analyzed
          </p>

          <p className="text-sm text-slate-700 mt-1">
            {new Date(item.created_at).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => onDelete(item._id)}
          className="border border-red-200 bg-white hover:bg-red-50 text-red-600 font-semibold px-6 py-3 rounded-xl transition"
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
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <div className="mt-1">
        <span className="text-xl font-bold text-slate-900">
          {value}
        </span>

        <span className="text-sm text-slate-400">
          /100
        </span>
      </div>

    </div>
  );
}