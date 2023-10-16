  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  </p>
  <h1 align="center">REDIS IN NESTJS</h1>

## 1. Mutex

Mutual Exclusion là một phương pháp để đảm bảo rằng chỉ một luồng thread có thể truy cập vào một phần tài nguyên chia sẻ một thời điểm cụ thể . Nó được sử dụng đồng bộ truy cập vào các tài nguyên chia sẽ, như biến, danh sách, hoặc bộ nhớ, để tránh tình trạng đọc/ghi đồng nhất (inconsistent) hoặc xung đột dữ liệu
Mutex được hiểu là một khóa (lock) ảo mà các luồng phải sỡ hữu trước khi truy cập vào tài nguyên chia sẽ, và sau khi sử dụng xong , khóa sẽ được giải phòng để cho các luồng khác có thể sử dụng. Khi một luỗng đã sỡ hữu Mutex, các luồng khác sẽ bị chặn (blocked) nếu cố gắng sỡ hữu Mutex đó cho dến khi nó được giải phóng
Cách sử dụng Mutex thường bao gồm hai hoạt động chính : Lock và Unlock.Khi một luồng muốn truy cập vào tài nguyên chia sẽ, nó sẽ yêu cầu sỡ hữu Mutex bằng hoạt động lock. Sau khi hoàn thành công việc trên tài nguyên, luồng sẽ giải phòng Mutex bằng hoạt động Unlock, cho phép các luồng khác tiếp tục truy cập
Tuy nhiên việc sử dụng Mutex cần được thực hiện cẩn thận để tránh tình trạng deadlock (khi các luồng bị mắc kẹt vì không thể lấy được Mutex) hoặc livelock(khi các luồng không thể tiến hành công việc do liên tục thực hiện việc chờ Mutex). Điều này đòi hỏi thiết kế và triển khai Mutex phải được xem xét kỹ lượng để đảm bảo tính đáng tin cậy và hiệu xuất của hệ thống đa luồng

```
const getData = async get(key) => {
    String value = redis.get(key);
    if (value == null) { // neu cache = null
        // setnx -> insert neeu chua co key ton tai, nen dat 3 phut thoi
        if (redis.setnx(key_mutex, 1, 3 * 60) == 1) {  // Nó có nghĩa là set thanh cong
            value = db.get(key); // lay db
            redis.set(key, value, expiretime); // set cache
            redis.del(key_mutex); // xoa mutex di
        } else {  // Lúc này có nghĩa là các luồng khác cùng lúc đã tải db và đặt lại vào bộ nhớ đệm, lúc này bạn hãy thử lấy lại giá trị trong cache
            sleep(50);
            get(key);  // data
        }
    } else {
        return value;
    }
}

```

## 2. LiveLock

Là một trạng thái xảy ra trong hệ thống đa luồng khi các luồng không thể tiến hành công việc của mình mặc dùng chúng không bị chặn(blocked). Trong livelock, các luồng liên tục tương tác với nhau mà không tiến hành công việc của mình , dẫn đến một trạng thái bị mắc kẹt vô hạn không tiến hành được công việc thực tế
