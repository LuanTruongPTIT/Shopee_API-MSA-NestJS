  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
    <h1 align="center">Building with Patterns in MongoDB</h1>

## 1. Approximation(Catalog, IOT, Mobile, Real-Time Analytics)

## 2. Polymorphic pattern

> Mẫu đa hình trong thiết kế MongoDB là một kỹ thuật được sử dụng để mô hình hóa các quan hệ đa hình (polymorphic relationships) giữa các tài liệu trong cùng một collection. Nó cho phép lưu trữ cấc đối tượng con với cấu trúc dữ liệu khác nhau trong một collection duy nhất và tiện lợi khi bạn không biết được chính xác loại đối tượng mà bạn sẽ lưu trữ.<br>
> Trong một Polymorphic Pattern, mỗi tài liệu trong collection sẽ chứa một trường xác định loại đối tượng tương ứng thông qua giá trị của trường này, ứng dụng có thể hiểu và xủ lý dữ liệu theo cách phù hợp với loại đối tượng. Một ví dụ cụ thể sau: <br>

```
{
  "_id": ObjectId("61512345678901234567890"),
  "name": "Laptop A",
  "type": "laptop",
  "specifications": {
    "screen_size": 15.6,
    "ram": "8GB",
    "storage": "512GB SSD"
  }
}
```
