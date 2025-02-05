import { SupplierOrder } from "../../models/SupplierOrders";
import { useEffect, useState } from "react";
import { SupplierOrderDetail } from "../../models/SupplierOrderDetails";
import PopUpCardBar from "../pop_up_card_bar/PopUpCardBars";
import {
	fetchSupplyOrderDetailsFromSupplierOrderID,
	updateSupplierOrderStatus,
	addProductToSupplierOrder,
} from "../../utilities/FetchData";
import Button from "../button/Button";

interface SupplierOrderViewProps {
	supplier_order: SupplierOrder;
}

function SupplierOrderPopUpView({ supplier_order }: SupplierOrderViewProps) {
	const [orderDetails, setOrderDetails] = useState<SupplierOrderDetail[]>([]);
	const [ordered, setOrdered] = useState(supplier_order.ordered);

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

	function handleOrderStatus() {
		if (ordered) {
			return;
		}
		supplier_order.ordered = true;
		setOrdered(true);
		updateSupplierOrderStatus(supplier_order.supplier_order_id);
	}

	return (
		<div className="space-between most-height">
			<div className="supply-order-header">
				<h4>Order ID: {supplier_order.supplier_order_id}</h4>
				<h4>Supplier ID: {supplier_order.supplier_id}</h4>
				<h4>Order Date: {supplier_order.order_date.toUTCString()}</h4>
				<div>
					<Button action={() => handleOrderStatus()}>
						{ordered ? "Ordered" : "Order"}
					</Button>
				</div>
			</div>
			<PopUpCardBar supplier_order_details={orderDetails} />
		</div>
	);
}

export default SupplierOrderPopUpView;
