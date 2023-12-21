# Shopee Api - Ecommerce App

This repository contains the source code and documentation for the Shopee App application. The Shopee app allows users to buy and manage their products. It is built using NestJS and follows a Command Query Responsibility Segregation design pattern.

## Tech Stack

The Shopee app is built using the following technologies:
- NestJS
- Mongodb
- Mongoose
- Redis
- TypeScript
- Microservices with Kafka
- Json Web Token(JWT)
- S3, SES AWS
- Swagger
- Docker & Docker Compose

## Architecture

The shopee app follows a NestJS monorepo architecture and follows a Command Query Responsibility Segregation design pattern.It consists of the following microservices:

1. **Apigate way Service** - Serves as the API gateway for the application.
2. **Indentity** - Providers user authentication and manage ApiKey such as login or create apikey....
3. **User service** - Providers user registration or update info user.
4. **Role service** - Role based access controll with @casl/ability.
5. **Seller channel service** - Provider seller manage product.
6. **Product service** - Use cqrs and DDD to create category.
   !!Update ....
   
## System Design By Luan Truong

![systemdesign](https://github.com/LuanTruongPTIT/Shopee_API-MSA-NestJS/assets/107544734/1a20094d-57e7-45fb-874f-532be02dd7b1)
