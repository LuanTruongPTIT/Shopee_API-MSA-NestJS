  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  <h1 align="center">CQRS-PATTERN IN NESTJS</h1>

#### 1. AggregateRoot: Lớp trừu tượng `AggregateRoot` là một phần quan trọng của mô hình CQRS và Event Sourcing trong hệ thống phát triển ứng dụng.Được giới thiệu trong thư viện `@nestjs/CQRS` của NestJS. Nó đại diện cho một thực thể cơ bản của hệ thống, liên quan tới đến quản lý trạng thái và xử lý các sự kiện.

- Một số khái niệm:
  -- `Entity`: Trong ngữ cảnh của CQRS và Event Sourcing, một thực thể có đối tượng trạng thái và được xác định bởi một ID duy nhất . Thực thể có thể trải qua các thay đổi trạng thái thông qua việc xử lý và sự kiện.
  -- `Aggregate Root`: Là một thực thể chính trong hệ thống , có khả năng quản lý và xử lý các lệnh và sự kiện. Aggregate Root đóng vai trò là một điểm nhập vào cho việc thực hiện các hành động trên thực thể và đồng thời đảm bảo tính toàn vẹn của trạng thái
  -- AggregateRoot thường được mở rộng để tạo ra các lớp thực tế cho các thực thể cụ thể trong hệ thống của bạn. Mỗi lớp thực thể này sẽ xác định cách xử lý các lệnh và cập nhật trạng thái bằng cách phát ra các sự kiện tương ứng.

#### 2. EventBus in @nestjs/cqrs

Trong đoạn mã mà bạn cung cấp , EventBus là một thành phần quan trọng của NestJS CQRS và EventSourcing
-- EventBus trong CQRS và Event Sourcing:
EventBus là một phần quan trọng của mô hình CQRS() và Event Sourcing. Nhiệm vụ chính của EventBus là xử lý sự kiện và quản lý việc gửi và nhận các sự kiện trong hệ thống. EventBus giúp tách rời phần xử lý và sự kiện ra khỏi phần xử lý lệnh và truy cấn giúp tạo ra một kiến trúc dễ dàng mở rộng và bảo trì
`this.event$.publisher=this,eventStore`: Dòng mã này gán giá trị của `eventStore` cho thuộc tính `publisher` của `event$`(EventBus). Điều này có nghĩa là chỉ định rằng EventBus sử dụng EventStore làm nguồn phát sự kiện

#### 3. EventPublisher#mergeObjectContext

Phương thức `EventPublisher#mergeObjectContext` hợp nhất(kết hợp) với event publisher để cung cấp đối tượng, điều này có nghĩa rằng là đối tượng đó có thể khả năng publish event(đẩy sự kiện) vào trong stream(luồng sự kiện).

- `EventPublisher`: Là một công cụ hoặc đối tượng có chức năng xuất các sự kiện. Trong dự án này có thể liên quan đến NestJS hoặc các thư viện liên quan đến các sự kiện
- `mergeObjectContext`: Đây là một phương thức trong `EventPublisher` có chức năng hợp nhất các khả năng xuất bản sự kiện vào đối tượng hiện tại. Khi chúng ta gọi phương thức trên nó sẽ thêm các xuất bản sự kiện từ `EventPublisher` vào đối tượng đó. Điều này có nghĩa là bạn có thể sử dụng đối tượng đó để xuất bản các sự kiện.
- Sau khi chúng ta đã merge(hợp) `EventPublisher` vào đối tượng, đối tượng này có khả năng gửi các sự kiện vào các luồng sự kiện tức là có thể thông báo các sự kiện mà chúng ta muốn theo dõi hoặc xử lý

#### 4. @EventsHandler(UserCreatedEvent)

`@EventsHandler(UserCreatedEvent)` trong NestJS có tác dụng xác định một class là một event handler (xử lý sự kiện) cho sự kiện cụ thể `UserCreatedEvent`. Khi một sự kiện `UserCreatedEvent` được kích hoạt trong hệ thống, event handler sẽ được gọi để xử lý sự kiện đó.
