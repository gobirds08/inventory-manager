import { SupplierOrder } from "../models/SupplierOrders";
import { useState } from "react";

function SupplierOrders() {
	const [orders, setOrders] = useState<SupplierOrder[]>([]);

	return (
		<>
			<h1>Supplier Orders</h1>
			<div className="container"></div>
			{orders.map((order) => (
				// <OrderView key={order.supplier_order_id} order={order} />
				<h1>{order.supplier_id}</h1>
			))}
		</>
	);
}

export default SupplierOrders;
