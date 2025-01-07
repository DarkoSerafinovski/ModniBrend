<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PorudzbinaDetalji extends Mailable
{
    use Queueable, SerializesModels;

    public $porudzbina;

    /**
     * Create a new message instance.
     *
     * @param $porudzbina
     */
    public function __construct($porudzbina)
    {
        $this->porudzbina = $porudzbina;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Detalji vaše porudžbine')
                    ->view('emails.porudzbina_detalji');
    }
    
}
