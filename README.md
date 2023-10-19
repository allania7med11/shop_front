# Shoppingify Website

This repository contains the front end for the Shoppingify website, an e-commerce platform.

## Contributors
- Allani Ahmed <allania7med11@gmail.com>

## License & Copyright
© Allani Ahmed, Full Stack Web Developer

## Project Links
- **Back End Repository**: [https://github.com/allania7med11/shop_back/](https://github.com/allania7med11/shop_back/)
- **Deployment**: [https://shop.effectivewebapp.com/](https://shop.effectivewebapp.com/)

## Environment Configuration

This section provides information about the environment configuration for this project.

### Environment Variables

This project uses a `.env` file to configure its environment. You can create a `.env` file in the project root directory and set the following environment variables:

- `ENVIRONMENT`: Specifies the current environment (e.g., 'debug', 'dev', 'prod').
- `PORT`: Defines the port on which the application will listen.

Make sure to update these values to match your specific environment configuration. You can check `.env.example` for reference.

## Running the Project

To run the project using Docker Compose, follow these steps:

1. **Clone the Repository**: If you haven't already, clone the project repository to your local machine:

    ```shell
    git clone https://github.com/allania7med11/shop_back/
    cd shop_back
    ```

2. **Environment Configuration**: Create a `.env` file with the necessary environment variables. You can use the provided `.env.example` as a template. Make sure to update the values to match your specific environment configuration.

    ```shell
    cp .env.example .env
    ```

3. **Build and Start Containers**: Run the following command to build and start the Docker containers using Docker Compose:

    ```shell
    docker-compose up -d
    ```

    The `-d` flag runs the containers in the background.

4. **Access the Application**: Once the containers are up and running, you can access the application in your web browser or by making API requests, depending on your project.

5. **Stopping the Containers**: To stop the containers when you're done, you can use the following command:

    ```shell
    docker-compose down
    ```

    This will stop and remove the containers.

Please note that these instructions assume you have Docker and Docker Compose installed on your machine. If not, make sure to install them before running the project.