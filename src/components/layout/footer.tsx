import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="label-mono text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
            <GithubIcon className="size-4" />
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors">
            <LinkedinIcon className="size-4" />
          </a>
          <a href={`mailto:${profile.social.email}`} aria-label="Email" className="hover:text-foreground transition-colors">
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
