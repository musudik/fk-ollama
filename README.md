```
npm install
npm run dev
```

```
open http://localhost:3000
```

#Development
npm run start:dev
#Production
npm run start:prod

#Docker
docker build -t fk-ollama:dev .
docker run -p 3002:3002 fk-ollama:dev

#docker-compose
docker-compose up -d --build
docker-compose down