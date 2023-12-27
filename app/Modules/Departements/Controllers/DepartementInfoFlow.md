# Departement Info

## Endpoint
```
[GET] /api/v1/departement/info
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
- mendapatkan Departement code dan melakukan query string
- mencari Departement info berdasarkan code menggunakan findBy()
- parse menjadi format JSON
- kembalikan data yg sudah di parse
