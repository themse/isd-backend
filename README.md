# Imaginary Sales Department (ISD) - Backend

A service that provides you with an easy way to manage potential ***Leads*** and their respective ***Interests***.

## Running this project locally

- Install all dependencies:
```bash
 $ npm i
```
- Install ***serverless*** tool globally or use ***npx***
```bash
 $ npm i -g serverless
```
or
```bash
 $ npx serverless
```
- Install DynamoDB
```bash
$ npx sls dynamodb install
```
## Start working with API

- Start application in offline mode:
```bash
$ npm run start:dev
```
- Also we can invoke a single function:
```bash
$ npm run invoke:local -- -f <functionName>
```  
- We can run function in debug mode to see additional logs
```bash
$ npm run invoke:local:debug -- -f <functionName>
```  
Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

## Remotely
We can use Postman or Insomnia to test api (in future it will be swagger).
### Basic requests:
- Create a lead
```bash
curl --location --request POST 'http://localhost:4500/dev/lead' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"isd@example.com",
    "phone":"(012) 2345 6789",
    "firstName":"Jack",
    "lastName":"Russel"
}'
```
- Add lead interest (we can get ***leadId*** from the previous request)
```bash
curl --location --request POST 'http://localhost:4500/dev/interest' \
--header 'Content-Type: application/json' \
--data-raw '{
    "leadId": "eab29a17-4f5d-4285-9c71-ed78a7d833b1",
    "message": "hello world"
}'
```
- Find all leads with their interests
```bash
curl --location --request GET 'http://localhost:4500/dev/leads' \
--header 'Content-Type: application/json' 
```  
## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `common` - containing common features for the entire project
- `functions` - containing code base and configuration for your lambda functions
- `middlewares` - containing middleware list for each lambda function
- `models` - containing your business models
- `services` - containing abstractions for external services
- `utils` - containing tools and helpers

## Tech stack

Here's a brief high-level overview of the tech stack the ISD App uses:

- [Node.js v.14.17.6](https://nodejs.org/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Serverless v.2.70.0](https://www.serverless.com/) - framework for the creation and management of the Serverless infrastructure
- [AWS Cloud Provider](https://aws.amazon.com/) - cloud provider with more than 100 products.
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/) - Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale.
- [Typescript](https://www.typescriptlang.org/) - is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Deployment

Firstly check if you authorized in aws console.
- Deploy the whole application to the cloud:
```bash
$ npx run deploy:all
```
- Deploy a single function
```bash
$ npx run deploy:function -- -f <functionName>
```
- For more details
```bash
$ npx run deploy:function -- --help
```
## Future steps
- Swagger 
- Unit and e2e tests
- Authorization
