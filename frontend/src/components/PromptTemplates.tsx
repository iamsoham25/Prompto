type Props = {
  onSelect: (prompt: string) => void;
};

export default function PromptTemplates({
  onSelect,
}: Props) {

  const templates = [
    {
      title: "📝 Summarize",
      prompt:
        "Summarize the following text in simple bullet points:",
    },

    {
      title: "📧 Email",
      prompt:
        "Write a professional email regarding:",
    },

    {
      title: "💻 Explain Code",
      prompt:
        "Explain the following code step by step:",
    },

    {
      title: "🌐 Translate",
      prompt:
        "Translate the following text into English:",
    },

    {
      title: "📰 Blog Writer",
      prompt:
        "Write a detailed blog article about:",
    },
  ];

  return (
    <div className="mb-6">

      <h3 className="font-semibold mb-3">
        Prompt Templates
      </h3>

      <div className="flex flex-wrap gap-3">

        {templates.map((template) => (

          <button
            key={template.title}
            onClick={() =>
              onSelect(template.prompt)
            }
            className=" px-4 py-2 rounded-xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition "
          >
            {template.title}
          </button>

        ))}

      </div>

    </div>
  );
}