<h1 align = "center" > RxJS </h1>

## Method firstValueFrom

Trong RxJS , 'firstValueFrom' là một hàm được sử dụng để chuyển đổi một Observable
thành một Promise và lấy giá trị đầu tiên từ Observable đó

- Code:
  import { interval } from 'rxjs';
  import { firstValueFrom } from 'rxjs';

async function example() {
const observable$ = interval(1000); // Tạo một Observable phát ra các giá trị liên tiếp sau mỗi 1 giây

try {
const firstValue = await firstValueFrom(observable$);
console.log('First value:', firstValue);
} catch (error) {
console.error('Error:', error);
}
}

example();

## Observable

Là một trong khái niệm quan trọng trong lập trình sử dụng trong RxJS và các thư viện reactivity khác:

1.  Thể dữ liệu thay đổi theo thời gian : Observable là một chuỗi các giá trị, thể hiện sự thay đổi của dữ liệu theo thời gian . Thay vì trả về một gía trị tại một thời điểm cụ thể Observable sẽ phát ra các giá trị liên tiếp trong suốt quá trình thực thi
2.  Bất đồng bộ: Observable có thể thực thi bất đồng bộ, có nghĩa là nó có thể tiếp tục thực thi các công việc khác trong khi chờ đợi giá trị từ nguồn dữ liệu
    3.Hỗ trợ cho sự kiện và dữ liệu streaming: Observable có thể sử dụng để xử lý dữ liệu theo cách streaming hoặc xử lý sự kiện, đồng thời hỗ trợ xử lý dữ liệu đa dạng như các sự kiện chuỗi, các tác vụ HTTP bất đồng bộ, tương tác với nguồn dữ liệu gần thời gian thực, v.v.

3.  Có thể bị hủy bỏ: Một Observable có thể bị hủy bỏ (unsubscribe) khi không cần thiết nữa để tránh việc tiêu tốn tài nguyên và giải phóng bộ nhớ. Khi một subscriber hủy bỏ việc lắng nghe Observable, nó sẽ không nhận thêm các giá trị mới từ Observable nữa.

4.  Hỗ trợ cho xử lý lỗi: Observable có khả năng xử lý lỗi, cho phép bạn xử lý các tình huống bất ngờ và điều khiển luồng dữ liệu dễ dàng hơn.

5.  Có thể biểu diễn các luồng dữ liệu vô hạn: Observable có thể biểu diễn các luồng dữ liệu vô hạn, cho phép bạn xử lý các luồng dữ liệu lớn, không giới hạn theo thời gian.
    => Observable cung cấp mạnh mẽ để xử lý dư liệu theo reactivity, giúp bạn tập trung vào việc xử lý và biến đổi dữ liệu một cách dễ dàng và hiệu quả

## Switch Map belong to rxjs/operators

SwitchMap là một operator trong thư viện RxJS, được sử dụng để xử lý dữ liệu của Observable bằng cách chuyển đổi các giá trị emitted và trả về một Observable mới
Tác dụng chính của `switchMap` là chuyển đổi các giá trị emiited từ Observable ban đầu thành một Observable mới và chuyển đổi Observable mới đó thành các giá trị emitted duy nhất. Điều đặc biệt mà switchMap chỉ giữ lại Observable mới nhất và hủy bỏ các Observable trước đó nếu có

## Of belong to rxJS

Trong RxJS, hàm `of` được sử dụng để tạo một Observable chứa một hoặc nhiều giá trị đã được cung cấp .Nói cách khác, `of` tạo một Observable phát ra các giá trị được truyền vào như các tham số
Hàm `of` có thể được sử dụng để tạo Observable từ một danh sách giá trị cố định và nó thường nó được sử dụng trong các tình huống cần tạo Observable để phát ra các giá trị cụ thể

## pipe

`pipe` được sử dụng như một phần của cú pháp của RxJS để thực hiện các phép biến đổi và xử lý dữ liệu trong chuỗi Observable.Cụ thể pipe có một Operator `catchError` được sử dụng để bắt và xử lý lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình gửi tin nhắn Kafka.Nếu có lỗi sẽ được chuyển thành một `RpcException`
