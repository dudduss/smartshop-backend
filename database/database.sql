CREATE TABLE users (
	id serial PRIMARY KEY,
	email VARCHAR (255) UNIQUE NOT NULL,
    password_hash VARCHAR (255) NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL, 
    profile_picture_url VARCHAR, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE items (
	id serial PRIMARY KEY,
	num_reviews INTEGER NOT NULL DEFAULT 0,
    rating NUMERIC(3,2) NOT NULL DEFAULT 0.0,
    food_name VARCHAR(255) NOT NULL, 
    nix_item_id VARCHAR(255) UNIQUE NOT NULL, 
    brand_name VARCHAR(255) NOT NULL, 
    nix_brand_id VARCHAR(255) NOT NULL, 
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    user_id INTEGER, 
    CONSTRAINT fk_reviews_users
    FOREIGN KEY (user_id) 
        REFERENCES users (id),
    item_id INTEGER, 
    CONSTRAINT fk_reviews_items 
    FOREIGN KEY (item_id)
        REFERENCES items (id),
    content TEXT, 
    rating INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE markedItems (
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL, 
    CONSTRAINT fk_reviews_users
    FOREIGN KEY (user_id) 
        REFERENCES users (id),
    item_id INTEGER NOT NULL, 
    CONSTRAINT fk_reviews_items 
    FOREIGN KEY (item_id)
        REFERENCES items (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;   
END;
$$ language 'plpgsql';

CREATE TRIGGER update_customer_modtime 
BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_customer_modtime 
BEFORE UPDATE ON items 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_customer_modtime 
BEFORE UPDATE ON reviews 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_customer_modtime 
BEFORE UPDATE ON markedItems 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();