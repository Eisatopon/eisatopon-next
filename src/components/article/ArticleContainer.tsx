export default function ArticleContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article
      className="
        mx-auto
        w-full
        max-w-4xl
        px-6
        md:px-10
        py-10
      "
    >
      {children}
    </article>
  );
}