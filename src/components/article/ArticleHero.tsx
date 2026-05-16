type Props = {
  category: string;
  title: string;
  subtitle: string;
  image: string;
};

export default function ArticleHero({
  category,
  title,
  subtitle,
  image,
}: Props) {
  return (
    <section className="mb-14">
      <div className="relative overflow-hidden rounded-3xl">

        <img
          src={image}
          alt={title}
          className="
            h-[420px]
            w-full
            object-cover
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/85
            via-black/40
            to-transparent
          "
        />

        <div
          className="
            absolute bottom-0
            p-8
            md:p-12
            text-white
          "
        >
          <div
            className="
              mb-4
              inline-block
              rounded-full
              border
              border-white/30
              bg-white/10
              px-4
              py-1
              text-sm
              tracking-wide
              backdrop-blur
            "
          >
            {category}
          </div>

          <h1
            className="
              mb-4
              max-w-3xl
              text-4xl
              font-bold
              leading-tight
              md:text-6xl
            "
          >
            {title}
          </h1>

          <p
            className="
              max-w-2xl
              text-lg
              text-white/85
              md:text-xl
            "
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}