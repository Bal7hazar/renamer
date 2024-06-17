import { useDojo } from "@/dojo/useDojo";
import { useCallback, useMemo, useState } from "react";
import { Account } from "starknet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/ui/elements/dialog";
import { Button } from "@/ui/elements/button";
import { Input } from "@/ui/elements/input";
import { usePlayer } from "@/hooks/usePlayer";

export const Rename = () => {
  const [playerName, setPlayerName] = useState("");
  const {
    account: { account },
    master,
    setup: {
      systemCalls: { rename },
    },
  } = useDojo();

  const { player } = usePlayer({ playerId: account.address });

  const handleClick = useCallback(() => {
    rename({ account: account as Account, name: playerName });
  }, [account, playerName]);

  const disabled = useMemo(() => {
    return !account || !master || account === master || !player;
  }, [account, master, player]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Rename</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename a player</DialogTitle>
          <DialogDescription>Choose a name.</DialogDescription>
        </DialogHeader>

        <Input
          className="`w-20"
          placeholder="Player Name"
          type="text"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
        />

        <DialogClose asChild>
          <Button disabled={!playerName} onClick={handleClick}>
            Rename
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
