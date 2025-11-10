# Gestión de Seguros - Full-Stack: Spring Boot + Angular + Oracle SQL

## Descripción
Aplicación full-stack que permite a una aseguradora administrar sus operaciones principales: la venta de pólizas, el registro 
de reclamos por parte de los asegurados, y el seguimiento del estado de dichos 
reclamos.  .  

---

## Tecnologías
- **Backend**: Spring Boot 3.5.5 (Java 21)  
- **Frontend**: Angular 20.2.0  
- **Base de datos**: Oracle Database (compatible con 19c / 21c)

| Capa        | Tecnología                                      |
|-------------|-------------------------------------------------|
| Backend     | Spring Boot 3.5.5, Spring Data JPA, Spring Security, Maven |
| Frontend    | Angular 20.2.0, TypeScript 5.9.2, Angular Material, Bootstrap 5 |
| BD          | Oracle Database (JDBC ojdbc11)                  |
| Autenticación | JWT (JJWT 0.12.6)                             |
| Build       | Maven, npm                                      |

## Instalación

### 1. Base de datos
Descagar script de creación de tablas

git clone https://github.com/JDavOM26/UniversalesDataBase_proyecto

Ejecutar script de creación de tablas


### 2. Backend Spring Boot
#### Clonar el repositorio
git clone https://github.com/JDavOM26/UniversalesBackend_proyecto

#### Configurar application.properties

##### Edita src/main/resources/application.properties, agrega username y password con los que ejecutaste el script de la base de datos:

spring.application.name=Gestion de Seguros
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=username                   
spring.datasource.password=password           
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver       
spring.jpa.hibernate.ddl-auto=none          
spring.jpa.show-sql=true         
server.port=8585

### 3. Frontend Angular
Clonar el repositorio
git clone https://github.com/JDavOM26/UniversalesFrontend_proyecto

#### Instalar todas las dependencias del proyecto
desde la raíz: cd UniversalesFrontend_proyecto/gestionsegurosfrontend   
npm install

## Ejecución
### Orden de inicio recomendado
#### 1. Iniciar Oracle Database
Windows: Servicios → Iniciar OracleServiceXE   
#### 2. Iniciar backend Spring Boot
cd UniversalesBackend_proyecto/gestionseguros    
gestionseguros> mvn spring-boot:run      
El backend estará disponible en: http://localhost:8585
#### 3. Iniciar frontend Angular
cd UniversalesFrontend_proyecto/gestionsegurosfrontend        
ng serve             
El frontend estará disponible en: http://localhost:4200

## Autores
José David Oliva Muralles-Trabajo Inicial-JDavOM26

pendiente 