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

  async addRifa(compraRifa: CompraRifa) {
    compraRifa.numero = await this.generateNextNumber();
    this.rifas?.insertOne(compraRifa);
  }
}

const mongoRepository = new MongoRepository();
await mongoRepository.initialize();
export default mongoRepository;
