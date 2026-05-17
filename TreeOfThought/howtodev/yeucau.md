Tạo skil: tot-dev áp dụng cho toàn bộ solution, khi phát triển .net là folder TreeOfThought

Vai trò là chuyên gia lập trình, có các kỹ năng sau:
    chuyên gia BA phân tích thiết kế hệ thống dựa trên yêu cầu 
    chuyên gia lập trình phần mềm full stack:  .net (asp.net core, ...) type script, angular, flutter, dart , sql, postgresql, mongodb ... hiểu sâu và vận dụng tốt và cẩn thận ... 
Dựa trên tài liệu và đọc kỹ các tài hệ thống và nếu cần có thể tham khảo code base trong các folder
    BE: TreeOfThought/docs/backend
    FE: TreeOfThought/docs/frontend
    Để có thể dùng để phát triển, sửa lỗi, hỏi đáp, làm rõ khi có yêu cầu, làm theo yêu cầu 

    Khi người dùng dùng skill: tot-dev {yêu cầu làm tín năng mới, nghiệp vụ mới, hoặc fix bug sửa lỗi tính năng sẵn có, nghiệp vụ sẵn có}

        Nếu là tính năng mới:
            tạo folder tên tính năng trong TreeOfThought/docs 
                tạo sẵn yeucau.md để người dùng vào đưa yêu cầu. 
                khi người dùng yêu cầu đọc yeucau.md cần tạo ra phattrien.md để người dùng có thể xem trước khi quyết định có triển khai không
                khi người dùng yêu cầu triển khai phattrien.md thì mới tiến hành triển khai.
                    BE cần tuân thủ và tạo project là sub folder của TreeOfThought/docs/backend
                        xem thêm ở TreeOfThought/docs/backend/phattrien.md
                    FE cần tuân thủ và tạo project là thư viện cho angular: folder của TreeOfThought/docs/frontend/web 
                        xem thêm ở TreeOfThought/docs/frontend/phattrien.md
            Luôn yêu cầu người dùng xác nhận file phattrien.md trước khi tiến hành triển khai

        Nếu là sửa lỗi:
            cần tìm đến đúng tài liệu và code hiện tại trong TreeOfThought/docs để đưa ra cách sửa lỗi tối ưu nhất, đơn giản nhất và tốt nhất rồi cập nhật vào phattrien.md của nghiệp vụ đó 
                Luôn cần yêu cầu người dùng xác nhận file phattrien.md trước khi tiến hành sửa lỗi
        
        Nếu là tìm hiểu, hỏi đáp:            
            Đưa các thông tin cần thiết, trả lời đúng câu hỏi của người dùng, không bịa đặt
            Có thể đề xuất cách làm, có thể hỏi người dùng để đưa thành tài liệu requirement vào yeucau.md của nghiệp vụ đó rồi làm thật cẩn thận ra giải pháp cách làm vào phattrien.md để người dùng xác nhận trước khi tiến hành làm

    Trong quá trình làm cần
        Khi cần đọc kỹ các tài liệu và code hiện tại trong TreeOfThought/docs để nắm bắt logic hiện tại  
        Nếu cần đặt ra câu hỏi thì cần phải đợi người dùng xác nhận
        KISS ("Keep It Simple, Stupid") tuân thủ để tư duy và hành động, để không tạo ra tech debt , nợ kỹ thuật về lâu dài
            Nếu làm đơn giản được thì làm, không được phức tạp vấn đề 
        Khi làm cần đọc yeucau.md để hiểu ý định nếu chưa có cần thông báo người dùng đưa yêu cầu vào yeucau.md, phattrien.md là để xác thực giải pháp, code mới là để thực thi.
            Không được làm lộn xộn logic của người dùng, nếu không biết, không rõ, không chắc chắn thì hỏi
        Nếu phattrien.md đã có trước đó cần đọc kết hợp với yeucau.md để xác định rõ hơn về yêu cầu và ý định  
        File phattrien.md cần đủ để đảm bảo code không tạo ra lộn xộn và không được phép làm mỗi lúc một khác với cùng yêu cầu và ý định của người dùng, cần tuân thủ code base, base infra
        Khi các nghiệp vụ được đưa vào TreeOfThought/backend/Core.Web.Api/ dùng có thể chạy lệnh run-dev.sh ở TreeOfThought/backend/Core.Web.Api/ đọc console log để biết lỗi, và sửa lỗi nếu lỗi.

**Luôn dựa vào yeucau.md để suy nghĩ và đưa ra giải pháp cách làm vào phattrien.md. Luôn cần yêu cầu người dùng xác nhận file phattrien.md trước khi tiến hành**

**cập nhật 2026-05-17 10:45:24**
việc đặt tên folder cho nghiệp vụ cần nhất quán cho docs, BE, FE vd người dùng dùng skill tot-dev tạo nghiệp vụ: Quản lý version cần tạo quy tắc như sau
    **quy tắc tạo folder cho module nghiệp vụ**
        - tên dùng để tạo folder là tiếng việt không dấu vd "Quản lý version" thì sẽ là "quan-ly-version"
            - docs sẽ có folder TreeOfThought/docs/quan-ly-version
            - BE sẽ có folder TreeOfThought/backend/quan-ly-version
            - FE TreeOfThought/frontend/web/projects/tot/quan-ly-version

    ưu tiên **quy tắc tạo folder cho module nghiệp vụ** hơn là trong file docs/yeucau.md cần chỉ ra folder docs, BE, FE là do người dùng quyết định ví dụ, đây là những project có sẵn, các nghiệp vụ mới cần tuân thủ quy tắc tạo folder
        module nghiệp vụ files and folders    
            - docs là folder TreeOfThought/docs/filesfolders
            - BE là folder TreeOfThought/backend/Core.Infra.FilesFolders
            - FE là TreeOfThought/frontend/web/projects/tot/business-files
        module nghiệp vụ cqrs dashboard     
            - docs là folder TreeOfThought/docs/cqrs-dashboard/yeucau.md
            - BE là folder TreeOfThought/backend/Core.Web.Api/Controllers
            - FE là TreeOfThought/frontend/web/projects/tot/business-dashboard
        module nghiệp vụ cqrs test     
            - docs là folder TreeOfThought/docs/cqrs-test/yeucau.md
            - BE là folder TreeOfThought/backend/Core.Web.Api/Controllers
            - FE là TreeOfThought/frontend/web/projects/tot/business-test
        module nghiệp vụ cqrs oidc     
            - docs là folder TreeOfThought/docs/business-oidc/yeucau.md
            - BE là folder TreeOfThought/backend/Core.Web.Api/Controllers
            - FE là TreeOfThought/frontend/web/projects/tot/business-oidc
