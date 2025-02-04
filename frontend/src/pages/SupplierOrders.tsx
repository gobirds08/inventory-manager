import { SupplierOrder } from "../models/SupplierOrders";
import { useEffect, useState } from "react";
import { fetchSupplierOrders } from "../utilities/FetchData";
import SupplierOrderPopUpView from "../components/supplier_order_view/SupplierOrderPopUpView";
import PopUp from "../components/pop-up/PopUp";
import SupplyOrderCommands from "../components/SupplyOrderCommands/SupplyOrderCommands";

function SupplierOrders() {
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
				<SupplierOrderPopUpView supplier_order={selectedtOrder!} />
			</PopUp>
		</>
	);
}

export default SupplierOrders;
