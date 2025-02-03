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
	product_id: number | null;
}

function SupplierOrderPopUpView({
	supplier_order,
	product_id,
}: SupplierOrderViewProps) {
	const [orderDetails, setOrderDetails] = useState<SupplierOrderDetail[]>([]);
	const [ordered, setOrdered] = useState(supplier_order.ordered);
	console.log(supplier_order);
	console.log(product_id);

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

	useEffect(() => {
		if (product_id) {
			const addProduct = async () => {
				await addProductToSupplierOrder(
					supplier_order.supplier_order_id,
					product_id
				);
				const supplierOrderDetails: SupplierOrderDetail[] =
					await fetchSupplyOrderDetailsFromSupplierOrderID(
						supplier_order.supplier_order_id
					);
				setOrderDetails(supplierOrderDetails);
			};
			addProduct();
		}
	}, [product_id]);

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
				<h3>Order ID: {supplier_order.supplier_order_id}</h3>
				<h3>Supplier ID: {supplier_order.supplier_id}</h3>
				<h3>Order Date: {supplier_order.order_date.toUTCString()}</h3>
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
