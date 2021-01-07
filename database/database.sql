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
    nix_item_id VARCHAR(255) NOT NULL, 
    brand_name VARCHAR(255) NOT NULL, 
    nix_brand_id VARCHAR(255) NOT NULL, 
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
    userId INTEGER, 
    CONSTRAINT fk_reviews_users
    FOREIGN KEY (userId) 
        REFERENCES users (id),
    itemId INTEGER, 
    CONSTRAINT fk_reviews_items 
    FOREIGN KEY (itemId)
        REFERENCES items (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
