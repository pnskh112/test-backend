# WorkQuest

## 構成

### Frontend

- Vue 3.x
- TypeScript

### Backend

- Node.js 18.12.1
- Express 4.x
- TypeORM

### Database

- Postgresql 15.1

## Docker-compose での起動

1. `.env.example`を参考に `.env`を作成する

2. docker compose で起動する

```
docker compose up
```

## 起動方法(開発時)

### 共通

1. `.env.example`を参考に `.env`を作成する
2. `.env`と `/backend/.env` をシンボリックリンクしておく

### Frontend

```
npm ci

npm run build

npm run preview

```

または、docker で起動

root ディレクトリで、

```
docker compose build frontend

docker compose up frontend
```

### Backend

```
npm ci

npm run build

NODE_ENV=production node ./dist/index.js

```

DB の Migration

Backend のディレクトリで、

```
npm run migrate:run
```

を実行する

### Database

```
docker-compose up
```
