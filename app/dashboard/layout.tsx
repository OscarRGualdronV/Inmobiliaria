import { getCurrentVendedor } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const vendedor = await getCurrentVendedor();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar vendedor={vendedor} />
      <main className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
