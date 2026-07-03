"use client";

interface ComparisonItem {
  category: string;
  prompt_a: number;
  prompt_b: number;
}

interface ComparisonTableProps {
  comparison: ComparisonItem[];
}

export default function ComparisonTable({
  comparison,
}: ComparisonTableProps) {

  return (

    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

      <h2 className="text-3xl font-bold mb-8 text-slate-900">

        📊 Detailed Comparison

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200">

              <th className="text-left py-4 text-slate-700">
                Category
              </th>

              <th className="text-center py-4 text-orange-500">
                Prompt A
              </th>

              <th className="text-center py-4 text-green-500">
                Prompt B
              </th>

              <th className="text-center py-4">
                Better
              </th>

            </tr>

          </thead>

          <tbody>

            {

              comparison.map((item) => {

                const better =

                  item.prompt_a > item.prompt_b

                    ? "🅰"

                    : item.prompt_b > item.prompt_a

                    ? "🅱"

                    : "🤝";

                return (

                  <tr
                    key={item.category}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className="py-5 font-semibold">

                      {item.category}

                    </td>

                    <td className="text-center">

                      {item.prompt_a}/10

                    </td>

                    <td className="text-center">

                      {item.prompt_b}/10

                    </td>

                    <td className="text-center text-2xl">

                      {better}

                    </td>

                  </tr>

                );

              })

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}