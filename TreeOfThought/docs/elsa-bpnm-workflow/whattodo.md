dựa vào elsa bpmn của .net tạo nghiệp vụ elsa-bpnm-workflow với full tính năng của elsa, để truy cập vào elsa cần vào url path /bpnm-workflow
    cung cấp các node, trigger, activity đầy đủ của elsa, hỗ trợ kết nối với các hệ thống như redis, mongodb, kafka, postgresql, rabbitmq, ... đầy đủ
    để truy cập vào bpnm-workflow cần qua login authentication, sử dụng auth hệ thống sẵn có vd xem business-oidc
    bpnm-workflow này hỗ trợ việc deploy container distributed và db dùng postgresql, redis  
    dùng sẵn UI elsa đã được MS phát triển, nhưng có thể chỉnh sửa giao diện nếu cần
        cần cả UI kéo thả tạo workflow, dashboard, user task , approve ui, ui admin ...
        vd angular dùng : npm install @elsa-workflows/elsa-workflows-studio

để triển khai xem kỹ https://www.elsaworkflows.io/get-started/elsa-server-and-studio và dùng vào solution Scaffold with .NET Templates 
    db dùng postgreqsql, redis 