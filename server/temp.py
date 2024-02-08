import sqlite3

con = sqlite3.connect('inventory.db')

cur = con.cursor()

# cur.execute("-- Create Supplier Table
# CREATE TABLE Supplier (
#     Supplier_id INT PRIMARY KEY,
#     Supplier_name VARCHAR(255),
#     Supplier_mobile_no VARCHAR(20),
#     Supplier_email VARCHAR(255)
# );

# -- Insert data for the four suppliers
# INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_mobile_no, Supplier_email)
# VALUES
# (1, 'Siddhant', '1234567890', 'siddhant@example.com'),
# (2, 'Vikas', '9876543210', 'vikas@example.com'),
# (3, 'Satyam', '8765432109', 'satyam@example.com'),
# (4, 'Navneet', '7890123456', 'navneet@example.com');

# res = cur.execute("INSERT INTO Supplier (Supplier_id, Supplier_name, Supplier_mobile_no, Supplier_email) VALUES (1, 'Siddhant', '1234567890', 'siddhant@example.com'), (2, 'Vikas', '9876543210', 'vikas@example.com'), (3, 'Satyam', '8765432109', 'satyam@example.com'), (4, 'Navneet', '7890123456', 'navneet@gmail.com');")

# con.commit()

# res = cur.execute("""INSERT INTO Product (Product_id, Product_name, Photo, Purchase, Shelf_life, Purchase_price, Selling_Price, Qty, Supplier_id, Category)
# VALUES
# -- Category 1 - Milk, Bread, Bakery Items
# (1, 'Milk', 'https://as1.ftcdn.net/v2/jpg/01/06/68/88/500_F_106688812_rVoRFXazgIMEUJdvffG9p0XvP8Lntf0a.jpg', '2024-01-01', 3, 25, 40, 40, NULL, 1),
# (2, 'Bread', 'https://www.goldmedalbakery.com/content/uploads/2019/12/Sandwich-White.jpg', '2024-01-02', 3, 30, 50, 30, NULL, 1),
# (3, 'Cake', 'https://thesugarrandspice.com/wp-content/uploads/2019/11/IMGL0689-1-340x340.jpg', '2024-01-03', 3, 25, 40, 20, NULL, 1),
# (4, 'Paneer', 'https://m.media-amazon.com/images/I/81hD14MN91L.jpg', '2024-01-26',30, 100, 150, 20, NULL, 1),

# -- Category 2 - Soap, Toothpaste, Oil
# (11, 'Soap', 'https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2F44690%2F44690.png%3Fversion%3D1695983400', '2024-01-04', 30, 90, 120, 50, NULL, 2),
# (12, 'Toothpaste', 'https://m.media-amazon.com/images/I/617vIzCnJAL._AC_UF1000,1000_QL80_.jpg', '2024-01-05', 30, 100, 130, 40, NULL, 2),
# (13, 'Cooking Oil', 'https://www.quickpantry.in/cdn/shop/products/40071741_5-fortune-refined-sunflower-oil_500x500.jpg?v=1595267411', '2024-01-06', 30, 80, 120, 60, NULL, 2),

# -- Category 3 - Wheat, Rice, Dal
# (21, 'Wheat', 'https://3.imimg.com/data3/TE/JK/MY-2633320/packaged-wheat-flour-500x500.jpg', '2024-01-07', 90, 400, 650, 25, NULL, 3),
# (22, 'Rice', 'https://cdnimg.carepac.com/wp-content/uploads/2022/04/basmati-rice-1.png', '2024-01-08', 90, 450, 700, 30, NULL, 3),
# (23, 'Dal', 'https://5.imimg.com/data5/SELLER/Default/2022/7/GG/XS/HV/921937/dal-packaging-plastic-bag-500x500.webp', '2024-01-09', 90, 350, 600, 35, NULL, 3),

# -- Category 4 - Potato, Onion, Tomato
# (31, 'Potato', 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg', '2024-01-10', 7, 40, 70, 50, NULL, 4),
# (32, 'Onion', 'https://m.media-amazon.com/images/I/41Pi5dfvOoL.jpg', '2024-01-11', 7, 35, 60, 40, NULL, 4),
# (33, 'Tomato', 'https://himachaltonite.com/wp-content/uploads/2023/07/tamo.jpg', '2024-01-12', 7, 45, 80, 60, NULL, 4),

# -- Category 5 - Biscuits, Chips, Drinks, Ghee
# (41, 'Biscuits', 'https://www.quickpantry.in/cdn/shop/products/100397253_5-britannia-treat-chocolate-cream-biscuits_500x500.jpg?v=1596111245', '2024-01-13', 30, 8, 25, 30, NULL, 5),
# (42, 'Chips', 'https://www.quickpantry.in/cdn/shop/products/lays-potato-chips-naughty-limon-flavour_700x700.jpg?v=1643984428', '2024-01-14', 30, 10, 30, 40, NULL, 5),
# (43, 'Drinks', 'https://refreshhh.co.za/wp-content/uploads/2023/10/New-Refreshhh-Bottles-1000px-12.png', '2024-01-15', 30, 15, 40, 20, NULL, 5),
# (44, 'Ghee','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ibJMHSUMoer7ZyfXTyuPqE6nWr7qJU_Haw&usqp=CAU', '2024-01-16', 30, 300, 400, 20, NULL, 5)""")

# con.commit()

# res = cur.execute("""
#                   UPDATE Product
# SET Supplier_id = 
#     CASE
#         WHEN Category = 3 THEN ROUND(RANDOM() + 1)
#         WHEN Category = 4 THEN ROUND(RANDOM() + 3)
#     END
# WHERE Category IN (3, 4)
#                   """)

res = cur.execute("SELECT * FROM Product")

# con.commit()

print(res.fetchall())

# res = cur.execute("SELECT * FROM Supplier")

# print(res.fetchall())

# res = cur.execute("SELECT name FROM sqlite_master")
# print(res.description)