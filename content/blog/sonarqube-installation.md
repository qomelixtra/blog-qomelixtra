---
title: "Sonarqube Installation"
description: "This blog will tell you how to install sonarqube"
date: "2026-01-08"
language: "en"
category: "SonarQube"
---

## Docker comopose for sonarqube

create file name `docker-compose.yml` and pass this docker compose and run command

```bash
docker compous up -d
```

after run this command it will be pull image sonarqube and create container name sonarqube on port 9091

```bash
services:
 sonarqube:
   image: sonarqube:latest
   ports:
     - "9001:9000"
   environment:
     - SONARQUBE_JDBC_URL=jdbc:postgresql://sonar-postgresql:5432/sonar
     - SONARQUBE_JDBC_USERNAME=sonar
     - SONARQUBE_JDBC_PASSWORD=sonar@2023
   restart: always
   depends_on:
     - sonar-postgresql
   volumes:
     - sonarqube_conf:/opt/sonarqube/conf
     - sonarqube_data:/opt/sonarqube/data
     - sonarqube_extensions:/opt/sonarqube/extensions
     - sonarqube_bundled-plugins:/opt/sonarqube/lib/bundled-plugins
 sonar-postgresql:
   image: postgres:latest
   pull_policy: if_not_present
   environment:
   # default database probably: postgres
     - POSTGRES_USER=sonar
     - POSTGRES_PASSWORD=sonar@2023
   restart: always
   # ports:
  #   - 5432
   volumes:
     - postgresql_data:/var/lib/postgresql
volumes:
 sonarqube_conf:
 sonarqube_data:
 sonarqube_extensions:
 sonarqube_bundled-plugins:
 postgresql_data:
```
