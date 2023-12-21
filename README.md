[![NestJs][nestjs-shield]][ref-nestjs]
[![NodeJs][nodejs-shield]][ref-nodejs]
[![Typescript][typescript-shield]][ref-typescript]
[![MongoDB][mongodb-shield]][ref-mongodb]
[![JWT][jwt-shield]][ref-jwt]
[![Jest][jest-shield]][ref-jest]
[![Yarn][yarn-shield]][ref-yarn]
[![Docker][docker-shield]][ref-docker]

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
- Google sign single on( Google SSO)
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

[ack-contributors-shield]: https://img.shields.io/github/contributors/andrechristikan/ack-nestjs-boilerplate?style=for-the-badge
[ack-forks-shield]: https://img.shields.io/github/forks/andrechristikan/ack-nestjs-boilerplate?style=for-the-badge
[ack-stars-shield]: https://img.shields.io/github/stars/andrechristikan/ack-nestjs-boilerplate?style=for-the-badge
[ack-issues-shield]: https://img.shields.io/github/issues/andrechristikan/ack-nestjs-boilerplate?style=for-the-badge
[ack-license-shield]: https://img.shields.io/github/license/andrechristikan/ack-nestjs-boilerplate?style=for-the-badge
[nestjs-shield]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[nodejs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[typescript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[mongodb-shield]: https://img.shields.io/badge/MongoDB-white?style=for-the-badge&logo=mongodb&logoColor=4EA94B
[jwt-shield]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white
[jest-shield]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[yarn-shield]: https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white
[docker-shield]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[github-shield]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white

<!-- CONTACTS -->

[author-linkedin]: https://linkedin.com/in/andrechristikan
[author-email]: mailto:ack@baibay.id
[author-github]: https://github.com/andrechristikan

<!-- Repo LINKS -->

[ack-issues]: https://github.com/andrechristikan/ack-nestjs-boilerplate/issues
[ack-stars]: https://github.com/andrechristikan/ack-nestjs-boilerplate/stargazers
[ack-forks]: https://github.com/andrechristikan/ack-nestjs-boilerplate/network/members
[ack-contributors]: https://github.com/andrechristikan/ack-nestjs-boilerplate/graphs/contributors

<!-- Other Repo Links -->

[ack]: https://github.com/andrechristikan/ack-nestjs-boilerplate
[ack-typeorm]: https://github.com/andrechristikan/nestjs-boilerplate-typeorm
[ack-kafka]: https://github.com/andrechristikan/ack-nestjs-boilerplate-kafka

<!-- license -->

[license]: LICENSE.md

<!-- documentation -->

[documentation]: docs/README.md

<!-- Reference -->

[ref-nestjs]: http://nestjs.com
[ref-mongoose]: https://mongoosejs.com
[ref-mongodb]: https://docs.mongodb.com/
[ref-nodejs]: https://nodejs.org/
[ref-typescript]: https://www.typescriptlang.org/
[ref-docker]: https://docs.docker.com
[ref-dockercompose]: https://docs.docker.com/compose/
[ref-yarn]: https://yarnpkg.com
[ref-12factor]: https://12factor.net
[ref-nestjscommand]: https://gitlab.com/aa900031/nestjs-command
[ref-jwt]: https://jwt.io
[ref-jest]: https://jestjs.io/docs/getting-started
[ref-git]: https://git-scm.com
