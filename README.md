# **Proshop**

## **Project Overview**

Proshop is an E-commerce microservice app where uses can view a listing of Proshop inventory and purchase products from that inventory.

### Key Features

> - Register a new user.
> - Admins can add, edit and delete products
> - Customers can by products securely through stripe checkout process.
> - Customers can rate an product.

### Architecture

Proshop is powered by serveral services running in a Kubernetes cluster. Proshop uses an event driven microservices architecture, and make use of Message queues to
ensure communication between services. In order to route requests to the appropriate service, Proshop uses an NGINX reverse proxy, with the help of the Kubernetes Ingress-nginx controller.

### **Services Details**

#### **_Front end service_**

- Client service (React app).

#### **_Back end services_**

- [Auth service](https://github.com/guillsav/proshop-microservice/tree/main/auth) manages users resources (NodeJS Express).
- [Products service](https://github.com/guillsav/proshop-microservice/tree/main/products) manages product resources (NodeJS Express).
- [Orders service](https://github.com/guillsav/proshop-microservice/tree/main/orders) manages orders resources (NodeJS Express).
- [Payments service](https://github.com/guillsav/proshop-microservice/tree/main/payments) handles and process payments resources (NodeJS Express).

#### Database services

- Auth 1 collection Users (MongoDB).
- Products 2 collections Products and Reviews (MongoDB).
- Orders 2 collections Orders and Products (MongoDB).
- Payments 2 collections Orders, Payments (MongoDB).

#### Communication service

- RabbitMQ message broker (Cloud AMQP and amqlib).

## **Tech Stack**

Backend services were built using:

#### _Express_

- To create the server and the Api for each services.

#### _jsonwebtoken_

- To generate JWT token for authentication purposes.

#### _Yup_

- To Handle input validation.

#### _Mongoose_

- ODM for MongoDB database.

### _RabbitMQ_

- To ensure communication between backend services, using the Pub/Sub approach.

## **APIs**

### **_Stripe_**

Handles secure payment from customers after an order is placed and received by the payment services.

## **Environment Variables and Kubernetes Secrets**

In order for the app to function correctly, Kubernetes secrets must be provided to the kubernetes cluster. Run the command below and replace `<SECRET>` with your own values.

```
<!-- long string used to validate token from the jsonwebtoken library -->
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET>

<!-- RabbitMQ url provided by creating an account to Cloud AMQP -->
$ kubectl create secret generic rabbitmq-url --from-literal=RABBITMQ_URL=<SECRET>

```

Other environment variables needed like the mongoDB url are provided in the deployments files found in the `./infra/k8s` directory.

## **How to run the app**

1. Either fork or download the app and open the folder in the terminal.
2. Install all dependencies for each services, by going into services folder using the `yarn install` command.
3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and enable Kubernetes.
4. Install [Ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop) by running the command below.

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/cloud/deploy.yaml
```

5. Open and edit your host file by running the command below:

- On Mac

```
code /etc/hosts
```

- On Windows

```
code C:\Windows\System32\Drivers\etc\hosts
```

Then paste the following at the bottom: **`127.0.0.1 proshop.dev`**

6. Install Skaffold by following the instructions at `skaffold.dev/docs/install/`

7. Once Skaffold is installed. In the proshop-microservices folder run the command `skaffold dev`

8. Open your browser to https://proshop.dev:3000 and type anywhere on the screen
   `thisisunsafe` to bypass your browser ssl protection on the page. You should now see the Proshop client service up and running.
