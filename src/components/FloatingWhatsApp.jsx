import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  // Substitua o número abaixo pelo número real do terreiro no formato: 55 + DDD + Numero (sem espaços)
  const phoneNumber = "5541900000000"; 
  const message = "Olá! Gostaria de tirar uma dúvida sobre o Terreiro Luz de Aruanda.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>
        {`
          .floating-contact-btn {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background-color: var(--color-mata-dark);
            color: #ffffff;
            padding: 0.8rem 1.5rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-weight: 600;
            font-size: 0.95rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transition: all 0.3s ease;
            text-decoration: none;
            border: 1px solid rgba(196, 145, 60, 0.3); /* Borda Ocre sutil */
          }
          
          .floating-contact-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            background-color: var(--color-mata);
            border-color: var(--color-ocre);
          }

          .floating-contact-icon {
            color: var(--color-ocre-light);
            transition: color 0.3s ease;
          }

          .floating-contact-btn:hover .floating-contact-icon {
            color: #ffffff;
          }

          /* Ajuste para mobile */
          @media (max-width: 768px) {
            .floating-contact-btn {
              bottom: 1.5rem;
              right: 1.5rem;
              padding: 0.7rem 1.2rem;
              font-size: 0.85rem;
            }
          }
        `}
      </style>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn"
        aria-label="Fale conosco"
        title="Fale conosco"
      >
        <MessageCircle size={20} className="floating-contact-icon" />
        <span>Fale Conosco</span>
      </a>
    </>
  );
}
