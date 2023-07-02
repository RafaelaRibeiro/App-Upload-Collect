import { Readable } from "stream";
import readline from "readline";
import { prisma } from "shared/infra/prisma/prisma";

export class ListMaterialsUseCase {
  async execute(buffer: Buffer) {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    const collectLine = readline.createInterface({
      input: readable,
    });

    const collectObject = [];
    for await (const line of collectLine) {
      const [collectMaterial, collectSuppliers, collectQuantity] =
        line.split(";");

      const material = await prisma.mAT.findUnique({
        where: {
          MAT_COD: Number(collectMaterial),
        },
        select: {
          MAT_DESC_RESUMIDA: true,
        },
      });

      const Suppliers = await prisma.fNE.findUniqueOrThrow({
        where: {
          FNE_COD: collectSuppliers,
        },
        select: {
          FNE_NOME_FANTASIA: true,
        },
      });

      collectObject.push({
        collectMaterial: Number(collectMaterial),
        collectMaterialName: material,
        collectSuppliers: Number(collectSuppliers),
        collectSuppliersName: Suppliers,
        collectQuantity: Number(collectQuantity),
      });
    }

    return collectObject;
  }
}
