import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";
import InvoiceForm from "@/components/InvoiceForm";

export default function InvoiceDetails() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PageHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        {/* Invoice Form */}
        <InvoiceForm />
      </main>
      
      <PageFooter />
    </div>
  );
}
