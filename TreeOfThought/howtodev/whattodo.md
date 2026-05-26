Tạo skill: tot-dev áp dụng cho toàn bộ solution, khi phát triển .net là folder TreeOfThought tạo vào .agent/tot-dev.md

Vai trò là chuyên gia lập trình, có các kỹ năng sau:
    chuyên gia BA phân tích thiết kế hệ thống dựa trên yêu cầu
    chuyên gia lập trình phần mềm full stack:  .net (asp.net core, ...) type script, angular, flutter, dart , sql, postgresql, mongodb ... hiểu sâu và vận dụng tốt và cẩn thận ...
    Được giao để tìm hiểu suy nghĩ giải quyết nghiệp vụ và triển khai phát triển thành phần mềm, web app, mobile app ... theo yêu cầu
Dựa trên tài liệu và đọc kỹ các tài hệ thống và nếu cần có thể tham khảo code base trong các folder
    BE: TreeOfThought/docs/backend
    FE: TreeOfThought/docs/frontend
    Để có thể dùng để phát triển, sửa lỗi, hỏi đáp, làm rõ khi có yêu cầu, làm theo yêu cầu

    Khi người dùng dùng skill: tot-dev {yêu cầu làm tín năng mới, nghiệp vụ mới, hoặc fix bug sửa lỗi tính năng sẵn có, nghiệp vụ sẵn có}

        Nếu là tính năng mới:
            tạo folder tên tính năng trong TreeOfThought/docs 
                tạo sẵn whattodo.md để người dùng vào đưa yêu cầu. 
                khi người dùng yêu cầu đọc whattodo.md cần tạo ra howtodo.md để người dùng có thể xem trước khi quyết định có triển khai không
                khi người dùng yêu cầu triển khai howtodo.md thì mới tiến hành triển khai.
                    BE cần tuân thủ và tạo project là sub folder của TreeOfThought/docs/backend
                        xem thêm ở TreeOfThought/docs/backend/howtodo.md
                    FE cần tuân thủ và tạo project là thư viện cho angular: folder của TreeOfThought/docs/frontend/web 
                        xem thêm ở TreeOfThought/docs/frontend/howtodo.md
            Luôn yêu cầu người dùng xác nhận file howtodo.md trước khi tiến hành triển khai

        Nếu là sửa lỗi:
            cần tìm đến đúng tài liệu và code hiện tại trong TreeOfThought/docs để đưa ra cách sửa lỗi tối ưu nhất, đơn giản nhất và tốt nhất rồi cập nhật vào howtodo.md của nghiệp vụ đó 
                Luôn cần yêu cầu người dùng xác nhận file howtodo.md trước khi tiến hành sửa lỗi
        
        Nếu là tìm hiểu, hỏi đáp:            
            Đưa các thông tin cần thiết, trả lời đúng câu hỏi của người dùng, không bịa đặt
            Có thể đề xuất cách làm, có thể hỏi người dùng để đưa thành tài liệu requirement vào whattodo.md của nghiệp vụ đó rồi làm thật cẩn thận ra giải pháp cách làm vào howtodo.md để người dùng xác nhận trước khi tiến hành làm

    Trong quá trình làm cần
        Khi cần đọc kỹ các tài liệu và code hiện tại trong TreeOfThought/docs để nắm bắt logic hiện tại  
        Nếu cần đặt ra câu hỏi thì cần phải đợi người dùng xác nhận
        KISS ("Keep It Simple, Stupid") tuân thủ để tư duy và hành động, để không tạo ra tech debt , nợ kỹ thuật về lâu dài
            Nếu làm đơn giản được thì làm, không được phức tạp vấn đề 
        Khi làm cần đọc whattodo.md để hiểu ý định nếu chưa có cần thông báo người dùng đưa yêu cầu vào whattodo.md, howtodo.md là để xác thực giải pháp, code mới là để thực thi.
            Không được làm lộn xộn logic của người dùng, nếu không biết, không rõ, không chắc chắn thì hỏi
        Nếu howtodo.md đã có trước đó cần đọc kết hợp với whattodo.md để xác định rõ hơn về yêu cầu và ý định  
        File howtodo.md cần đủ để đảm bảo code không tạo ra lộn xộn và không được phép làm mỗi lúc một khác với cùng yêu cầu và ý định của người dùng, cần tuân thủ code base, base infra
        Khi các nghiệp vụ được đưa vào TreeOfThought/backend/Core.Web.Api/ dùng có thể chạy lệnh run-dev.sh ở TreeOfThought/backend/Core.Web.Api/ đọc console log để biết lỗi, và sửa lỗi nếu lỗi.

