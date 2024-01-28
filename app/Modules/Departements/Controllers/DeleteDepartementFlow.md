# Departement Delete

## Endpoint
```
[get] /api/v1/departement/delete
```

## params:

```
code: string

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

- mendapatkan departement code dan melakukan query string
- mencari departement info berdasarkan code menggunakan findBy()
- delete data departement berdasarkan code

