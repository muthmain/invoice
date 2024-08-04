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

        let total = 0;
        let itemsHtml = '';

        items.forEach(item => {
            const itemTotal = item.quantity * item.unitPrice;
            total += itemTotal;
            itemsHtml += `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitPrice.toFixed(2)}</td>
                    <td>${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

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
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            <div class="totals">
                <strong>Total Amount: $${total.toFixed(2)}</strong>
            </div>
        `;
    });
});
