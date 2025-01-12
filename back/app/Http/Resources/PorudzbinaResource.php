<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PorudzbinaResource extends JsonResource
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
            'status'=>$this->status,
            'korisnik' => new UserResource($this->korisnik),
            'stavke' => StavkaPorudzbineResource::collection($this->stavkePorudzbine),
            'ukupna_cena' => $this->ukupna_cena,
            'datum_kupovine' => $this->created_at->toDateTimeString(),
            'datum_azuriranja' => $this->updated_at->toDateTimeString(),
        ];
    }
}
