import { useTheme } from "@/hooks/useTheme";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks/useI18n";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Smartphone;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("theme")}>
          <motion.div whileTap={{ scale: 0.85 }} whileHover={{ rotate: 10 }}>
            <Icon className="h-5 w-5" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" /> {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" /> {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Smartphone className="mr-2 h-4 w-4" /> {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
