import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceFormSchema, InvoiceFormValues } from "@shared/schema";
import { calculateDueDate, formatDate } from "@/lib/utils";
import { DEFAULT_INVOICE } from "@/lib/constants";
import { uploadLogo } from "@/lib/invoice";
import { useToast } from "@/hooks/use-toast";

export function useInvoiceForm() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize the form with default values
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      ...DEFAULT_INVOICE,
      dueDate: calculateDueDate(DEFAULT_INVOICE.issueDate, DEFAULT_INVOICE.paymentTerms)
    }
  });

  // Watch for changes to payment terms and issue date to auto-calculate due date
  const watchPaymentTerms = form.watch("paymentTerms");
  const watchIssueDate = form.watch("issueDate");

  useEffect(() => {
    if (watchIssueDate && watchPaymentTerms) {
      const dueDate = calculateDueDate(watchIssueDate, watchPaymentTerms);
      form.setValue("dueDate", dueDate, { shouldValidate: true });
    }
  }, [watchPaymentTerms, watchIssueDate, form]);

  // Handle logo upload
  const handleLogoChange = async (file: File | null) => {
    if (!file) {
      setLogoFile(null);
      setLogoPreview(null);
      form.setValue("logoUrl", "", { shouldValidate: true });
      return;
    }

    // Validate file size
    if (file.size > 1024 * 1024) { // 1MB
      toast({
        title: "Error",
        description: "Logo file size must be less than 1MB",
        variant: "destructive"
      });
      return;
    }

    // Preview the logo
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setLogoPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    setLogoFile(file);
  };

  // Handle form submission
  const onSubmit = async (data: InvoiceFormValues) => {
    try {
      setIsSubmitting(true);

      // Upload logo if selected
      if (logoFile) {
        const logoUrl = await uploadLogo(logoFile);
        data.logoUrl = logoUrl;
      }

      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the invoice. Please try again.",
        variant: "destructive"
      });
      console.error("Error submitting form:", error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    logoFile,
    logoPreview,
    isSubmitting,
    handleLogoChange,
    onSubmit
  };
}
