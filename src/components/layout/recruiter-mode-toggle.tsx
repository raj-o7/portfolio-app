"use client";

import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRecruiterMode } from "@/components/recruiter-mode-provider";
import { cn } from "@/lib/utils";

export function RecruiterModeToggle() {
  const { recruiterMode, toggleRecruiterMode } = useRecruiterMode();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant={recruiterMode ? "default" : "outline"}
            size="sm"
            onClick={toggleRecruiterMode}
            className={cn("gap-1.5 label-mono", recruiterMode && "shadow-sm")}
          />
        }
      >
        <Briefcase className="size-3.5" />
        Recruiter Mode
      </TooltipTrigger>
      <TooltipContent className="max-w-56 text-center">
        {recruiterMode
          ? "Showing the condensed view. Click to see the full site."
          : "See the 60-second version: intro, top projects, skills, resume, contact."}
      </TooltipContent>
    </Tooltip>
  );
}
