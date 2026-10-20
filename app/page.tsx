"use client"

import { useState } from "react"

type IconName = "grid" | "users" | "faculty" | "book" | "enroll" | "calendar" | "search" | "bell" | "chevron" | "plus" | "arrow" | "clock" | "check" | "menu"

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    faculty: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /><path d="M19 8h3M20.5 6.5v3" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H21" /><path d="M6.5 2H21v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    enroll: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  }
  return <svg {...common} aria-hidden="true">{paths[name]}</svg>
}

const nav = [
  ["Overview", "grid"], ["Students", "users"], ["Faculty", "faculty"], ["Courses", "book"], ["Enrollments", "enroll"], ["Attendance", "calendar"],
] as const

const courses = [
  { code: "CS-401", title: "Advanced Database Systems", faculty: "Dr. Maya Patel", students: "42 / 45", status: "Active", updated: "Today, 9:42 AM" },
  { code: "BA-215", title: "Organizational Behavior", faculty: "Prof. Daniel Kim", students: "38 / 40", status: "Active", updated: "Yesterday" },
  { code: "MA-108", title: "Applied Statistics", faculty: "Dr. Lena Ortiz", students: "56 / 60", status: "Active", updated: "Oct 18, 2026" },
  { code: "EN-302", title: "Modern World Literature", faculty: "Prof. Anika Shah", students: "29 / 35", status: "Draft", updated: "Oct 16, 2026" },
]

export default function Dashboard() {
  const [active, setActive] = useState("Overview")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark">N</div><div><div className="brand-name">Northbridge</div><div className="brand-sub">College Administration</div></div></div>
        <div className="nav-label">MAIN MENU</div>
        <nav className="nav-list" aria-label="Main navigation">
          {nav.map(([label, icon]) => <button key={label} onClick={() => { setActive(label); setMobileNav(false) }} className={`nav-item ${active === label ? "active" : ""}`}><Icon name={icon} /><span>{label}</span>{label === "Enrollments" && <span className="nav-count">12</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="term-card"><div className="term-top"><span>Current term</span><span className="live-dot" /></div><strong>Fall 2026</strong><span>Sep 1 – Dec 18, 2026</span></div><button className="help-link">Need help? <span>Contact support</span></button></div>
      </aside>
      {mobileNav && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Icon name="menu" /></button><div className="breadcrumbs"><span>Administration</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><div className="search"><Icon name="search" size={17} /><input aria-label="Search" placeholder="Search anything..." /></div><button className="icon-button" aria-label="Notifications"><Icon name="bell" size={19} /><span className="notification-dot" /></button><div className="profile-wrap"><button className="profile" onClick={() => setMenuOpen(!menuOpen)}><span className="avatar">AR</span><span className="profile-copy"><strong>Alex Rivera</strong><small>Administrator</small></span><Icon name="chevron" size={15} /></button>{menuOpen && <div className="profile-menu"><button>View profile</button><button>Account settings</button><button>Sign out</button></div>}</div></div></header>
        <div className="content-wrap">
          <section className="page-intro"><div><p className="eyebrow">MONDAY, OCTOBER 20, 2026</p><h1>Good morning, Alex</h1><p className="intro-copy">Here&apos;s what&apos;s happening across Northbridge College today.</p></div><button className="outline-button"><Icon name="calendar" size={16} /> Academic calendar</button></section>
          <section className="stats-grid" aria-label="Academic summary">
            <StatCard label="Total Students" value="2,846" change="8.2%" note="vs. last term" icon="users" tone="blue" />
            <StatCard label="Faculty Members" value="184" change="3.1%" note="vs. last term" icon="faculty" tone="gold" />
            <StatCard label="Active Courses" value="126" change="12 new" note="this semester" icon="book" tone="purple" />
            <StatCard label="Pending Enrollments" value="38" change="12 urgent" note="need review" icon="enroll" tone="orange" alert />
          </section>
          <div className="dashboard-grid"><section className="panel courses-panel"><div className="panel-header"><div><h2>Recent courses</h2><p>Course activity across the current term</p></div><button className="text-button">View all <Icon name="arrow" size={15} /></button></div><div className="table-wrap"><table><thead><tr><th>COURSE</th><th>FACULTY</th><th>ENROLLMENT</th><th>STATUS</th><th>LAST UPDATED</th><th></th></tr></thead><tbody>{courses.map(course => <tr key={course.code}><td><div className="course-cell"><span className="course-code">{course.code}</span><strong>{course.title}</strong></div></td><td><div className="faculty-cell"><span className="mini-avatar">{course.faculty.split(" ").map(x => x[0]).join("").slice(0,2)}</span>{course.faculty}</div></td><td><div className="enrollment-cell"><span>{course.students}</span><div className="progress"><span style={{ width: `${Number(course.students.split("/")[0]) / Number(course.students.split("/")[1]) * 100}%` }} /></div></div></td><td><span className={`status ${course.status.toLowerCase()}`}><span />{course.status}</span></td><td className="updated">{course.updated}</td><td><button className="row-menu" aria-label={`More options for ${course.code}`}>•••</button></td></tr>)}</tbody></table></div></section><aside className="panel quick-panel"><div className="panel-header"><div><h2>Quick actions</h2><p>Common administration tasks</p></div></div><div className="action-list"><Action icon="book" label="Add a new course" detail="Create course details and schedule" /><Action icon="enroll" label="Enroll a student" detail="Add a student to a course" /><Action icon="calendar" label="Mark attendance" detail="Record today&apos;s attendance" /><Action icon="faculty" label="Manage faculty" detail="View faculty directory" /></div><div className="activity"><div className="activity-title"><span>Recent activity</span><button>See all</button></div><div className="activity-item"><span className="activity-icon"><Icon name="check" size={14} /></span><div><strong>Enrollment approved</strong><p>Jordan Lee · CS-401</p></div><small>12m</small></div><div className="activity-item"><span className="activity-icon gold"><Icon name="plus" size={14} /></span><div><strong>New course created</strong><p>Modern World Literature</p></div><small>2h</small></div></div></aside></div>
          <div className="state-examples"><span className="state-label">DESIGN STATES</span><span className="state-pill"><span className="state-dot loading" /> Loading data</span><span className="state-pill"><span className="state-dot empty" /> Empty state</span><span className="state-pill"><span className="state-dot error" /> Error recovery</span><span className="mock-note">Sample data shown for preview only</span></div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, change, note, icon, tone, alert = false }: { label: string; value: string; change: string; note: string; icon: IconName; tone: string; alert?: boolean }) { return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon name={icon} size={19} /></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className={`stat-change ${alert ? "alert-change" : ""}`}><span>{change}</span> {note}</div></article> }
function Action({ icon, label, detail }: { icon: IconName; label: string; detail: string }) { return <button className="action-item"><span className="action-icon"><Icon name={icon} size={18} /></span><span className="action-copy"><strong>{label}</strong><small>{detail}</small></span><Icon name="arrow" size={16} /></button> }
