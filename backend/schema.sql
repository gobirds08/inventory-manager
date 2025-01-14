
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE Suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20)
);

CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category_id INT REFERENCES Categories(category_id) ON DELETE CASCADE,
    supplier_id INT NOT NULL REFERENCES Suppliers(supplier_id) NOT NULL ON DELETE SET NULL,
    quantity_in_stock INT NOT NULL CHECK (quantity_in_stock >= 0) DEFAULT 0,
    price_per_unit DECIMAL(10, 2) NOT NULL CHECK (price_per_unit >= 0) DEFAULT 0,
    description TEXT
);

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(20)
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customers(customer_id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0) DEFAULT 0
);

CREATE TABLE OrderDetails (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0)
);

CREATE INDEX idx_products_category_id ON Products(category_id);
CREATE INDEX idx_products_supplier_id ON Products(supplier_id);
CREATE INDEX idx_orders_customer_id ON Orders(customer_id);
CREATE INDEX idx_orderdetails_order_id ON OrderDetails(order_id);
CREATE INDEX idx_orderdetails_product_id ON OrderDetails(product_id);