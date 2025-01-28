import { SupplierOrder } from "../models/SupplierOrders";
import { useState } from "react";
import SupplierOrderView from "../components/supplier_order_view/SupplierOrderView";

function SupplierOrders() {
	const [orders, setOrders] = useState<SupplierOrder[]>([]);

	return (
		<>
			<h1>Supplier Orders</h1>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Supplier ID</th>
						<th>Order Date</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.supplier_order_id}>
							<td>{order.supplier_order_id}</td>
							<td>{order.supplier_id}</td>
							<td>{order.order_date.toISOString()}</td>
						</tr>
					))}
					{/* maybe create some sort of delete or sort buttons */}
				</tbody>
			</table>
		</>
	);
}

export default SupplierOrders;
