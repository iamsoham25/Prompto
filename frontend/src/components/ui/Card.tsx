type CardProps = {
  title: string;
  value: string;
  color: string;
};

export default function Card({
  title,
  value,
  color,
}: CardProps) {
  return (
    <div
      className=" bg-white border border-slate-200 rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-orange-400 hover:scale-105 transition-all duration-300 cursor-pointer "
    >
      <h2 className="text-slate-500 text-sm uppercase tracking-wider mb-3">
        {title}
      </h2>

      <p className={`text-4xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}