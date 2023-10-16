# KAFKA

## Topic

`Topic` là `stream of data` , luồng dữ liệu của kafka. Nói thế cho nguy hiểm chứ hiểu đơn giản nó là một dãy các message nối tiếp nhau.

- Có thể nói topic giống như table trong relational database: MySql, PostgreSQL.....
- Table bao gồm name và row . Tương tự `topic name` và `message`. Các luồng dữ liệu được gửi vào topic giống như việc insert row vào table . Row mới được insert vào ngay sau row cũ . `Topic` được lưu ở log file phân chia thành các bộ phận khác nhau.

## Partition và offset

Topic cũng giống table nó được chia thành một hoặc nhiều partition và message được lưu trên đó . Khi tạo topic cần xác định số lượng partition mong muốn

- Partition được order và bắt đầu từ 0.
- Các message được lưu trong partition cũng được order theo thứ tự cũ đến mới, append liên tục bắt đầu từ giá trị o, được gọi là offset.
  `https://i.imgur.com/ymiffS8.png`
  => Như vậy một message trong Kafka được xác định bởi 3 yếu tố : `Topic name`, `Partition`, `Offset`
  Vài điều cần chú ý:
- Dù 2 `message` có cùng `offset` nhưng thuộc 2 partition khác nhau => khác nhau. Offset chỉ có ý nghĩa trong cùng một partition
- Offset có thứ tự, nhưng chỉ đảm bảo thứ tự trong cùng partition . Ví dụ trong cùng partition 1, message có offset = 3 chắc chắn đến sau message có offset = 2
- Message sau khi được consume không bị xóa ngay, default giữ lại trong 7 ngày - có thể config . Sau 7 ngày message bị xóa nhưng offset không reset mà tiếp tục tăng
- Data sau khi lưu vào partition là immutable - bất biến ,không thể thay đổi. Không thể update, không thể swap sang offset khác
  `nếu muốn các message cùng được lưu trên một partition để đảm bảo thứ tự thì làm thế nào? trong kafka`
  => Khi một message được gửi vào Kafka, Kafka sẽ sử dụng hàm hash của key để xác định partition. Vì vậy, các message có cùng key sẽ được đưa vào cùng một partition. Trong một partition cụ thể, các message sẽ được lưu trữ theo thứ tự mà chúng được gửi vào Kafka.

## Ví dụ về kafka

Lấy vị dụ bài toán thực tế với kafka topic
Mình đóng vai công ty Grab - cung cấp dịch vụ vận chuyển con người và hàng hóa. Mình muốn tracking vị trí của từng tài xế, cập nhật mỗi 20 giây. Áp dụng Kafka vào hệ thống để xử lý bài toán:

Tạo topic driver_gps chứa thông tin về vị trí của toàn bộ tài xế.
Cứ 20 giây, thiết bị của tài xế sẽ gửi một message bao gồm: driver_id và driver_position lên partition của driver_gps topic.
Túm cái váy lại, toàn bộ vài trăm nghìn tài xế của mình sẽ gửi message lên duy nhất một topic driver_gps. Lúc này topic driver_gps là stream of data của toàn bộ các tài xế. Khá dễ hiểu.

Sau khi message được đẩy lên Kafka, sẽ có rất nhiều consumer phía sau nhận message để xử lý:

Consumer cho việc tracking location, hiển thị vị trí hiện tại của tài xế trên map.
Consumer cho notification. Tài xế đã xuất phát chưa, đã đến nơi chưa.
Consumer để tracking tài xế. Đang làm việc hay nghỉ ngơi, đã làm quá giờ chưa.. vân vân và mây mây.

# Kafka broker

