import { createLocalUrlTable } from "./src/domain/models/table";

const setup = async (): Promise<void> => {
  await createLocalUrlTable();
};

export default setup;
