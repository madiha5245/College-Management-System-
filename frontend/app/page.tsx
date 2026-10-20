const campusAreas = [
  {
    number: "01",
    title: "Students",
    description:
      "Keep student information organized and easy for authorized staff to find.",
    detail: "Student records",
  },
  {
    number: "02",
    title: "Courses",
    description:
      "Bring course details and enrollment information into one clear view.",
    detail: "Course catalogue",
  },
  {
    number: "03",
    title: "Faculty",
    description:
      "Connect faculty members with the courses they teach across campus.",
    detail: "Faculty directory",
  },
  {
    number: "04",
    title: "Attendance",
    description:
      "Make attendance records simpler to review for faculty and students.",
    detail: "Attendance records",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cms-background">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Campus CMS home">
            <span className="flex size-11 items-center justify-center rounded-xl bg-cms-navy text-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-6"
              >
                <path
                  d="M3 9.5 12 4l9 5.5M5.5 10.5v7m4.3-7v7m4.4-7v7m4.3-7v7M4 20h16M3 18.5h18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight text-cms-navy">
                Campus CMS
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                College management system
              </span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-8">
            <a
              href="#platform"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-cms-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cms-gold"
            >
              Overview
            </a>
            <a
              href="#modules"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-cms-navy focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cms-gold"
            >
              Campus areas
            </a>
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24"
      >
        <div id="platform" className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cms-navy">
            <span className="h-px w-8 bg-cms-gold" aria-hidden="true" />
            A clearer view of campus life
          </p>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight text-cms-navy sm:text-5xl lg:text-6xl">
            College Management System
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            A shared place to organize student records, courses, faculty, and
            attendance—designed to help your college work with clarity.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#modules"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-cms-navy px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cms-navy-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cms-gold"
            >
              Get Started
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="size-4"
              >
                <path
                  d="M4 10h12m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <span className="text-sm text-slate-500">
              Explore the areas in your campus workspace
            </span>
          </div>
          <div className="mt-10 flex items-center gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <span className="size-2 rounded-full bg-cms-gold" aria-hidden="true" />
            Built for the people who keep a campus moving
          </div>
        </div>

        <div
          aria-label="Illustrative Campus CMS workspace preview"
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-2xl border border-cms-gold/30 sm:block" aria-hidden="true" />
          <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_24px_70px_-36px_rgba(23,54,93,0.38)] sm:p-5">
            <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-cms-navy text-xs font-bold text-white">
                  C
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Campus CMS</p>
                  <p className="text-[10px] text-slate-500">Workspace preview</p>
                </div>
              </div>
              <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-medium text-slate-500">
                Preview
              </span>
            </div>

            <div className="grid gap-4 py-5 sm:grid-cols-[132px_1fr] sm:py-6">
              <aside className="hidden rounded-xl bg-cms-background p-3 sm:block">
                <p className="px-2 pb-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Workspace
                </p>
                <div className="space-y-1.5">
                  {campusAreas.map((area, index) => (
                    <div
                      key={area.number}
                      className={`flex items-center gap-2 rounded-md px-2 py-2 text-[10px] ${
                        index === 0
                          ? "bg-white font-semibold text-cms-navy shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          index === 0 ? "bg-cms-gold" : "bg-slate-300"
                        }`}
                        aria-hidden="true"
                      />
                      {area.title}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="min-w-0 px-1 sm:px-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                      Campus overview
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-cms-navy">
                      Your campus, organized.
                    </p>
                  </div>
                  <span className="mt-1 size-8 shrink-0 rounded-full bg-cms-background" aria-hidden="true" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {campusAreas.map((area) => (
                    <div
                      key={area.number}
                      className="rounded-xl border border-slate-100 bg-white p-3 sm:p-3.5"
                    >
                      <p className="text-[9px] font-medium text-slate-400">{area.detail}</p>
                      <p className="mt-1.5 text-sm font-semibold text-slate-800">{area.title}</p>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cms-background" aria-hidden="true">
                        <div
                          className={`h-full rounded-full bg-cms-navy ${
                            area.number === "01"
                              ? "w-4/5"
                              : area.number === "02"
                                ? "w-3/5"
                                : area.number === "03"
                                  ? "w-2/3"
                                  : "w-1/2"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between rounded-xl bg-cms-background px-3.5 py-3">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-700">One connected workspace</p>
                    <p className="mt-0.5 text-[9px] text-slate-500">People, learning, and daily records</p>
                  </div>
                  <span className="text-xs font-semibold text-cms-gold" aria-hidden="true">●</span>
                </div>
              </div>
            </div>
            <p className="border-t border-slate-100 px-2 pt-3 text-[9px] text-slate-400">
              Illustrative preview · Sample interface only
            </p>
          </div>
        </div>
      </section>

      <section id="modules" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cms-gold">
                One campus, four essential areas
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-cms-navy sm:text-3xl">
                Everything in its place
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Clear, connected information helps students, faculty, and
              administrators stay on the same page.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {campusAreas.map((area) => (
              <article
                key={area.number}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-cms-gold/60 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-cms-background text-sm font-semibold text-cms-navy">
                    {area.number}
                  </span>
                  <span className="h-px w-8 bg-cms-gold" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-cms-navy">{area.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-cms-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p className="font-medium text-white">Campus CMS</p>
          <p>Organizing the everyday work of higher education.</p>
        </div>
      </footer>
    </main>
  );
}
