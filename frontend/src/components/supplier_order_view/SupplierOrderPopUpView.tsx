import { SupplierOrder } from "../../models/SupplierOrders";
import { useEffect, useState } from "react";
import { SupplierOrderDetail } from "../../models/SupplierOrderDetails";

interface SupplierOrderViewProps {
	supplier_order: SupplierOrder;
}

function SupplierOrderPopUpView({ supplier_order }: SupplierOrderViewProps) {
	const [orderDetails, setOrderDetails] = useState<SupplierOrderDetail[]>([]);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			const response = await fetch(
				`http://localhost:3001/supplier_order_details?supplier_order_id=${supplier_order.supplier_order_id}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch order details");
			}
			const data = await response.json();
			setOrderDetails(data);
		};
		fetchOrderDetails();
	}, []);

	return (
		<>
			<div className="supply-order-header">
				<h3>Order ID: {supplier_order.supplier_order_id}</h3>
				<h3>Supplier ID: {supplier_order.supplier_id}</h3>
				<h3>Order Date: {supplier_order.order_date.toUTCString()}</h3>
			</div>
		</>
	);
}

export default SupplierOrderPopUpView;
