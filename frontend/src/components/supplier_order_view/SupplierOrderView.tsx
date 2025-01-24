import { SupplierOrder } from "../../models/SupplierOrders";
import Button from "../button/Button";

interface SupplierOrderViewProps {
	supplier_order: SupplierOrder;
}

function SupplierOrderView({ supplier_order }: SupplierOrderViewProps) {
	return (
		<>
			<Button classes="card" action={() => console.log("Supplier Order View")}>
				<h3>Order ID: {supplier_order.supplier_order_id}</h3>
				<h3>Supplier ID: {supplier_order.supplier_id}</h3>
				<h3>Order Date: {supplier_order.order_date.toUTCString()}</h3>
			</Button>
		</>
	);
}

export default SupplierOrderView;
