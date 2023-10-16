  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
 <h1 align="center">Optimistic Locking</h1>
Optimistic locking(khóa lạc quan) là một kỹ thuật trong cơ sở dữ liệu để đảm bảo tính nhất quán và nguuyên tắc xử lý đồng thời của các giao dịch. Kỹ thuật này được sử dụng trong môi trường đa người dùng khi nhiều giao dịch có thể truy cập và thay dổi dữ liệu trong cùng một lúc .
Cơ chế optimistic locking hoạt đọng như sau:
1. Phiên bản hóa(Versionning): Mỗi dòng dữ liệu trong cơ sở dữ liệu sẽ có một số phiên bản version đi kèm. Khi dữ liệu được truy xuất số phiên bản hiện tại của dòng dữ liệu cũng được trả về 
2. Trong quá trình cập nhật: Khi giao dịch muốn cập nhật lấy dữ liệu, nó sẽ kiểm tra phiên bản hiện tại của dòng dữ liệu với phiên bản đã lấy. Nếu dữ liệu khớp chúng sẽ lấy .Nếu chúng khớp, có nghĩa là dữ liệu không bị thay đổi bởi người khác trong thời gian giao dịch này, giao dịch này có thể tiến hành cập nhật 
2. Nếu phiên bản không khớp: Nếu phiên bản đã lấy không khớp với phiên bản hiện tại của dòng dữ liệu, điều này có nghĩa là giao dịch khác đã cập nhật dữ liệu trong thời gian này .Giao dịch hiện tại sẽ không tiến hành cập nhật mà sẽ thông báo về việc xảy ra xung đột
3. Xử lý xung đột: Khi xử lý xung đột, người dùng hoặc ứng dụng thường sẽ phải xác định cách giải quyết .Một số cách thông thường bao gồm hủy bỏ giao dịch hiện tại hoặc lấy lại dữ liệu mới và tiến hành cập nhật
- Lợi ích của optimistic locking là cho phép nhiều giao dịch đồng thời thực hiện trên cùng một dữ liệu mà không cần được thực hiện cẩn thận để đảm bảo tính nhất quán và độ tin cậy của dữ liệu
