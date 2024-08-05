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

        // Conversion rate from USD to INR (example rate: 1 USD = 83 INR)
        const conversionRate = 83;

        let totalINR = 0;
        let itemsHtml = '';

        items.forEach(item => {
            // Convert unit price and total to INR
            const unitPriceINR = item.unitPrice * conversionRate;
            const itemTotalINR = item.quantity * unitPriceINR;
            totalINR += itemTotalINR;

            itemsHtml += `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity.toFixed(2)}</td>
                    <td>${formatCurrency(unitPriceINR)}</td>
                    <td>${formatCurrency(itemTotalINR)}</td>
                </tr>
            `;
        });

        // Format the INR values with commas and currency symbol
        function formatCurrency(amount) {
            return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

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
                        <th>Unit Price (INR)</th>
                        <th>Total (INR)</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            <div class="totals">
                <strong>Total Amount (INR): ${formatCurrency(totalINR)}</strong>
            </div>
        `;
    });
});
