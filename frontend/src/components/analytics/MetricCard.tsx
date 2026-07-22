interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
}: MetricCardProps) {

  return (

    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition duration-300">

      <h3 className="text-slate-500 text-sm font-medium">
        {title}
      </h3>

      <h2 className="text-4xl font-bold text-slate-900 mt-3">
        {value}
      </h2>

      {subtitle && (

        <p className="text-slate-400 text-sm mt-2">
          {subtitle}
        </p>

      )}

    </div>

  );
  
}