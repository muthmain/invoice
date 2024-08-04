document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('invoice-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        const invoiceNumber = document.getElementById('invoice_number').value;
        const invoiceDate = document.getElementById('invoice_date').value;
        const customerName = document.getElementById('customer_name').value;

        const items = [
            {
                description: document.getElementById('item1_description').value,
                quantity: parseFloat(document.getElementById('item1_quantity').value),
                unitPrice: parseFloat(document.getElementById('item1_unit_price').value),
            },
            {
                description: document.getElementById('item2_description').value,
                quantity: parseFloat(document.getElementById('item2_quantity').value),
                unitPrice: parseFloat(document.getElementById('item2_unit_price').value),
            }
        ];

        let totalUSD = 0;
        let itemsHtml = '';

        items.forEach(item => {
            const itemTotalUSD = item.quantity * item.unitPrice;
            totalUSD += itemTotalUSD;
            itemsHtml += `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity.toFixed(2)}</td>
                    <td>${item.unitPrice.toFixed(2)}</td>
                    <td>${itemTotalUSD.toFixed(2)}</td>
                </tr>
            `;
        });

        // Conversion rate from USD to INR (example rate: 1 USD = 83 INR)
        const conversionRate = 83;
        const totalINR = totalUSD * conversionRate;

        document.getElementById('invoice-output').innerHTML = `
            <h2>Invoice</h2>
            <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
            <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            <div class="totals">
                <strong>Total Amount (USD): $${totalUSD.toFixed(2)}</strong><br>
                <strong>Total Amount (INR): ₹${totalINR.toFixed(2)}</strong>
            </div>
        `;
    });
});
