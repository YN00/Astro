# Node.js 이미지 사용
FROM node:22-bullseye as first

# 작업 디렉토리 설정
WORKDIR /workspace

# 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    git \
    curl \
    npm \
    && rm -rf /var/lib/apt/lists/* \

FROM first as second

RUN npm i -g npm & npm i -g pnpm

# 포트 노출
#EXPOSE 5005

# 기본 명령어
CMD ["pnpm", "dev"]
