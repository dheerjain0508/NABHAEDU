import { useI18n, Lang } from "@/hooks/useI18n";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const labelMap: Record<Lang, string> = { en: "English", hi: "हिंदी", pa: "ਪੰਜਾਬੀ" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("language")}> 
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(labelMap) as Lang[]).map((k) => (
          <DropdownMenuItem key={k} onClick={() => setLang(k)}>
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary" /> {labelMap[k]} {lang === k ? "✓" : ""}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
