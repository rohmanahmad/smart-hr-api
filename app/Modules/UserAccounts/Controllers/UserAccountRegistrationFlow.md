# Employee Create

## Endpoint

```
[POST] /api/v1/account/guest/register
```

## Body:

```
email: string
firstName: string
lastName: string
username: string
companyName: string
password: string
confirmPassword: string
```

## Headers:

```
{}

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

## Flow:

    - validasi user input[ email, firstName, lastName, username, companyName, password, confirmPassword ]
    - create client data menggunakan clientcode yg didapatkan dari function random code
    - create company data menggunakan companycode yg didapatkan dari function random code
    - create profile data menggunakan profilecode yg didapatkan dari function random code berdasarkan firsName dan lastName yg tadi diinputkan user
    - create user code ke tabel user menggunakan companycode dari tabel company dan email, username, password dari inputan
    - create relationid ke tabel client admin yg didapatkan dari usercode dan client code
    - membuat kode verifikasi
    - jika eror kembalikan data default
