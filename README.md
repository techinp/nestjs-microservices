# neversitup-nestjs-microservices
โปรเจ็คทดสอบ

## วิธีการใช้งาน
`cd` เข้าทุก folder จากนั้น `run` ทุก folder พร้อมกัน โดยแต่ละ folder จะมี `PORT` ตามด้านล่าง
- gateway:  เป็น `Client` ใช้ `PORT 3000`
- auth:  เป็น `Auth Service` ใช้ `PORT 3001`
- user:  เป็น `User Service` ใช้ `PORT 3002`
- product:  เป็น `Product Service` ใช้ `PORT 3003`
- order:  เป็น `Order Service` ใช้ `PORT 3004`

เวลา `Request` เราจะ `Request` เข้าที่ `PORT 3000` เท่านั้น

โดย API ทั้งหมดจะมีตามนี้ หรือสามารถดูผ่าน [Postman](https://documenter.getpostman.com/view/29465248/2s9Y5crzhC)

-----------------------------
ทุกเส้นยกเว้น `Auth` จะ required `token` หมด \
สามารถใช้เป็น `Bearer ${username}` ที่ Sign Up ได้ \
หรือสามารถใช้เป็น `Bearer admin` ที่เป็นค่า Default ก็ได้เช่นกัน

### Auth
1) Sign In = method: `POST` / url: `/auth/signin` / body: `{ username: string, password: string}`
2) Sign Up = method: `POST` / url: `/auth/signup` / body: `{ username: string, password: string}`
### User
1) Get Profile = method: `GET` / url: `/user`
2) Get Order History = method: `GET` / url: `/user/order-history`
3) Get All User = method: `GET` / url: `/user/all`
### Product
1) Get All Product = method: `GET` / url: `/product`
2) Get Product by ID = method: `GET` / url: `/product/:id`
### Order
1) Create Order = method: `POST` / url: `/order` / body: `{ productIds: number[] }`
2) Cancel Order = method: `PUT` / url: `/order/:id`
3) Get Order by ID = method: `GET` / url: `/order/:id`
4) Get All Order = method: `GET` / url: `/order`
