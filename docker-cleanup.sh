#!/bin/bash
# Dọn dẹp build cache, image dangling và volume không sử dụng
docker builder prune -a -f
docker image prune -f
# docker volume prune -f

# Ghi log để theo dõi (Tùy chọn)
echo "Docker cleanup executed at $(date)" >> ~/scripts/docker-cleanup.log

# chmod +x ~/scripts/docker-cleanup.sh
# sudo crontab -e
# # m h  dom mon dow   command 
# 0 12 * * 1 /home/your_username/scripts/docker-cleanup.sh # 12 giờ trưa thứ 2 hàng tuần 
# /work/cronjobs/docker-cleanup.sh
# 0 12 * * 1 /work/cronjobs/docker-cleanup.sh # 12 giờ trưa thứ 2 hàng tuần 