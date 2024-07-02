import { signOut } from "@/lib/actions/auth.actions";
import { Button } from "../button";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

function SignOutButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="rounded-xl flex justify-start hover:bg-[--error-color]"
          >
            <ExitIcon className="ml-3 mr-3 h-4 w-4" />
            <p className="text-white font-normal text-sm">Sign Out</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sign out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SignOutButton;
