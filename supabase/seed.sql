CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  is_po BOOLEAN DEFAULT false,
  po_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

INSERT INTO products (name, description, price, image_url, category, stock, is_po, po_days)
VALUES ('Strawberry Shortcake', 'Kue spons lembut dengan krim vanilla dan strawberry segar.', 150000, 'https://images.unsplash.com/photo-1565958030280-11662293b441', 'Cake', 10, true, 2);

INSERT INTO products (name, description, price, image_url, category, stock, is_po, po_days)
VALUES ('Fudgy Brownies', 'Brownies cokelat pekat dengan topping almond dan choco chips.', 75000, 'https://images.unsplash.com/photo-1603532902121-d99a27a8f11c', 'Brownies', 20, false, 0);

INSERT INTO products (name, description, price, image_url, category, stock, is_po, po_days)
VALUES ('Matcha Mille Crepes', 'Lapisan krim matcha premium dengan tekstur yang sangat lembut.', 120000, 'https://images.unsplash.com/photo-1586747322522-33378293767a', 'Cake', 5, true, 3);

INSERT INTO products (name, description, price, image_url, category, stock, is_po, po_days)
VALUES ('Cheese Cookies', 'Kue keju gurih dan renyah, cocok untuk teman minum teh.', 45000, 'https://images.unsplash.com/photo-1558967916-24757766747c', 'Cookies', 50, false, 0);

INSERT INTO products (name, description, price, image_url, category, stock, is_po, po_days)
VALUES ('Red Velvet Cake', 'Kue merah mewah dengan cream cheese frosting yang creamy.', 180000, 'https://images.unsplash.com/photo-1616545361396-777373777777', 'Cake', 8, true, 2);