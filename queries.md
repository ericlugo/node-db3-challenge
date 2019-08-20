# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

```SQL
SELECT P.ProductName, C.CategoryName
FROM Products AS P
JOIN Categories AS C ON P.CategoryID = C.CategoryID;
```

---

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

```SQL
SELECT O.OrderID, S.ShipperName
FROM Orders AS O
JOIN Shippers AS S ON O.ShipperID = S.ShipperID
WHERE O.OrderDate<'1997-01-09';
```

---

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

```SQL
SELECT P.ProductName, OD.Quantity
FROM OrderDetails AS OD
JOIN Products AS P ON OD.ProductID = P.ProductID
WHERE OD.OrderID = 10251
ORDER BY P.ProductName;
```

---

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

```SQL
SELECT
  O.OrderID,
  C.CustomerName AS "Customer Name",
  E.LastName AS "Employee's Last Name"
FROM Orders AS O
JOIN Customers AS C ON O.CustomerID = C.CustomerID
JOIN Employees AS E ON O.EmployeeID = E.EmployeeID;
```

---

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

```SQL
SELECT
  C.CategoryName,
  COUNT(*) AS "Count"
FROM Products AS P
JOIN Categories AS C ON P.CategoryID = C.CategoryID
GROUP BY P.CategoryID;
```

---

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

```SQL
SELECT
  OD.OrderID,
  COUNT(*) AS "ItemCount"
FROM OrderDetails AS OD
GROUP BY OD.OrderID;
```
