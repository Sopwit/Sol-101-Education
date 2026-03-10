import type { Idl } from "@coral-xyz/anchor";

export const PROGRAM_ID = "EJ2ocRi8zWj31Emzxw5MWDLDAFPe8wrJkk8VVFVqVAyR";

export const COUNTER_PDA_IDL: Idl = {
  address: PROGRAM_ID,
  metadata: {
    name: "structure_demo",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor"
  },
  instructions: [
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              { kind: "const", value: [99, 111, 117, 110, 116, 101, 114] },
              { kind: "account", path: "authority" }
            ]
          }
        },
        { name: "authority", writable: true, signer: true },
        { name: "systemProgram", address: "11111111111111111111111111111111" }
      ],
      args: []
    },
    {
      name: "increment",
      discriminator: [11, 18, 104, 9, 104, 174, 59, 33],
      accounts: [
        {
          name: "counter",
          writable: true,
          pda: {
            seeds: [
              { kind: "const", value: [99, 111, 117, 110, 116, 101, 114] },
              { kind: "account", path: "authority" }
            ]
          }
        },
        { name: "authority", signer: true, relations: ["counter"] }
      ],
      args: []
    }
  ],
  accounts: [{ name: "counter", discriminator: [255, 176, 4, 245, 188, 253, 124, 25] }],
  types: [
    {
      name: "counter",
      type: {
        kind: "struct",
        fields: [
          { name: "authority", type: "pubkey" },
          { name: "count", type: "u64" },
          { name: "bump", type: "u8" }
        ]
      }
    }
  ]
};
