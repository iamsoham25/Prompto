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
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
      <h2 className="text-xl text-slate-300 mb-3">
        {title}
      </h2>

      <p className={`text-4xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}