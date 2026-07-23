import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { commerceConfig, getWhatsAppUrl } from "@/config/commerce";

type WhatsAppButtonProps = {
  className?: string;
  label?: string;
  message?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function WhatsAppButton({
  className,
  label = commerceConfig.whatsapp.label,
  message,
  variant = "secondary",
}: WhatsAppButtonProps) {
  return (
    <Button
      className={className}
      href={getWhatsAppUrl(message)}
      rel="noreferrer"
      target="_blank"
      variant={variant}
    >
      <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} />
      {label}
    </Button>
  );
}
