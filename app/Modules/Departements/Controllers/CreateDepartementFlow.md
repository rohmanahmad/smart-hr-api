# Employee Create

## Endpoint
```
[POST] /api/v1/departement/create
```

## Body:

```
companyCode: string
name: string
description: string
```

## Response:

```
{
    status: number
    message: string
    data: {
        item: {}
    }
}
```

## Headers:

```
{
    Authentication: Bearer YOUR_HASH_TOKEN
    ContentType: application/json
}
```

## Flow:

- mendapatkan { companyCode, name, description } dari body atau inputan
- create departement code: getRandomCode
- create { companyCode, name, description } dari inputan
- create createAt: getTimeNowISO()
- dan meretrun departement code
