

CREATE TABLE blogSchema (
    id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    body VARCHAR(100000000) NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);

INSERT INTO blogSchema(title,image,body)
 VALUES ('Test Blog','https://images.unsplash.com/photo-1548658166-136d9f6a7e76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80','HELLO THIS IS A BLOG POST');
 