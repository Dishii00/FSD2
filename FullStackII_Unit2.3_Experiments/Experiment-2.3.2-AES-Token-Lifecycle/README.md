# Experiment 2.3.2 - AES Encryption and Token Lifecycle

Aim: To implement encryption and secure storage mechanisms for protecting sensitive data and credentials.

Features: AES-GCM encryption, encrypted credential storage in H2, short-lived access tokens, long-lived refresh tokens, refresh-token validation and rotation.

Requirements: JDK 17+, Maven, VS Code/IntelliJ/Eclipse, Postman.

Run: `mvn spring-boot:run`
Server: `http://localhost:8086`
Open the server URL in a browser for an interactive page to try login, refresh-token rotation, and encrypted credential storage.
H2 Console: `http://localhost:8086/h2-console` | JDBC: `jdbc:h2:mem:securedb` | User: `sa` | Password: blank

Demo login: `user` / `user123`

1. POST `/auth/login` with `{ "username":"user", "password":"user123" }` -> access + refresh token.
2. POST `/auth/refresh` with `{ "refreshToken":"<TOKEN>" }` -> new token pair; old refresh token is rotated.
3. POST `/secure/store-credential?provider=Google&credential=my-oauth-secret` -> AES encrypted value is stored.
4. GET `/secure/read-credential?provider=Google` -> demonstrates decryption when needed.
