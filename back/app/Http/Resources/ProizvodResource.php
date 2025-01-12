<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProizvodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'cena' => $this->cena,
            'opis' => $this->opis,
            'slika'=>asset($this->putanja_slike),
            'stilovi' => StilResource::collection($this->stilovi),
            'kategorija' => new KategorijaResource($this->kategorija),
            'datum_kreiranja' => $this->created_at->toDateTimeString(),
            'datum_izmene' => $this->updated_at->toDateTimeString(),
        ];
    }
}
