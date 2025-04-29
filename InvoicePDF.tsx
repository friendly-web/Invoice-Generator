import { PDFViewer, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { InvoiceFormValues, InvoiceItem } from '@shared/schema';
import { getFormattedCurrency } from '@/lib/utils';
import { PAYMENT_METHODS } from '@/lib/constants';

// Create styles
const styles = StyleSheet.create({
  paymentSection: {
    marginTop: 30,
    marginBottom: 30,
    borderTop: '1px solid #eee',
    paddingTop: 10,
  },
  paymentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentMethod: {
    fontSize: 10,
    marginBottom: 5,
  },
  bankDetails: {
    fontSize: 10,
    whiteSpace: 'pre-wrap',
    marginTop: 5,
  },
  page: {
    padding: 30,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  logo: {
    width: 100,
    height: 50,
    objectFit: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  invoiceNumber: {
    fontSize: 12,
    color: '#666',
  },
  infoSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoColumn: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
  },
  table: {
    flexDirection: 'column',
    marginTop: 20,
    borderColor: '#EEE',
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    backgroundColor: '#F9FAFB',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  tableCol: {
    padding: 10,
  },
  tableCell: {
    fontSize: 10,
  },
  descriptionCol: {
    width: '40%',
  },
  quantityCol: {
    width: '15%',
  },
  rateCol: {
    width: '15%',
  },
  discountCol: {
    width: '15%',
  },
  amountCol: {
    width: '15%',
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#999',
  },
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalsTable: {
    width: '40%',
  },
  totalsRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  totalsLabel: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 10,
  },
  totalsValue: {
    width: '50%',
    textAlign: 'right',
    fontSize: 10,
  },
  totalsDivider: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  grandTotalLabel: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  grandTotalValue: {
    width: '50%',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

interface InvoicePDFProps {
  invoice: InvoiceFormValues & { 
    items?: InvoiceItem[];
    totalAmount?: number;
    subtotal?: number;
    discountTotal?: number;
    tax?: number;
    shipping?: number;
  };
  logoDataUrl?: string | null;
}

export default function InvoicePDF({ invoice, logoDataUrl }: InvoicePDFProps) {
  // Format payment terms for display
  const getFormattedPaymentTerms = () => {
    if (invoice.paymentTerms === "receipt") {
      return "Due on receipt";
    }
    return invoice.paymentTerms.toUpperCase();
  };

  // Calculate subtotal if not provided
  const subtotal = invoice.subtotal || invoice.items?.reduce((acc, item) => acc + item.amount, 0) || 0;
  
  // Calculate discount amount
  const discountAmount = invoice.discountTotal ? (subtotal * (invoice.discountTotal / 100)) : 0;
  
  // Calculate amounts after discount
  const totalAfterDiscount = subtotal - discountAmount;
  
  // Calculate tax amount
  const taxAmount = invoice.tax ? (totalAfterDiscount * (invoice.tax / 100)) : 0;
  
  // Calculate shipping
  const shippingAmount = invoice.shipping || 0;
  
  // Grand total
  const grandTotal = invoice.totalAmount || (totalAfterDiscount + taxAmount + shippingAmount);
  
  return (
    <PDFViewer style={{ width: '100%', height: '80vh' }}>
      <Document title={`Invoice ${invoice.invoiceNumber}`}>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>INVOICE</Text>
              <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
            </View>
            
            {logoDataUrl && (
              <Image src={logoDataUrl} style={styles.logo} />
            )}
          </View>
          
          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Issue Date:</Text>
                <Text style={styles.infoValue}>{invoice.issueDate}</Text>
              </View>
              
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Due Date:</Text>
                <Text style={styles.infoValue}>{invoice.dueDate}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Payment Terms:</Text>
                <Text style={styles.infoValue}>{getFormattedPaymentTerms()}</Text>
              </View>
              
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Currency:</Text>
                <Text style={styles.infoValue}>
                  {invoice.currency} ({getFormattedCurrency(invoice.currency)})
                </Text>
              </View>
            </View>
          </View>
          
          {/* Items Table */}
          {invoice.items && invoice.items.length > 0 ? (
            <>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <View style={[styles.tableCol, styles.descriptionCol]}>
                    <Text style={styles.tableCellHeader}>Description</Text>
                  </View>
                  <View style={[styles.tableCol, styles.quantityCol]}>
                    <Text style={styles.tableCellHeader}>Qty</Text>
                  </View>
                  <View style={[styles.tableCol, styles.rateCol]}>
                    <Text style={styles.tableCellHeader}>Rate</Text>
                  </View>
                  <View style={[styles.tableCol, styles.discountCol]}>
                    <Text style={styles.tableCellHeader}>Discount</Text>
                  </View>
                  <View style={[styles.tableCol, styles.amountCol]}>
                    <Text style={styles.tableCellHeader}>Amount</Text>
                  </View>
                </View>
                
                {invoice.items.map((item, index) => (
                  <View key={item.id} style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.descriptionCol]}>
                      <Text style={styles.tableCell}>{item.description}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.quantityCol]}>
                      <Text style={styles.tableCell}>{item.quantity}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.rateCol]}>
                      <Text style={styles.tableCell}>
                        {getFormattedCurrency(invoice.currency)}{item.rate.toFixed(2)}
                      </Text>
                    </View>
                    <View style={[styles.tableCol, styles.discountCol]}>
                      <Text style={styles.tableCell}>
                        {item.discount}%
                      </Text>
                    </View>
                    <View style={[styles.tableCol, styles.amountCol]}>
                      <Text style={styles.tableCell}>
                        {getFormattedCurrency(invoice.currency)}{item.amount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              
              {/* Totals Section */}
              <View style={styles.totalsSection}>
                <View style={styles.totalsTable}>
                  {/* Subtotal */}
                  <View style={styles.totalsRow}>
                    <Text style={styles.totalsLabel}>Subtotal:</Text>
                    <Text style={styles.totalsValue}>
                      {getFormattedCurrency(invoice.currency)}{subtotal.toFixed(2)}
                    </Text>
                  </View>
                  
                  {/* Discount */}
                  {invoice.discountTotal > 0 && (
                    <View style={styles.totalsRow}>
                      <Text style={styles.totalsLabel}>Discount ({invoice.discountTotal}%):</Text>
                      <Text style={styles.totalsValue}>
                        -{getFormattedCurrency(invoice.currency)}{discountAmount.toFixed(2)}
                      </Text>
                    </View>
                  )}
                  
                  {/* Tax */}
                  {invoice.tax > 0 && (
                    <View style={styles.totalsRow}>
                      <Text style={styles.totalsLabel}>Tax ({invoice.tax}%):</Text>
                      <Text style={styles.totalsValue}>
                        {getFormattedCurrency(invoice.currency)}{taxAmount.toFixed(2)}
                      </Text>
                    </View>
                  )}
                  
                  {/* Shipping */}
                  {invoice.shipping > 0 && (
                    <View style={styles.totalsRow}>
                      <Text style={styles.totalsLabel}>Shipping:</Text>
                      <Text style={styles.totalsValue}>
                        {getFormattedCurrency(invoice.currency)}{shippingAmount.toFixed(2)}
                      </Text>
                    </View>
                  )}
                  
                  {/* Grand Total */}
                  <View style={[styles.totalsRow, styles.totalsDivider]}>
                    <Text style={styles.grandTotalLabel}>Total Amount:</Text>
                    <Text style={styles.grandTotalValue}>
                      {getFormattedCurrency(invoice.currency)}{grandTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>
                No items have been added to this invoice.
              </Text>
            </View>
          )}
          
          {/* Payment Section */}
          {invoice.paymentMethod && (
            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>How does this invoice get paid?</Text>
              
              <Text style={styles.paymentMethod}>
                Payment Method: {PAYMENT_METHODS.find(m => m.value === invoice.paymentMethod)?.label || invoice.paymentMethod}
              </Text>
              
              {invoice.paymentMethod === 'bank_transfer' && invoice.bankDetails && (
                <>
                  <Text style={styles.paymentMethod}>Bank Details:</Text>
                  <Text style={styles.bankDetails}>{invoice.bankDetails}</Text>
                </>
              )}
            </View>
          )}
          
          {/* Footer */}
          <Text style={styles.footer}>
            This invoice was created with Invoice Creator.
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}
