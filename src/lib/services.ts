import { Network, Database, Code2, Headset, Cpu, ShieldCheck, Wrench } from "lucide-react";

export const services = [
  {
    title: "Networking", icon: Network, subtitle: "Secure connections. Reliable performance.",
    description: "We design, secure, and optimize your network infrastructure to ensure maximum uptime, minimal latency, and robust protection against modern security threats.",
    items: ["Network Auditing & Architecture", "Router & Switch Configuration", "Secure VPN Deployment", "Bandwidth Management", "Next-Gen Firewall & Security Management."],
    iconClass: "text-c2 bg-c2/15 border-c2/40", borderClass: "border-c2/40", accentClass: "text-c2",
  },
  {
    title: "Database", icon: Database, subtitle: "Scalable storage. Protected business data.",
    description: "We engineer robust, scalable, and highly secure data storage solutions tailored to keep your applications running fast and your business metrics completely safe.",
    items: ["Database Modeling & Design", "SQL/NoSQL Query Optimization", "Data Migration & Replication", "Automated Backup Systems", "Managed Solutions for PostgreSQL, MySQL, and MongoDB."],
    iconClass: "text-c3 bg-c3/15 border-c3/40", borderClass: "border-c3/40", accentClass: "text-c3",
  },
  {
    title: "Web Development", icon: Code2, subtitle: "Custom websites. Exceptional experiences.",
    description: "We build custom, high-performance web applications and websites designed to scale efficiently and deliver an exceptional user experience across all modern platforms.",
    items: ["Frontend Development (React, Vue, Tailwind CSS)", "Backend Systems (Node.js, Python)", "REST & GraphQL API Integration", "Secure Payment Gateway Implementation", "SEO & Performance Optimization."],
    iconClass: "text-c4 bg-c4/15 border-c4/40", borderClass: "border-c4/40", accentClass: "text-c4",
  },
  {
    title: "IT Support", icon: Headset, subtitle: "Reliable support. Less downtime.",
    description: "We provide reliable, fast, and proactive technical support to minimize your downtime and keep your day-to-day business operations running smoothly.",
    items: ["24/7 Remote Helpdesk", "On-site Technical Troubleshooting", "Software Installation & Updates", "User Account Management", "Regular System Maintenance & Health Checks."],
    iconClass: "text-c1 bg-c1/15 border-c1/40", borderClass: "border-c1/40", accentClass: "text-c1",
  },
  {
    title: "Software Engineering", icon: Cpu, subtitle: "Tailor-made software. Smarter workflows.",
    description: "We develop tailor-made enterprise software solutions, automation tools, and desktop applications designed to streamline your business workflows and solve complex technical challenges.",
    items: ["Custom Enterprise Software", "System Integration & APIs", "Automation & Scripting Solutions", "Desktop Application Development", "Legacy Software Modernization."],
    iconClass: "text-c5 bg-c5/15 border-c5/40", borderClass: "border-c5/40", accentClass: "text-c5",
  },
  {
    title: "Cybersecurity for Business", icon: ShieldCheck, subtitle: "Stronger defenses. Safer business.",
    description: "We protect your business assets, confidential employee data, and financial records from ransomware, phishing, and sophisticated cyber attacks.",
    items: ["Threat Detection & Monitoring", "Employee Security Awareness Training", "Vulnerability Assessments", "Data Encryption & Access Control", "Incident Response & Recovery."],
    iconClass: "text-c6 bg-c6/15 border-c6/40", borderClass: "border-c6/40", accentClass: "text-c6",
  },
  {
    title: "PC Repair", icon: Wrench, subtitle: "Expert repairs. Faster computers.",
    description: "We offer expert hardware diagnostics, physical repairs, and operating system optimizations to extend the lifespan of your computers and devices.",
    items: ["Hardware Diagnostics & Component Replacement (RAM, SSD, Screen)", "Virus & Malware Removal", "OS Reinstallation & Data Recovery", "Overheating Fixes & Physical Cleaning", "Slow PC Optimization."],
    iconClass: "text-c7 bg-c7/15 border-c7/40", borderClass: "border-c7/40", accentClass: "text-c7",
  }
];
