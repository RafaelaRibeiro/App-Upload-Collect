import { Readable } from "stream";
import readline from "readline";
import { prisma } from "shared/infra/prisma/prisma";

interface ICollect {
  collectMaterial: number;
  collectSuppliers: string;
  collectQuantity: number;
}

export class UploadCollectUseCase {
  async execute(buffer: Buffer, collectSerie: string, collectNum: string) {
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);

    const collectLine = readline.createInterface({
      input: readable,
    });
    const collect: ICollect[] = [];
    for await (let line of collectLine) {
      const collectLineSplit = line.split(";");
      collect.push({
        collectMaterial: Number(collectLineSplit[0]),
        collectSuppliers: collectLineSplit[1],
        collectQuantity: Number(collectLineSplit[2]),
      });
    }
    let seq = 0;

    for await (let {
      collectMaterial,
      collectSuppliers,
      collectQuantity,
    } of collect) {
      seq++;

      await prisma.iCP.create({
        data: {
          ICP_COP_SERIE: Number(collectSerie),
          ICP_COP_NUM: Number(collectNum),
          ICP_SEQ: seq,
          ICP_MAT_COD: collectMaterial,
          ICP_QTDE_AGRUPADA: 0,
          ICP_QUANT: collectQuantity,
          ICP_STATUS: "A",
          ICP_FATOR_CONV: 1,
          FIC: {
            create: {
              FIC_MAT_COD: collectMaterial,
              FIC_FNE_COD: collectSuppliers,
              FIC_PRAZO_ENTREGA: 0,
              FIC_QTDE_COTADA: collectQuantity,
              FIC_FATOR_CONV: 1,
            },
          },
        },
      });
    }

    return readable;
  }
}
