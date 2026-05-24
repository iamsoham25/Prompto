type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBubble({
  role,
  content,
}: Props) {

  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl px-5 py-4 rounded-3xl text-lg leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}