"use client";

import { useMemo, useState } from "react";

type IconName =
  | "grid"
  | "users"
  | "faculty"
  | "book"
  | "enrollment"
  | "calendar"
  | "logout"
  | "search"
  | "bell"
  | "chevron"
  | "arrow"
  | "plus";

const navItems: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Students", icon: "users" },
  { label: "Faculty", icon: "faculty" },
  { label: "Courses", icon: "book" },
  { label: "Enrollments", icon: "enrollment" },
  { label: "Attendance", icon: "calendar" },
];

const courses = [
  { name: "Introduction to Computer Science", code: "CS 101", faculty: "Dr. Sarah Wilson", status: "Active" },
  { name: "Business Analytics", code: "BA 204", faculty: "Prof. James Carter", status: "Active" },
  { name: "Modern World History", code: "HIS 110", faculty: "Dr. Emily Rodriguez", status: "Review" },
  { name: "Calculus II", code: "MAT 202", faculty: "Prof. Michael Chen", status: "Active" },
];

const stats = [
  { label: "Total students", value: "1,248", change: "+12.5%", icon: "users" as IconName, tone: "navy" },
  { label: "Total faculty", value: "86", change: "+4.8%", icon: "faculty" as IconName, tone: "gold" },
  { label: "Total courses", value: "142", change: "+8.2%", icon: "book" as IconName, tone: "blue" },
  { label: "Enrollments", value: "3,642", change: "+16.4%", icon: "enrollment" as IconName, tone: "slate" },
];

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" {...common} /><rect x="14" y="4" width="6" height="6" rx="1" {...common} /><rect x="4" y="14" width="6" height="6" rx="1" {...common} /><rect x="14" y="14" width="6" height="6" rx="1" {...common} /></>,
    users: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" {...common} /><circle cx="10" cy="8" r="3.5" {...common} /><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" {...common} /></>,
    faculty: <><circle cx="12" cy="8" r="3" {...common} /><path d="M5 20c.5-3.2 2.8-5 7-5s6.5 1.8 7 5M16.5 5.8a3 3 0 0 1 0 4.4" {...common} /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" {...common} /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" {...common} /></>,
    enrollment: <><path d="M4 6h11M4 12h8M4 18h6" {...common} /><path d="m16 14 2 2 4-4" {...common} /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" {...common} /><path d="M16 3v4M8 3v4M3 10h18" {...common} /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5" {...common} /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" {...common} /><path d="m16 16 4.5 4.5" {...common} /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" {...common} /></>,
    chevron: <path d="m7 10 5 5 5-5" {...common} />,
    arrow: <path d="M5 12h13m-5-5 5 5-5 5" {...common} />,
    plus: <><path d="M12 5v14M5 12h14" {...common} /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>{paths[name]}</svg>;
}

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const filteredCourses = useMemo(() => courses.filter((course) => Object.values(course).some((value) => value.toLowerCase().includes(query.toLowerCase()))), [query]);

  return (
    <main className="min-h-screen bg-[#f5f7fa] text-[#243447]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[252px] flex-col bg-[#102a43] text-white lg:flex">
        <div className="flex h-[88px] items-center gap-3 border-b border-white/10 px-7">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#c99a2e] text-[#102a43]"><span className="text-lg font-bold">C</span></div>
          <div><p className="text-[15px] font-semibold tracking-tight">Campus CMS</p><p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white/50">Admin portal</p></div>
        </div>
        <div className="flex flex-1 flex-col px-4 py-7">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Main menu</p>
          <nav className="mt-4 flex flex-col gap-1" aria-label="Admin navigation">
            {navItems.map((item) => <button key={item.label} onClick={() => setActive(item.label)} className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99a2e] ${active === item.label ? "bg-[#c99a2e] text-[#102a43]" : "text-white/65 hover:bg-white/10 hover:text-white"}`}><Icon name={item.icon} className="size-[18px]" />{item.label}</button>)}
          </nav>
          <div className="mt-auto border-t border-white/10 pt-4"><button className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-[13px] font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"><Icon name="logout" className="size-[18px]" />Logout</button></div>
        </div>
      </aside>

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-10 flex min-h-[88px] items-center justify-between gap-5 border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8 lg:px-10">
          <div><p className="text-xs font-medium text-slate-400">Admin portal / Overview</p><h1 className="mt-1 text-xl font-semibold tracking-tight text-[#102a43]">Dashboard overview</h1></div>
          <div className="flex items-center gap-3 sm:gap-5"><label className="relative hidden md:block"><span className="sr-only">Search courses</span><Icon name="search" className="absolute left-3 top-1/2 size-[17px] -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses..." className="h-10 w-52 rounded-lg border border-slate-200 bg-[#f8fafc] pl-10 pr-3 text-sm outline-none transition focus:border-[#c99a2e] focus:ring-2 focus:ring-[#c99a2e]/15" /></label><button aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#c99a2e]"><Icon name="bell" className="size-[19px]" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#c99a2e]" /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><button className="flex items-center gap-2 rounded-lg p-1.5 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#c99a2e]"><span className="flex size-9 items-center justify-center rounded-full bg-[#dce7f2] text-xs font-semibold text-[#102a43]">AW</span><span className="hidden sm:block"><span className="block text-xs font-semibold text-[#243447]">Alex Williams</span><span className="block text-[11px] text-slate-400">Administrator</span></span><Icon name="chevron" className="hidden size-4 text-slate-400 sm:block" /></button></div>
        </header>

        <section className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Monday, October 20, 2026</p><h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-[28px]">Good morning, Alex</h2><p className="mt-2 text-sm text-slate-500">Here&apos;s what&apos;s happening across your campus today.</p></div><button className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-[#102a43] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173d60] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99a2e]"><Icon name="plus" className="size-4" />Add new record</button></div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat) => <article key={stat.label} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(16,42,67,0.03)]"><div className="flex items-start justify-between"><div><p className="text-[13px] font-medium text-slate-500">{stat.label}</p><p className="mt-2 text-[27px] font-semibold tracking-tight text-[#102a43]">{stat.value}</p></div><span className={`flex size-10 items-center justify-center rounded-lg ${stat.tone === "gold" ? "bg-[#fbf5e7] text-[#a77c18]" : stat.tone === "blue" ? "bg-[#eaf2f9] text-[#2d628d]" : stat.tone === "slate" ? "bg-[#eef1f4] text-[#5d7185]" : "bg-[#e7eef6] text-[#17466e]"}`}><Icon name={stat.icon} className="size-[19px]" /></span></div><p className="mt-4 text-xs text-slate-400"><span className="font-semibold text-emerald-600">{stat.change}</span> <span>from last month</span></p></article>)}</div>

          <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_330px]">
            <section className="rounded-xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(16,42,67,0.03)]"><div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><h3 className="text-base font-semibold text-[#102a43]">Recent courses</h3><p className="mt-1 text-xs text-slate-400">Keep track of your latest course activity</p></div><button className="flex items-center gap-2 self-start text-xs font-semibold text-[#a77c18] hover:text-[#7d5b0f]">View all courses <Icon name="arrow" className="size-3.5" /></button></div><div className="overflow-x-auto"><table className="w-full min-w-[660px] text-left"><thead><tr className="border-b border-slate-100 text-[11px] uppercase tracking-[0.1em] text-slate-400"><th className="px-5 py-3.5 font-semibold sm:px-6">Course name</th><th className="px-4 py-3.5 font-semibold">Code</th><th className="px-4 py-3.5 font-semibold">Faculty</th><th className="px-4 py-3.5 font-semibold">Status</th><th className="px-4 py-3.5" /></tr></thead><tbody>{filteredCourses.map((course) => <tr key={course.code} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"><td className="px-5 py-4 sm:px-6"><p className="text-sm font-semibold text-[#243447]">{course.name}</p><p className="mt-0.5 text-xs text-slate-400">Updated recently</p></td><td className="px-4 py-4 text-xs font-medium text-slate-500">{course.code}</td><td className="px-4 py-4 text-xs text-slate-600">{course.faculty}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${course.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{course.status}</span></td><td className="px-4 py-4 text-right text-slate-400">•••</td></tr>)}</tbody></table>{filteredCourses.length === 0 && <p className="px-6 py-10 text-center text-sm text-slate-500">No courses match your search.</p>}</div></section>
            <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(16,42,67,0.03)] sm:p-6"><h3 className="text-base font-semibold text-[#102a43]">Quick actions</h3><p className="mt-1 text-xs text-slate-400">Common administrative tasks</p><div className="mt-5 flex flex-col gap-2.5">{[{ label: "Add new student", icon: "users" as IconName }, { label: "Add faculty member", icon: "faculty" as IconName }, { label: "Create a course", icon: "book" as IconName }].map((action) => <button key={action.label} className="group flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 px-3.5 text-left text-sm font-medium text-[#243447] transition hover:border-[#c99a2e]/60 hover:bg-[#fffdf7] focus-visible:outline-2 focus-visible:outline-[#c99a2e]"><span className="flex size-8 items-center justify-center rounded-md bg-[#f1f5f9] text-[#2d628d] group-hover:bg-[#fbf5e7] group-hover:text-[#a77c18]"><Icon name={action.icon} className="size-4" /></span>{action.label}<Icon name="arrow" className="ml-auto size-4 text-slate-300 transition group-hover:text-[#a77c18]" /></button>)}</div><div className="mt-6 rounded-lg bg-[#f6f8fb] p-4"><p className="text-xs font-semibold text-[#102a43]">Need a hand?</p><p className="mt-1 text-xs leading-5 text-slate-500">Visit the help center for guides and support.</p><button className="mt-3 text-xs font-semibold text-[#a77c18] hover:underline">Open help center</button></div></section>
          </div>
        </section>
      </div>
    </main>
  );
}
