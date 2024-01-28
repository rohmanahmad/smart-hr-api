# Departement List

## Endpoint
```
[GET] /api/v1/departement/list
```

## params:

```


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
- mendapatkan list data menggunakan all()
- mapping setiap object di parse ke JSON
- return semua data list yg sudah di mapping

