<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClanakResource extends JsonResource
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
            'naslov' => $this->naslov,
            'sadrzaj' => $this->sadrzaj,
            'slika'=>asset($this->slika),
            'autor' => new UserResource($this->korisnik),
            'kreiran' => $this->created_at->toDateTimeString(),
            
        ];
    }
}
