function generateInvoice() {
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const companyName = document.getElementById('companyName').value;
    const clientName = document.getElementById('clientName').value;
    const totalAmount = document.getElementById('totalAmount').value;
    const currency = document.getElementById('currency').value;

    if (!invoiceNumber || !invoiceDate || !companyName || !clientName || !totalAmount) {
        alert('Please fill in all the fields');
        return;
    }

    // Create the invoice content
    const invoiceContent = `
        <h3>Invoice: ${invoiceNumber}</h3>
        <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Total Amount:</strong> ${currency} ${totalAmount}</p>
    `;

    document.getElementById('invoiceContent').innerHTML = invoiceContent;

    // Show the invoice display area
    document.getElementById('invoiceDisplay').style.display = 'block';
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    const blob = new Blob([invoiceContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoice.html';
    link.click();
});

document.getElementById('shareBtn').addEventListener('click', function() {
    const invoiceContent = document.getElementById('invoiceContent').innerHTML;
    const shareData = {
        title: 'Invoice',
        text: 'Here is your invoice',
        url: 'data:text/html,' + encodeURIComponent(invoiceContent)
    };
    navigator.share(shareData).catch(console.error);
});
