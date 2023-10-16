  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  <h1 align="center">TYPEORM IN NESTJS</h1>

#### 1 .TypeOrmOptionsFactory:

Đây là một giao diện thư viện `@nestjs/typeorm` của NestJS cho phép bạn tạo ra các tùy chọn cho TypeORM configuration theo cách tùy chỉnh. Khi bạn triển khai interface này trong một service, bạn cần triển khai phương thức `createTypeOrmOptions()`, trong phương thức đó bạn trả về tùy chọn cấu hình TypeORM

#### 2. TypeOrmModuleOptions():

Đây là một kiểu dữ liệu mô tả các tùy chọn cấu hình cho TypeORM

#### 3. getMetadataArgsStorage():

Đây là một hàm xuất thư viện `typeorm`.Nó cho phép bạn truy xuất thông tin về metadata liên quan tới các entity(đối tượng tương tác với CSDL) trong ứng dụng của bạn , `getMetadataArgsStorage().tables` để lấy danh sách các entity đã đăng ký với TypeORM thông qua decorators

#### 4. @InjectRepository(YourEntity)

`@InjectRepository(YourEntity)` là một decorator trong NestJS được sử dụng để Inject một repository(kho dữ liệu) của một enity cụ thể vào trong một service hoặc controller.Đây là một phần quan trọng của thư viện `@nestjs/typeorm` để tương tác với cơ sở dữ liệu trong ứng dụng NestJS
Khi khai báo `@InjectRepository(YourEntity)` , đang báo cho NestJS rằng bạn muốn Inject một repository để thực hiện các thao tác CRUD trên đối tượng của `YourEntity` của một service hoặc controller
