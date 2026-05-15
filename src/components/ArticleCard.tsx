type ArticleCardProps = {
  title: string;
  desc: string;
};

export default function ArticleCard({
  title,
  desc,
}: ArticleCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-400/40 hover:bg-white/10 transition duration-300 hover:-translate-y-1">

      <div className="h-52 rounded-2xl bg-gradient-to-br from-blue-500/30 to-zinc-800 mb-6"></div>

      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-zinc-400 leading-relaxed">
        {desc}
      </p>

    </div>
  );
}