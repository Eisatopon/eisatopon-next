export default function ArticleSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14">

      <h2
        className="
          mb-6
          text-3xl
          font-bold
          leading-tight
        "
      >
        {title}
      </h2>

      <div
        className="
          space-y-5
          text-[19px]
          leading-9
          text-neutral-300
        "
      >
        {children}
      </div>
    </section>
  );
}