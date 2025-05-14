CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role ENUM('user', 'admin', 'inheritor') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE heritage_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    province VARCHAR(50),
    images TEXT,
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inheritors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    contact VARCHAR(100),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_inheritor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    heritage_item_id INT,
    inheritor_id INT,
    relationship VARCHAR(100),
    FOREIGN KEY (heritage_item_id) REFERENCES heritage_items(id) ON DELETE CASCADE,
    FOREIGN KEY (inheritor_id) REFERENCES inheritors(id) ON DELETE CASCADE
);

CREATE TABLE submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    inheritor_info TEXT,
    image_urls TEXT,
    video_url VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE design_templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    category VARCHAR(50),
    region VARCHAR(50),
    thumbnail_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_designs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    template_id INT,
    design_data TEXT,
    preview_url VARCHAR(255),
    is_favorite BOOLEAN DEFAULT FALSE,
    is_reserved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (template_id) REFERENCES design_templates(id)
);

CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page VARCHAR(100),
    action VARCHAR(50),
    item_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

