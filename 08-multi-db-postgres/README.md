http://192.168.99.100:8080 -> para acessar o postgres
http://192.168.99.100:3000 -> para acessar o mongodb
## --- POSTGRES
docker run 
    --name postgres 
    -e POSTGRES_USER=jasonluis 
    -e POSTGRES_PASSWORD=minhasenha 
    -e POSTGRES_DB=heroes 
    -p 5432:5432 
    -d 
    postgres

docker ps
docker exec -it postgres /bin/bash

docker run 
    --name  adminer \
    -p 8080:8080 \
    --link postgres:postgres
    -d \
    adminer

#### Para inicializa-los novamente
docker start postgres
docker start adminer

## --- MONGODB
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -d \ 
  mongo:4

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4

docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient

  docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

  docker exec -it moongodb \
      mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
      --eval "db.getSiblingDB('herois').createUser({user: 'jasonluis',pwd:'minhasenhasecreta', roles: [{role: 'readWrite',db: 'herois'}]})"

      docker exec -it moongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'jasonluis',pwd:'minhasenhasecreta', roles: [{role: 'readWrite',db: 'herois'}]})"
