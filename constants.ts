// Constants for drop-down selection options and other app-wide constants

export const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer", icon: "bank" },
  { value: "paypal", label: "PayPal", icon: "paypal" },
  { value: "upi", label: "UPI", icon: "money" },
  { value: "payment_link", label: "Payment Link", icon: "link" },
  { value: "cash", label: "Cash", icon: "cash" },
];

export const PAYMENT_TERMS = [
  { value: "receipt", label: "Due on receipt" },
  { value: "net7", label: "NET 7" },
  { value: "net15", label: "NET 15" },
  { value: "net30", label: "NET 30" },
  { value: "net45", label: "NET 45" },
  { value: "net60", label: "NET 60" }
];

export const CURRENCIES = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "INR", label: "INR - Indian Rupee" }
];

export const INVOICE_STEPS = [
  { id: 1, name: "Details", path: "/invoice/details" },
  { id: 2, name: "Items", path: "/invoice/items" },
  { id: 3, name: "Review", path: "/invoice/review" }
];

export const INVOICE_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  PAID: "paid",
  OVERDUE: "overdue"
};

export const DEFAULT_INVOICE = {
  invoiceNumber: "INV-001",
  paymentTerms: "net30",
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: "",
  currency: "USD",
  logoUrl: "",
  status: INVOICE_STATUS.DRAFT,
  totalAmount: 0,
  items: [],
  businessDetails: "",
  clientDetails: "",
  paymentMethod: "bank_transfer",
  bankDetails: "",
  subtotal: 0,
  discountTotal: 0,
  tax: 0,
  shipping: 0
};
