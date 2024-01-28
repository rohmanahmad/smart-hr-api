# Departement Update

## Endpoint
```
[POST] /api/v1/departement/update
```

## body:

```
code: string
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
- mendapatkan Departement code melalui inputan user atau body
- mendapatkan { name, description }  yg akan diupdate melalui body juga
- cari Departement data berdasarkan code menggunakan findByOrFail()
- lempar erorr jika code tidak ditemukann
- update atau ganti { name, description }
- simpan update atauu perubahan


