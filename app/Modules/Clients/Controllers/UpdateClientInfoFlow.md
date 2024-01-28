# Client Update

## Endpoint
```
[POST] /api/v1/client/info/update
```

## body:

```
code: string
name: string

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

- mendapatkan client code melalui inputan user atau body
- mendapatkan nama yg akan diupdate melalui body juga
- cari client data berdasarkan code menggunakan findByOrFail()
- lempar erorr jika code tidak ditemukann
- update atau ganti nama
- simpan update atauu perubahan
