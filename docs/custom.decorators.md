 <h1 align="center">KAFKA IN NESTJS</h1>
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>

## 1. SetMetadata

Trong NestJS, `setMetadata` là một phương thức được sử dụng để gắn thông tin tùy chỉnh metadata vào các thành phần như class phương thức hoặc thậm chí là các biến Metadata là các thông tin tùy chỉnh bạn có thể gắn vào mã NestJS để thực hiện các tác vụ cụ thể như xác định quyền truy cập thực hiện validation, hoặc bất kỳ công việc tùy chỉnh nào khác

## 2. this.reflector.getAllAndOverride

Là một phần của Nestjs và được sử dụng để truy xuất metadata từ một thành phần (ví dụ: một phương thức hoặc một lớp ) và sau đó kiểm tra xem liệu có một giá trị metadata cụ thể nào đó đã được gắn vào thành phần đó không.
