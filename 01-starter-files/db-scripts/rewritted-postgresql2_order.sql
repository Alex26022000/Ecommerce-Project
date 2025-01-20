--
-- Table structure for table `address`
--
CREATE TABLE fullstack_ecommerce.address (
  id BIGSERIAL PRIMARY KEY,
  city VARCHAR(255),
  country VARCHAR(255),
  state VARCHAR(255),
  street VARCHAR(255),
  zip_code VARCHAR(255)
);

-- Table structure for table `customer`
--
CREATE TABLE fullstack_ecommerce.customer (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255)
);


-- Table structure for table `orders`
--
CREATE TABLE fullstack_ecommerce.orders (
  id BIGSERIAL PRIMARY KEY,
  order_tracking_number VARCHAR(255),
  total_price DECIMAL(19,2),
  total_quantity INT,
  billing_address_id BIGINT,
  customer_id BIGINT,
  shipping_address_id BIGINT,
  status VARCHAR(128),
  date_created TIMESTAMP(6),
  last_updated TIMESTAMP(6),
  UNIQUE (billing_address_id),
  UNIQUE (shipping_address_id),
  FOREIGN KEY (customer_id) REFERENCES fullstack_ecommerce.customer (id),
  FOREIGN KEY (billing_address_id) REFERENCES fullstack_ecommerce.address (id),
  FOREIGN KEY (shipping_address_id) REFERENCES fullstack_ecommerce.address (id)
);

-- Table structure for table `order_item`
--
CREATE TABLE fullstack_ecommerce.order_item (
  id BIGSERIAL PRIMARY KEY,
  image_url VARCHAR(255),
  quantity INT,
  unit_price DECIMAL(19,2),
  order_id BIGINT,
  product_id BIGINT,
  FOREIGN KEY (order_id) REFERENCES fullstack_ecommerce.orders (id),
  FOREIGN KEY (product_id) REFERENCES fullstack_ecommerce.product (id)
);
