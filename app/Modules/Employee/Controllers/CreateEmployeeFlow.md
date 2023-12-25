# Employee Create

## Endpoint
```
[POST] /api/v1/employee/create
```

## Body:

```
email: string
firstNAme: string
lastName: string
departementCode: string
userName: string
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

- select departement berdasarkan departement code >> company code
- create account (companyCode, email, username, password: otomatis) >> usercode
- profile (firstname, lastname) >> profilecode
- create employee (code, companycode, usercode, departementcode, profilecode)
