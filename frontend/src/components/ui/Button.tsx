type ButtonProps = {
  text: string;
};

export default function Button({
  text,
}: ButtonProps) {
  return (
    <button
      className=" px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 "
    >
      {text}
    </button>
  );
}