import type { IWorld } from "./generated/contractSystems";

import { toast } from "sonner";
import * as SystemTypes from "./generated/contractSystems";
import { ClientModels } from "./models";
import { shortenHex } from "@dojoengine/utils";

export type SystemCalls = ReturnType<typeof systems>;

export function systems({
  client,
  clientModels,
}: {
  client: IWorld;
  clientModels: ClientModels;
}) {
  const extractedMessage = (message: string) => {
    return message.match(/\('([^']+)'\)/)?.[1];
  };

  const notify = (message: string, transaction: any) => {
    if (transaction.execution_status != "REVERTED") {
      toast.success(message, {
        description: shortenHex(transaction.transaction_hash),
        action: {
          label: "View",
          onClick: () =>
            window.open(
              `https://worlds.dev/networks/slot/worlds/renamer/txs/${transaction.transaction_hash}`,
            ),
        },
      });
    } else {
      toast.error(extractedMessage(transaction.revert_reason));
    }
  };

  const create = async ({ account, ...props }: SystemTypes.Create) => {
    try {
      const { transaction_hash } = await client.actions.create({
        account,
        ...props,
      });

      notify(
        `Player has been created.`,
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const rename = async ({ account, ...props }: SystemTypes.Rename) => {
    try {
      const { transaction_hash } = await client.actions.rename({
        account,
        ...props,
      });

      notify(
        `Player has been renamed.`,
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        }),
      );
    } catch (error) {
      console.error("Error renaming player:", error);
    }
  };

  return {
    create,
    rename,
  };
}
