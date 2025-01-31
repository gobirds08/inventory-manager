import { SupplierOrder } from "../../models/SupplierOrders";
import { useEffect, useState } from "react";
import { SupplierOrderDetail } from "../../models/SupplierOrderDetails";
import PopUpCardBar from "../pop_up_card_bar/PopUpCardBars";
import { fetchSupplyOrderDetailsFromSupplierOrderID } from "../../utilities/FetchData";

interface SupplierOrderViewProps {
	supplier_order: SupplierOrder;
}

function SupplierOrderPopUpView({ supplier_order }: SupplierOrderViewProps) {
	const [orderDetails, setOrderDetails] = useState<SupplierOrderDetail[]>([]);

	useEffect(() => {
		const fetchOrderDetails = async () => {
			const supplierOrderDetails: SupplierOrderDetail[] =
				await fetchSupplyOrderDetailsFromSupplierOrderID(
					supplier_order.supplier_order_id
				);
			setOrderDetails(supplierOrderDetails);
		};
		fetchOrderDetails();
	}, []);

	return (
		<div className="space-between most-height">
			<div className="supply-order-header">
				<h3>Order ID: {supplier_order.supplier_order_id}</h3>
				<h3>Supplier ID: {supplier_order.supplier_id}</h3>
				<h3>Order Date: {supplier_order.order_date.toUTCString()}</h3>
			</div>
			<PopUpCardBar supplier_order_details={orderDetails} />
		</div>
	);
}

export default SupplierOrderPopUpView;
