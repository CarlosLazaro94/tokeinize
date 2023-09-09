# culqi

Project tokenization card.

## Tabla de Contenidos

- [Requirements](#requirements)
- [Installation](#installation)
- [Use](#use)
- [Considerations](#considerations)

## Requirements
 
    - docker-desktop
    - docker-compose
    - node v18+
    - tsc  5+
    - serverless 3+
    - Account Aws (SECRET KEY, KEY)

## Installation
### Local
```bash
    0 .- sls config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
    1 .- npm install 
    2 .- docker-compose up
    3 .- sls offline start --verbose
```
### DEV
```bash
    0 .- sls config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
    1 .- npm install 
    2 .- docker-compose up
    3 .- sls deploy --stage dev
```

## USE
### [GET]
```curl
    curl --location 'http://localhost:3000/tokens?token=iMnRbDD741g0tlTt' \
    --header 'Authorization: Bearer pk_test_0ae8dW2FpEAZlxlz'
```
### [POST]
```curl
    curl --location 'http://localhost:3000/tokens' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer pk_test_0ae8dW2FpEAZlxlz' \
    --data-raw '{
        "email": "carlos@gmail.com",
        "card_number": "1111111111111",
        "cvv": "123",
        "expiration_year": "2023",
        "expiration_month": "09"
    }'
```

### [ERROR]
#### 400 - Bad Request
```bash
    {
       "code": "QU0001_001",
        "message": "REQUEST INVALID",
        "details": [
            {
                "description": "card number failed format"
            }
        ] 
    }
```
#### 204 - No Content Data
```bash
    httpStatus: 204
```

#### 500 - Internal Server Error
```bash
    {
       
        "message": "Internal server error",
       
    }
```

## Considerations
    Redis was used in a Docker container, so you should configure the environment variables to point to a path in AWS or the cloud.
    Consider testing locally.
