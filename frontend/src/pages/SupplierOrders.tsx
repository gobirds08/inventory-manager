import { SupplierOrder } from "../models/SupplierOrders";
import { useState } from "react";
import SupplierOrderView from "../components/supplier_order_view/SupplierOrderView";

function SupplierOrders() {
	const [orders, setOrders] = useState<SupplierOrder[]>([]);

	return (
		<>
			<h1>Supplier Orders</h1>
			<div className="container"></div>
			<div className="order-list">
				{orders.map((order) => (
					<SupplierOrderView
						key={order.supplier_order_id}
						supplier_order={order}
					/>
				))}
			</div>
		</>
	);
}

export default SupplierOrders;