- Topic được lưu trữ ở trên server . Và server là một kafka broker trong kafka cluster
  Broker gồm 3 nhiệm vụ:

  - Receive message từ Producer và ack
  - Lưu message tại log file để đảm bảo an toàn, tránh trường hợp mất message
  - Gửi message đến Consumer trong trườơng hợp được yêu cầu
    Ngoài lề, cluster và replicate đều nói về multi-node nhưng khái niệm cơ chế hoạt đọng khác nhau
  - Mỗi broker lưu trữ một vài partition, không lưu trữ tất cả partition của topic
  - Để đảm bảo `high reliable` ,Kafka tự động phân tán các partition trên tất cả broker đang có .Mỗi partition nằm trên một broker .Topic-A partition 1 có thể nằm trên bất kì broker nào mà không phục thứ tự
    Cơ chế xử lý single-point failure cho partition chẳng có gì kì diệu. Vẫn dựa trên ý tưởng cổ điển, tạo ra nhiều bản sao cho partition và lưu trên những broker khác nhau thông qua replication factor. Với ví dụ trên replication factor = 1. Nếu tăng lên 3, mô hình sẽ như sau:

# Consumer

Có gửi thì có nhận và consumer là đầu nhận message

> Consumer đọc message từ topic xác định bằng topic name. Đồng thời consumer biết nên đọc message từ broker nào .Trong trường hợp chưa read xong mà broker gặp sự cố consumer cũng có cơ chế tự phục hồi
> Việc đoạc message trong một partition diễn ra tuần tự để đảm bảo message ordering. Có nghĩa là consumer không thể đọc message offset=3 khi chưa đọc message offset=2
> Một consumer cũng thể đọc message từ một hoặc nhiều hoặc tất cả partion trong một topic

## Consumer group

> Consumer là nơi đọc message từ topic. Có nghĩa là một consumer có thể đọc toàn bộ message của tất cả partition thuộc cùng topic
> Nếu số lượng producer tăng lên và đồng thửi message đến tất cả partition trong khi duy nhất một consumer thì khả năng xử lý rất chậm sẽ dẫn tới bottle-neck. Giải pháp là tăng số lượng consumer, các consumer có thể xử lý đồng thời message từ nhiều partition. Và tất cả các consumer sẽ thuộc cùng một nhóm được gọi là consumer group.
> => Như vậy consumer group read toàn bộ data của các partion và chia vào các consumer bên trong để xử lý
> Mỗi consumer thuộc consumer group sẽ đọc toàn bộ data của một hoặc nhiều partition để đảm bảo message ordering . Không tồn tại nhiều consumer cùng đọc message từ một partion

  <h1 align="center">KAFKA IN NESTJS</h1>
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>

## ClientKafka yarn belong to @Nestjs/microservices

### 1. Method subscribeToResponseOf

Phương thức `subscribeToResponseOf` trong Nestjs Kafka Client(ClientKafka) được sử dụng để đăng ký lắng nghe các phản hồi từ các consumer khác trong hệ thống dựa trên các message đã được gửi đi
Khi một microservices Nestjs sử dụng kafka client gửi một message đén một topic cụ thể nó sẽ đợi nhận phản hồi từ các consumer khác. Để có thể xử lý phản hồi này ta cần sử dụng phương thức `subscribeToResponseOf` để đăng ký lắng nghe các phản hồi từ các consumer

### 2. Ack- Acknowledgment

> Làm thế nào để producer biết message đã được write thành công ở partition? => Cơ chế ack

- acks=0: giống fire-and-forget, gửi message mà không chờ phản hồi. Do vậy có thể dẫn đến tình huống mất message
- acks=1: default setting: Lần này chắc chắn hơn, producer chờ cho tới khi nhận được phản hồi từ replication leader . Tuy nhiên chưa ngăn chặn hoàn toàn việc mất message. Replication leader write message thành công, báo lại cho producer, tuy nhiên broker có thể gặp sự cố với disk, không thể khôi phục data
- acks=all: lần này thì quá chắc chắn, đảm bảo không mất message.Producer sẽ nhận được phản hồi khi tất cả replication leader và IRS write data thành công
  => Dễ dàng nhận thấy cái gía phải trả cho việc đảm bảo không mất message là performance



## Error 'The group is rebalancing, so a rejoin is needed'
Xuất hiện khi kafka co 