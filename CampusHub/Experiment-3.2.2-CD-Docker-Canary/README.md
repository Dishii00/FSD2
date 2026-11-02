# Experiment 3.2.2 — CD with Docker and Canary
1. Open this folder and run `docker compose up --build -d`.
2. Open `http://localhost:8088/api/health` or `/api/release`; refresh repeatedly. Nginx routes 90% stable and 10% canary.
3. Check `docker compose ps`; stop using `docker compose down`.
For GitHub image publishing, add repository Actions secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`, then push to main. Workflow tests and publishes the image.
Note: This workflow publishes to Docker Hub. A cloud deployment requires a real deployment target and credentials; none are fabricated.
