# Company Update

## Endpoint
```
[POST] /api/v1/company/info/update
```

## body:

```
code: string
name: string
description: string
address: string
phoneNumber1: string
phoneNumber2: string
email: string
website: string

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

- mendapatkan company code melalui inputan user atau body
- mendapatkan {name, description, address, phoneNumber1, phoneNumber2, email, website}  yg akan diupdate melalui body juga
- cari company data berdasarkan code menggunakan findByOrFail()
- lempar erorr jika code tidak ditemukann
- update atau ganti {name, description, address, phoneNumber1, phoneNumber2, email, website}
- simpan update atauu perubahan
