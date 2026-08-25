"use client";

interface HistoryCardProps {
  item: any;
  onDelete: (id: string) => void;
}

export default function HistoryCard({
  item,
  onDelete,
}: HistoryCardProps) {
  const getValue = (...values: any[]) => {
    for (const value of values) {
      if (value !== undefined && value !== null && value !== "") {
        return value;
      }
    }

    return 0;
  };

  const prompt = getValue(
    item.prompt,
    item.prompt_text,
    item.promptText,
    item.content
  );

  const overallScore = getValue(
    item.overall_score,
    item.overallScore,
    item.score,
    item.total_score
  );

  const clarityScore = getValue(
    item.clarity_score,
    item.clarityScore,
    item.clarity
  );

  const specificityScore = getValue(
    item.specificity_score,
    item.specificityScore,
    item.specificity
  );

  const contextScore = getValue(
    item.context_score,
    item.contextScore,
    item.context
  );

  const constraintsScore = getValue(
    item.constraints_score,
    item.constraintsScore,
    item.constraints
  );

  const roleScore = getValue(
    item.role_definition_score,
    item.roleDefinitionScore,
    item.role_score,
    item.roleScore,
    item.role
  );

  const outputScore = getValue(
    item.output_format_score,
    item.outputFormatScore,
    item.output_score,
    item.outputScore,
    item.output
  );

  const examplesScore = getValue(
    item.examples_score,
    item.examplesScore,
    item.example_score,
    item.exampleScore,
    item.examples
  );

  const createdAt = getValue(
    item.created_at,
    item.createdAt,
    item.timestamp,
    item.date
  );

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Date unavailable";

  /*
   * Clean excessive blank lines from the prompt.
   * This keeps paragraph spacing without creating
   * huge vertical gaps.
   */
  const cleanPrompt = String(prompt || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return (
    <article
      className="
        w-full
        overflow-hidden
        rounded-[28px]
        border border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-[1px]
        hover:shadow-xl
      "
    >
      {/* ================================================= */}
      {/* CARD HEADER */}
      {/* ================================================= */}

      <div className="p-5 sm:p-7 lg:p-8">

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >

          {/* Prompt heading */}
          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-orange-50
                  text-xl
                "
              >
                📝
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Prompt
                </h2>

                <p className="text-sm text-slate-400">
                  Saved prompt
                </p>
              </div>

            </div>

          </div>

          {/* Overall score */}
          <div className="shrink-0 self-start">

            <div
              className="
                rounded-2xl
                border border-orange-100
                bg-orange-50
                px-5
                py-3
                text-center
              "
            >
              <span className="text-2xl font-extrabold text-orange-600">
                {overallScore}/10
              </span>
            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* PROMPT CONTENT */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            rounded-2xl
            border border-slate-100
            bg-slate-50
            p-5
            sm:p-6
          "
        >
          <p
            className="
              whitespace-pre-wrap
              break-words
              text-[15px]
              leading-7
              text-slate-700
              sm:text-[16px]
              sm:leading-8
            "
          >
            {cleanPrompt || "No prompt content available."}
          </p>
        </div>

        {/* ================================================= */}
        {/* SCORE GRID */}
        {/* ================================================= */}

        <div className="mt-6">

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Prompt Evaluation
          </h3>

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-4
              lg:grid-cols-7
            "
          >

            <Score
              title="Clarity"
              value={clarityScore}
            />

            <Score
              title="Specificity"
              value={specificityScore}
            />

            <Score
              title="Context"
              value={contextScore}
            />

            <Score
              title="Constraints"
              value={constraintsScore}
            />

            <Score
              title="Role"
              value={roleScore}
            />

            <Score
              title="Output"
              value={outputScore}
            />

            <Score
              title="Examples"
              value={examplesScore}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-4
            border-t
            border-slate-100
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>🕒</span>
            <span>{formattedDate}</span>
          </div>

          <button
            type="button"
            onClick={() => onDelete(item._id)}
            className="
              w-full
              rounded-xl
              bg-red-500
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-600
              active:scale-[0.98]
              sm:w-auto
            "
          >
            Delete
          </button>

        </div>

      </div>
    </article>
  );
}


/* ===================================================== */
/* SCORE CARD */
/* ===================================================== */

function Score({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-100
        bg-slate-50
        px-3
        py-4
        text-center
        transition
        hover:bg-slate-100
      "
    >
      <p className="text-xs font-medium text-slate-500 sm:text-sm">
        {title}
      </p>

      <p className="mt-1 text-lg font-extrabold text-slate-950 sm:text-xl">
        {value}/10
      </p>
    </div>
  );
}