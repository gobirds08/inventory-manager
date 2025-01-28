import { SupplierOrder } from "../models/SupplierOrders";
import { useEffect, useState } from "react";
import { fetchSupplierOrders } from "../utilities/FetchData";
import SupplierOrderView from "../components/supplier_order_view/SupplierOrderView";

function SupplierOrders() {
	const [orders, setOrders] = useState<SupplierOrder[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const orders: SupplierOrder[] = await fetchSupplierOrders();
			const updatedOrders = orders.map((order) => ({
				...order,
				order_date: new Date(order.order_date),
			}));
			setOrders(updatedOrders);
		};
		fetchOrders();
	}, []);

	return (
		<>
			{/* maybe add some sort of filter or add button */}
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Supplier ID</th>
						<th>Order Date</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{orders.map((order) => (
						<tr key={order.supplier_order_id}>
							<td>{order.supplier_order_id}</td>
							<td>{order.supplier_id}</td>
							<td>{order.order_date.toUTCString()}</td>
						</tr>
					))}
					{/* maybe create some sort of delete or sort buttons */}
				</tbody>
			</table>
		</>
	);
}

export default SupplierOrders;
