interface LegalContent {
  title: string;
  updated: string;
  intro: string;
  sections: ReadonlyArray<{ title: string; body: string }>;
}

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
      <p className="mt-2 text-sm text-neutral-400">{content.updated}</p>
      <p className="mt-6 text-lg text-neutral-600">{content.intro}</p>

      <div className="mt-10 space-y-8">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-neutral-900">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-neutral-600">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
