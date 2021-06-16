# **Proshop**

## **Project Overview**

Proshop is an e-commerce app where users can view a listing of Proshop inventory and purchase products from that inventory. Proshop uses an event driven microservices architecture and makes use of messaging queues to
ensure communication between services.

### Key Features

> - Register a new user.
> - Admins can add, edit, and delete products
> - Customers can buy products securely through stripe checkout process.
> - Customers can rate a product.

## **Architecture**

Proshop is powered by several services running in a Kubernetes cluster. All backend services are built with NodeJS Express and sits behind a NGINX reverse proxy service in order to route requests to the appropriate backend service (API). The reverse proxy makes use of the Kubernetes Ingress Controller. See the config file for the reverse proxy at `infra/k8s/ingress-srv.yaml` for more details.

![alt text](https://github.com/guillsav/proshop-microservice/blob/main/screenshots/Screen%20Shot%202021-06-15%20at%2012.22.21%20PM.png)

### **Services Details**

#### **_Front End Service_**

- Client service (React app)

#### **_Back End Services (NodeJS Express)_**

- [Auth service](https://github.com/guillsav/proshop-microservice/tree/main/auth) manages users resources.
- [Products service](https://github.com/guillsav/proshop-microservice/tree/main/products) manages product resources.
- [Orders service](https://github.com/guillsav/proshop-microservice/tree/main/orders) manages orders resources.
- [Payments service](https://github.com/guillsav/proshop-microservice/tree/main/payments) handles and processes payments resources.

#### Database Services (MongoDB)

- Auth database with 1 collection for Users.
- Products database with 2 collections for Products and Reviews.
- Orders database with 2 collections for Orders and Products.
- Payments database with 2 collections for Orders and Payments.

#### Communication Service

- RabbitMQ message broker (Cloud AMQP and amqlib) enables communication between services.

## **Tech Stack**

Backend services were built using:

#### _Express_

- To create the server and the Api for each service.

#### _jsonwebtoken_

- To generate JWT token for authentication purposes.

#### _Yup_

- To handle input validation coming from the front end.

#### _Mongoose_

- The object data model (ODM) to manipulate data from the MongoDB database.

#### _RabbitMQ_

- To ensure communication between backend services, using the `Pub/Sub` approach.

### **Third Party APIs**

#### _Stripe_

- To handle secure payments from customers after an order is placed and received through the payments service.

## **How to Run the App**

In order to run the app locally, perform the following steps.

1. Either fork or download the app and open the folder in the terminal.

2. Install all dependencies for each service by going into each service's folder using the `yarn install` command.

For the app to run correctly, a few things are needed: Docker, a Kubernetes cluster, and Kubernetes secrets.

Installing Docker and creating a Kubernetes cluster is simple since Docker Desktop comes with everything right out of the box.

3. Download and Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and enable Kubernetes in the preference panel.

4. Install [Ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop) by running the command below.

```console
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/cloud/deploy.yaml
```

5. Open and edit your machine's host file by running the command below:

- On Mac

```console
<!-- If you use VS code -->
$ code /etc/hosts

<!-- Otherwise -->
$ cd /etc/hosts

```

- On Windows

```console
<!-- If you use VS code -->
$ code C:\Windows\System32\Drivers\etc\hosts

<!-- Otherwise -->
$ cd C:\Windows\System32\Drivers\etc\hosts
```

Then, paste the following at the bottom of the file: `127.0.0.1 proshop.dev`

6. Download and install Skaffold by following the instructions at: `skaffold.dev/docs/install/`

7. Once Skaffold is installed in the proshop-microservices root folder, run the command `skaffold dev` in the command line.

8. Open your browser to https://proshop.dev:3000 and type `thisisunsafe` anywhere on your screen to bypass your browser ssl protection on the page. You should now see the Proshop client service up and running.

## **Environment Variables and Kubernetes Secrets**

Kubernetes secrets (like Stripe api_key, Cloud AMQP url, etc...) must be provided to the Kubernetes cluster to avoid runtime errors. Run the commands below and replace `<SECRET>` with your own values coming from your own stripe account or Cloud AMQP account, etc...

```console
<!-- Long string used to validate token from the jsonwebtoken library. You can use a password generator like lastPass to generate this string -->
$ kubectl create secret generic jwt-secret --from-literal JWT_KEY=<SECRET>

<!-- RabbitMQ url provided by creating an account in Cloud AMQP -->
$ kubectl create secret generic rabbitmq-url --from-literal RABBITMQ_URL=<SECRET>

<!-- Stripe api key provided by Stripe.com -->
$ kubectl create secret generic stripe-key --from-literal STRIPE_KEY=<SECRET>

```

Other environment variables needed, like the MongoDB url, are provided in the deployments files found in the `./infra/k8s` directory.
