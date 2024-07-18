# S3 OBS Library

Library for integrating with S3-compatible object storage using version 3 of the AWS SDK API.

## Configuration

1. **Create the `.env` file at the root of the project with the following content**:

    ```env
    S3_BUCKET=storage
    REGION=us-east-1
    ACCESS_KEY_ID=
    SECRET_ACCESS_KEY=
    S3_BUCKET_URL=https://obs.sa-argentina-1.myhuaweicloud.com
    ```

2. **Install the dependencies**:

    ```sh
    npm install
    ```

3. **Build the project**:

    ```sh
    npm run build
    ```

4. **Run the application**:

    ```sh
    npm start
    ```

5. **For development, you can run the following command to see changes in real-time**:

    ```sh
    npm run start:dev
    ```

## Project Structure

- **src/config.ts**: Loads the configuration from `config.json`.
- **src
