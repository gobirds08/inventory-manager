import { SupplierOrder } from "../models/SupplierOrders";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
	fetchSupplierOrders,
	createSupplierOrder,
} from "../utilities/FetchData";
import SupplierOrderPopUpView from "../components/supplier_order_view/SupplierOrderPopUpView";
import PopUp from "../components/pop-up/PopUp";
import SupplyOrderCommands from "../components/SupplyOrderCommands/SupplyOrderCommands";

function SupplierOrders() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const product_id = queryParams.get("product_id");
	const supplier_id = queryParams.get("supplier_id");
	console.log(product_id);
	console.log(supplier_id);

	const [orders, setOrders] = useState<SupplierOrder[]>([]);
	const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
	const [selectedtOrder, setSelectedOrder] = useState<SupplierOrder | null>(
		null
	);

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

	useEffect(() => {
		if (product_id && supplier_id) {
			const existingOrder: SupplierOrder | undefined = orders.find(
				(order) => order.supplier_id === parseInt(supplier_id) && !order.ordered
			);
			if (existingOrder) {
				const updateOrder: SupplierOrder = {
					...existingOrder,
					order_date: new Date(existingOrder.order_date),
				};
				setSelectedOrder(updateOrder);
				setPopUpVisible(true);
			} else {
				const createOrder = async () => {
					const newOrder: SupplierOrder = await createSupplierOrder(
						parseInt(supplier_id)
					);
					const updateOrder: SupplierOrder = {
						...newOrder,
						order_date: new Date(newOrder.order_date),
					};
					setSelectedOrder(updateOrder);
					setPopUpVisible(true);
				};
				createOrder();
			}
		}
	}, [orders, product_id, supplier_id]);

	return (
		<>
			<SupplyOrderCommands />
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
						<tr
							key={order.supplier_order_id}
							onClick={() => {
								setPopUpVisible(true);
								setSelectedOrder(order);
							}}
						>
							<td>{order.supplier_order_id}</td>
							<td>{order.supplier_id}</td>
							<td>{order.order_date.toUTCString()}</td>
						</tr>
					))}
					{/* maybe create some sort of delete or sort buttons */}
				</tbody>
			</table>
			<PopUp show={popUpVisible} onClose={() => setPopUpVisible(false)}>
				<SupplierOrderPopUpView
					supplier_order={selectedtOrder!}
					product_id={product_id ? parseInt(product_id) : null}
				/>
			</PopUp>
		</>
	);
}

export default SupplierOrders;
