import { AppShell } from "@/components/learning/AppShell";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
