import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BadgeModule", (m) => {
  const badge = m.contract("Badge");

  return { badge };
});
