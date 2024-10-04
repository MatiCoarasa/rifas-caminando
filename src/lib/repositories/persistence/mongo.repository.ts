import { ObjectId, Collection, Db } from "mongodb";
import { CompraRifa } from "../../models/compra-rifa.model";
import {connectToMongo} from "./mongo.connection";

class MongoRepository {
  private rifas?: Collection;
  private counter?: Collection;

  async initialize() {
    const db: Db = await connectToMongo();
    this.rifas = db.collection(process.env.DB_COLL_RIFAS!);
    this.counter = db.collection(process.env.DB_COLL_COUNTER!);
  }

  private async generateNextNumber(): Promise<number> {
    const sequenceDocument = await this.counter!.findOneAndUpdate(
      { _id: new ObjectId(process.env.COUNTER_ID) },
      { $inc: { sequenceValue: 1 } },
      { returnDocument: "after" }
    );
    return await sequenceDocument!.sequenceValue;
  }

  async addRifas(compraRifas: CompraRifa[]) {
    this.rifas?.insertMany(compraRifas);
  }

  async setRifasAsPaid(purchaseId: string): Promise<CompraRifa[]> {
    const rifas = this.rifas?.find({ purchaseId });
    const rifasUpdated = [];
    for await (const rifa of rifas!) {
      const numero = await this.generateNextNumber();
      const rifaUpdated = await this.rifas?.findOneAndUpdate(
        { _id: rifa._id },
        { $set: { numero: numero } },
        { returnDocument: "after" });
      rifasUpdated.push(CompraRifa.fromObject(rifaUpdated));
    }
    return rifasUpdated;
  }
}

const mongoRepository = new MongoRepository();
await mongoRepository.initialize();
export default mongoRepository;
