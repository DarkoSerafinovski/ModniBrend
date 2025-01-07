<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StavkaPorudzbineResource extends JsonResource
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
            'proizvod' => new ProizvodResource($this->proizvod),
            'kolicina' => $this->kolicina,
            'cena' => $this->cena,
        ];
    }
}
