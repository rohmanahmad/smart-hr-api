# Employee Info

## Endpoint
```
[GET] /api/v1/employee/info
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

- mendapatkan employee code dan melakukan query string
- mencari employee info berdasarkan code menggunakan findBy()
- parse menjadi format JSON
- kembalikan data yg sudah di parse
