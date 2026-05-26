const ScoreBadge = ({ score }: { score: number }) => {
  const getStyles = () => {
    if (score > 70) return { bg: "bg-green-100", text: "text-green-800", label: "Strong" };
    if (score > 40) return { bg: "bg-yellow-100", text: "text-yellow-800", label: "Good Start" };
    return { bg: "bg-red-100", text: "text-red-800", label: "Needs Work" };
  };

  const { bg, text, label } = getStyles();

  return (
    <div className={`${bg} ${text} rounded-full px-4 py-1 w-fit`}>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default ScoreBadge;