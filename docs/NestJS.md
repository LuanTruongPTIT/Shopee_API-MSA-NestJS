 <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
<h1 align="center">DOCS NestJS</h1>

# I.INestApplication

## 1. enableCors method

Cross-Origin Resource Sharing trong ứng dụng nestJS .CORS là một cơ chế trong trình cuyệt web cho phép các trang web từ các nguồn khác nhau có thể yêu cầu tài nguyên từ máy chủ .Khi kích hoạt CQRS bạn cho phép các trang web từ các nguồn miền kháu nhau gửi các yêu cầu HTTP tới ứng dụng trong NestJS

- Một số option trong method trên:
  `origin`: "_" Đây là chỗ để xác định danh sách các nguồn miền mà bạn muốn chấp nhận các yêu cầu từ . Trong trường hợp này , `_`đại diện cho bất kỳ nguồn miền nào , tức là bạn cho phép tất cả các trang web từ bất kỳ nguồn nào có thể gửi yêu cầu tới ứng dụng của bạn
`methods`: ['GET','POST','PUT','PATCH','DELETE'] : Đây là danh sách các phương thức HTTP cho phép các nguồn có thể gửi
`allowedHeaders`: ['Content-Type','Accept','Authorization','X-Requested-With']:
  Đây là danh sách các tiêu đề HTTP mà bạn cho phép từ các nguồn miền khác có thể gửi . Trong trường hợp này bạn cho phép các tiêu đề Content-Type, Accept, Authorization và X-Requested-With

## Injectable belong to @nestjs/common

Trong NestJS decorator @Injectable được sử dụng để đánh dấu một class là một đối tượng có thể được Inject(chèn) vào các dependencies khác trong ứng dụng. Khi một class được đánh dấu là @Injectable, NestJS sẽ quản lý việc tạo và cung cấp các instance của class đó một cách tự động
Khi một class được đánh dấu là @Injectable, nó có thể được inject vào constructor của class khác, thông qua dependency injection. Dependency injection là một cơ chế quan trọng trong NestJS cho phép chúng ta quản lý các phụ thuộc giữa các class một cách dễ dang và linh hoạt
Tóm lại, khi một class được đánh dấu là @Injectable trong NestJS điều đó có nghĩa rằng là class đó có thể được Inject vào các dependencies khác và NestJS tự động quản lý việc tạo và cung cấp các instance của class đó

## Interceptors in NestJS

> NestJS intereptor là một lớp chú thích bằng các trình tự @Injectable và implement từ NestInterceptor Interface. Interface này có hai phương thức: intercept và handleRequest .Phương thức intercept sẽ được gọi trước khi được gửi yêu cầu tới một bộ điều khiển controller, trong khi phương thức `handleRequest` được gọi khi sau khi yêu cầu đẽ được xử lý và có phản hồi trả về <br> > https://blog.logrocket.com/wp-content/uploads/2023/04/nest-js-interceptor-diagram.png<br>

## setMetadata in NestJS

Là một decorator được sử dụng để đặt metadata trên một phần tử trong ứng dụng như một class, method hoặc một thứ gì đó để gắn decorator
Là một thông tin mở rộng(custom data) mà bạn có thể đính kèm vào các phần từ này và sau đó bạn có thể truy xuất từ các interceptor, guards hoặc decorators khác để thực hiện các tác vụ dựa trên thông tin này .Metadata có thể được sử dụng để tùy chỉnh hành vi của các thành phần trong ứng dụng nestjs

> Metadata là các thông tin mở rộng (custom data) mà bạn có thể đính kèm vào các phần tử này và sau đó bạn có thể truy xuất chúng từ các interceptor, guards hoặc decorators khác để thực hiện các tác vụ dựa trên thông tin này. Metadata có thể được sử dụng để tùy chỉnh hành vi của các thành phần trong ứng dụng Nest.js.

Ví dụ, trong mã bạn đã cung cấp, SetMetadata được sử dụng để đặt các metadata trên một method hoặc một handler:

SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath): Đặt metadata RESPONSE_MESSAGE_PATH_META_KEY với giá trị messagePath lên method hoặc handler. Điều này có thể được sử dụng sau này để truy xuất giá trị messagePath từ method hoặc handler đó.

SetMetadata(RESPONSE_SERIALIZATION_META_KEY, options?.serialization): Đặt metadata RESPONSE_SERIALIZATION_META_KEY với giá trị options?.serialization lên method hoặc handler.

SetMetadata(RESPONSE_MESSAGE_PROPERTIES_META_KEY, options?.messageProperties): Đặt metadata RESPONSE_MESSAGE_PROPERTIES_META_KEY với giá trị options?.messageProperties lên method hoặc handler.

Sau khi bạn đã đặt metadata này, bạn có thể sử dụng các interceptor hoặc decorators khác để truy xuất và sử dụng các giá trị metadata trong quá trình xử lý yêu cầu HTTP.
