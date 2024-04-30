import DashboardLayout from "@/components/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
