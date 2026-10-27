import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | WOOD-JAY TECH" },
      { name: "description", content: "Review service requests and track follow-ups." },
      { property: "og:title", content: "Admin Dashboard | WOOD-JAY TECH" },
      { property: "og:description", content: "Review service requests and track follow-ups." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const STATUSES = [
  { v: "new", l: "New" },
  { v: "contacted", l: "Contacted" },
  { v: "in_progress", l: "In progress" },
  { v: "completed", l: "Completed" },
  { v: "closed", l: "Closed" },
] as const;

type Req = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_needed: string;
  message: string;
  created_at: string;
  status: string;
  follow_up_date: string | null;
  notes: string | null;
};

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Req[]>([]);
  const [filter, setFilter] = useState("all");

  async function load() {
    const { data } = await supabase.from("service_requests").select("*").order("created_at", { ascending: false });
    setRows((data as Req[]) ?? []);
  }

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
      setIsAdmin(!!data);
      if (data) load();
    })();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const due = rows.filter((r) => r.follow_up_date && r.follow_up_date <= today && !["completed", "closed"].includes(r.status));
  const shown = useMemo(
    () => (filter === "all" ? rows : filter === "due" ? due : rows.filter((r) => r.status === filter)),
    [rows, filter, due],
  );

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) return <div className="p-10 text-muted-foreground">Loading…</div>;
  if (!isAdmin)
    return (
      <div className="p-10 text-foreground">
        <p>This account doesn't have admin access.</p>
        <Button className="mt-4" onClick={signOut}>Sign out</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Service Requests</h1>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total" value={rows.length} />
          <Stat label="New" value={rows.filter((r) => r.status === "new").length} />
          <Stat label="In progress" value={rows.filter((r) => r.status === "in_progress").length} />
          <Stat label="Follow-ups due" value={due.length} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[{ v: "all", l: "All" }, { v: "due", l: "Follow-ups due" }, ...STATUSES].map((s) => (
            <Button key={s.v} size="sm" variant={filter === s.v ? "default" : "outline"} onClick={() => setFilter(s.v)}>
              {s.l}
            </Button>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          {shown.length === 0 && <p className="text-muted-foreground">No requests here.</p>}
          {shown.map((r) => (
            <RequestCard key={r.id} r={r} onSaved={load} today={today} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function RequestCard({ r, onSaved, today }: { r: Req; onSaved: () => void; today: string }) {
  const [status, setStatus] = useState(r.status);
  const [date, setDate] = useState(r.follow_up_date ?? "");
  const [notes, setNotes] = useState(r.notes ?? "");
  const [saving, setSaving] = useState(false);
  const overdue = r.follow_up_date && r.follow_up_date <= today && !["completed", "closed"].includes(r.status);

  async function save() {
    setSaving(true);
    await supabase
      .from("service_requests")
      .update({ status, follow_up_date: date || null, notes: notes || null, updated_at: new Date().toISOString() })
      .eq("id", r.id);
    setSaving(false);
    onSaved();
  }

  return (
    <div className={`rounded-2xl border bg-card p-5 ${overdue ? "border-destructive" : "border-border"}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-lg font-semibold">{r.name}</div>
          <div className="text-sm text-muted-foreground">
            <a href={`mailto:${r.email}`} className="underline">{r.email}</a>
            {r.phone && <> · <a href={`tel:${r.phone}`} className="underline">{r.phone}</a></>}
          </div>
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <div className="font-medium text-primary">{r.service_needed}</div>
          <div>{new Date(r.created_at).toLocaleString()}</div>
        </div>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm">{r.message}</p>
      {overdue && <p className="mt-2 text-sm font-medium text-destructive">Follow-up due</p>}
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_2fr_auto] sm:items-end">
        <label className="text-sm">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-2">
            {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.l}</option>)}
          </select>
        </label>
        <label className="text-sm">
          Follow-up date
          <Input type="date" className="mt-1" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="text-sm">
          Notes
          <Textarea className="mt-1 min-h-9" rows={1} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
      </div>
    </div>
  );
}
