<!DOCTYPE html>
<html>
<head>
    <title>Detalji vaše porudžbine</title>
</head>
<body>
    <p>Poštovani {{ $porudzbina->korisnik->ime }},</p>
    <p>Ovo su detalji vaše porudžbine:</p>

    <table border="1" cellpadding="10">
        <thead>
            <tr>
                <th>Naziv proizvoda</th>
                <th>Cena po komadu</th>
                <th>Količina</th>
            </tr>
        </thead>
        <tbody>
            @foreach($porudzbina->stavkePorudzbine as $stavka)
                <tr>
                    <td>{{ $stavka->proizvod->naziv }}</td>
                    <td>{{ number_format($stavka->proizvod->cena, 2) }} RSD</td>
                    <td>{{ $stavka->kolicina }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <p><strong>Ukupna vrednost: </strong>{{ number_format($porudzbina->ukupna_cena, 2) }} RSD</p>

    <p>Srdačan pozdrav,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>
