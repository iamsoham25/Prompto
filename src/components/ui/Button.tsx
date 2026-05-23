type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105">
      {text}
    </button>
  );
}