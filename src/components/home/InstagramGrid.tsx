import Image from "next/image";
import { Heart } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import PrimaryButton from "@/components/shared/PrimaryButton";
import InstagramIcon from "@/components/shared/InstagramIcon";
import { instagramMock, business } from "@/data/siteContent";

export default function InstagramGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
      <SectionHeading
        title="קשה לא לצלם. עוד יותר קשה לא לטעום."
        align="center"
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {instagramMock.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={post.image}
              alt={post.alt}
              fill
              sizes="(min-width: 768px) 16vw, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-start bg-charcoal/0 p-3 opacity-0 transition-all duration-300 group-hover:bg-charcoal/40 group-hover:opacity-100">
              <span className="flex items-center gap-1 text-xs font-semibold text-warm-white">
                <Heart size={14} aria-hidden fill="currentColor" />
                {post.likes}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PrimaryButton href={business.instagramHref} variant="secondary" external>
          <InstagramIcon size={18} />
          עקבו אחרינו באינסטגרם
        </PrimaryButton>
      </div>
    </section>
  );
}
