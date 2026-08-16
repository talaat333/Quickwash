import Link from "next/link";
import { Container } from "@/components/layout/Container";
import type { PolicyDoc, PolicyBlock } from "@/data/policies";

type Grouped = PolicyBlock | { type: "ul"; items: string[] };

function group(blocks: PolicyBlock[]): Grouped[] {
  const out: Grouped[] = [];
  let list: { type: "ul"; items: string[] } | null = null;
  for (const b of blocks) {
    if (b.type === "li") {
      if (!list) { list = { type: "ul", items: [] }; out.push(list); }
      list.items.push(b.text);
    } else {
      list = null;
      out.push(b);
    }
  }
  return out;
}

export function PolicyArticle({ doc }: { doc: PolicyDoc }) {
  const headings = doc.blocks.filter((b) => b.type === "h" && b.id);
  const grouped = group(doc.blocks);

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* English legal content reads LTR even though the site shell is RTL. */}
        <article dir="ltr" className="mx-auto max-w-[860px] text-left">
          <Link href="/" className="text-body-sm text-brand-primary hover:underline">
            ← Back to home
          </Link>

          <header className="mt-6 border-b border-border pb-8">
            <h1 className="text-h1 text-text-primary">{doc.titleEn}</h1>
            <p className="mt-3 text-body text-text-secondary">{doc.subtitleEn}</p>

            <dl className="mt-6 space-y-1 text-body-sm text-text-muted">
              <div><span className="font-medium text-text-secondary">Effective date:</span> {doc.effective}</div>
              <div><span className="font-medium text-text-secondary">Business address:</span> {doc.address}</div>
              <div>
                <span className="font-medium text-text-secondary">Contact:</span>{" "}
                <a href={`mailto:${doc.contact}`} className="text-brand-primary hover:underline">{doc.contact}</a>
              </div>
            </dl>
          </header>

          {headings.length > 3 && (
            <nav aria-label="Contents" className="mt-8 rounded-lg border border-border p-5">
              <h2 className="text-label text-text-muted">Contents</h2>
              <ol className="mt-3 space-y-1.5">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-body-sm text-text-secondary hover:text-brand-primary">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-8 space-y-4 leading-relaxed text-text-secondary">
            {grouped.map((b, i) => {
              if (b.type === "h") {
                return (
                  <h2 key={i} id={b.id} className="scroll-mt-28 pt-4 text-h3 text-text-primary">
                    {b.text}
                  </h2>
                );
              }
              if (b.type === "ul") {
                return (
                  <ul key={i} className="list-disc space-y-2 ps-6 marker:text-brand-secondary">
                    {b.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                );
              }
              return <p key={i}>{b.text}</p>;
            })}
          </div>

          <div className="mt-12 border-t border-border pt-6 text-body-sm text-text-muted">
            <Link href="/" className="text-brand-primary hover:underline">← Back to home</Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
