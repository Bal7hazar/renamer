/* Autogenerated file. Do not edit manually. */

import { DojoProvider } from "@dojoengine/core";
import { Config } from "../../../dojo.config.ts";
import {
  Account,
  InvocationsDetails,
  UniversalDetails,
  shortString,
} from "starknet";

export interface Signer {
  account: Account;
}

export interface Initialize extends Signer {
  world: string;
}

export interface Create extends Signer {
  name: string;
}

export interface Rename extends Signer {
  name: string;
}

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export const getContractByName = (manifest: any, name: string) => {
  const contract = manifest.contracts.find((contract: any) =>
    contract.name.includes("::" + name),
  );
  if (contract) {
    return contract.address;
  } else {
    return "";
  }
};

export async function setupWorld(provider: DojoProvider, config: Config) {
  const details: UniversalDetails = { maxFee: 1e15 };

  function actions() {
    const contract_name = "actions";
    const contract = config.manifest.contracts.find((c: any) =>
      c.name.includes(contract_name),
    );
    if (!contract) {
      throw new Error(`Contract ${contract_name} not found in manifest`);
    }

    const initialize = async ({ account, world }: Initialize) => {
      try {
        return await provider.execute(
          account,
          {
            contractName: contract_name,
            entrypoint: "initialize",
            calldata: [world],
          },
          details,
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const create = async ({ account, name }: Create) => {
      try {
        const encoded_name = shortString.encodeShortString(name);
        return await provider.execute(
          account,
          {
            contractName: contract_name,
            entrypoint: "create",
            calldata: [provider.getWorldAddress(), encoded_name],
          },
          details,
        );
      } catch (error) {
        console.error("Error executing create:", error);
        throw error;
      }
    };

    const rename = async ({ account, name }: Create) => {
      try {
        const encoded_name = shortString.encodeShortString(name);
        return await provider.execute(
          account,
          {
            contractName: contract_name,
            entrypoint: "rename",
            calldata: [provider.getWorldAddress(), encoded_name],
          },
          details,
        );
      } catch (error) {
        console.error("Error executing create:", error);
        throw error;
      }
    };

    return {
      address: contract.address,
      initialize,
      create,
      rename,
    };
  }

  return {
    actions: actions(),
  };
}