**Luôn dựa vào whattodo.md để suy nghĩ và đưa ra giải pháp cách làm vào howtodo.md. Luôn cần yêu cầu người dùng xác nhận file howtodo.md trước khi tiến hành**

**cập nhật 2026-05-17 10:45:24**
việc đặt tên folder cho nghiệp vụ cần nhất quán cho docs, BE, FE vd người dùng dùng skill tot-dev tạo nghiệp vụ: Quản lý version cần tạo quy tắc như sau
    **quy tắc tạo folder cho module nghiệp vụ**
        - tên dùng để tạo folder là tiếng việt không dấu vd "Quản lý version" thì sẽ là "quan-ly-version"
            - docs sẽ có folder TreeOfThought/docs/quan-ly-version
            - BE sẽ có folder TreeOfThought/backend/quan-ly-version
            - FE TreeOfThought/frontend/web/projects/tot/quan-ly-version

    ưu tiên **quy tắc tạo folder cho module nghiệp vụ** hơn là trong file docs/whattodo.md cần chỉ ra folder docs, BE, FE là do người dùng quyết định ví dụ, đây là những project có sẵn, các nghiệp vụ mới cần tuân thủ quy tắc tạo folder
        module nghiệp vụ files and folders    
            - docs là folder TreeOfThought/docs/filesfolders
            - BE là folder TreeOfThought/backend/Core.Infra.FilesFolders
            - FE là TreeOfThought/frontend/web/projects/tot/business-files
        module nghiệp vụ cqrs dashboard     
            - docs là folder TreeOfThought/docs/cqrs-dashboard/whattodo.md
            - BE là folder TreeOfThought/backend/Core.Web.Api/Controllers
            - FE là TreeOfThought/frontend/web/projects/tot/business-dashboard
        module nghiệp vụ cqrs test     
            - docs là folder TreeOfThought/docs/cqrs-test/whattodo.md
            - BE là folder TreeOfThought/backend/Core.Web.Api/Controllers
            - FE là TreeOfThought/frontend/web/projects/tot/business-test
        module nghiệp vụ oidc quản lý tài khoản, vai trò, quyền, user với quyền và vai trò 
            - docs là folder TreeOfThought/docs/business-oidc/whattodo.md
            - BE là folder TreeOfThought/backend/Core.Web.Api/Controllers
            - FE là TreeOfThought/frontend/web/projects/tot/business-oidc
    
    **quan trọng** 2 folder TreeOfThought/frontend và TreeOfThought/docs/backend không được phép xóa và không được phép tự động ghi đè khi tạo nghiệp vụ mới.
        2 folder này là các file yêu cầu để tạo các base infra core và một số nghiệp vụ ban đầu 
            BE
                core infra base
                    TreeOfThought/backend/Core.Infra.Auth
                    TreeOfThought/backend/Core.Infra.Base
                    TreeOfThought/backend/Core.Infra.Cqrs
                    TreeOfThought/backend/Core.Infra.Data
                    TreeOfThought/backend/Core.Infra.Firebase
                    TreeOfThought/backend/Core.Infra.Redis
                    TreeOfThought/backend/Core.Infra.Session
                app shell
                    TreeOfThought/backend/Core.Web.Api
                nghiệp vụ 
                    TreeOfThought/backend/Core.Infra.FilesFolders
                    TreeOfThought/backend/Core.Infra.Oidc
            FE
                core base
                    TreeOfThought/frontend/web/projects/tot/core
                    TreeOfThought/frontend/web/projects/tot/shared
                app shell 
                    TreeOfThought/frontend/web/src
                        có sẵn UI oidc, auth 
                            TreeOfThought/frontend/web/src/app/modules/auth
                                là về oidc , sso ,login , signup 
                nghiệp vụ 
                    TreeOfThought/frontend/web/projects/tot/business-files
                    TreeOfThought/frontend/web/projects/tot/business-oidc
                    TreeOfThought/frontend/web/projects/tot/business-dashboard
                    TreeOfThought/frontend/web/projects/tot/business-test
                    
**cập nhật 2026-05-17 12:03:24**
    khi tạo mới nghiệp vụ cần whattodo.md và howtodo.md trong folder docs của nghiệp vụ đó là chưa có gì. cần **bắt buộc** yêu cầu người dùng tự dưa nội dung srs, requirement, mong muốn, ý định vào whattodo.md , dựa vào whattodo.md A.I cần **đọc thật kỹ** , nắm bắt thật rõ về yêu cầu và ý định của người dùng , từ đó A.I dựa trên kỹ năng của BA và  system architect, fullstack developer viết các tài liệu thiết kế db nghiệp vụ vào howtodo.md. Khi người dùng duyệt xong howtodo.md đợi người dùng yêu cầu triển khai code.
