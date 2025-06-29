import { createAvatar } from "@dicebear/core";
import { initials, botttsNeutral } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarGeneratorProps {
  seed: string;
  className?: string;
  Varient: "bottsNeutral" | "initials";
}

export const AvatarGenerator = ({
  seed,
  className,
  Varient,
}: AvatarGeneratorProps) => {
  const avatar =
    Varient === "bottsNeutral"
      ? createAvatar(botttsNeutral, {
          seed,
        })
      : createAvatar(initials, {
          seed,
          fontWeight:500 ,
          fontSize: 42,
        });

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>
        {seed?.charAt(0).toUpperCase() || "?"}
      </AvatarFallback>
    </Avatar>
  );
};
