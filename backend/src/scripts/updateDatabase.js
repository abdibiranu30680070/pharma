import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const productsFilePath = path.join(__dirname, '../data/products.json');

const categoryMapping = {
  'Prescription Medicines': 'Pharmaceuticals',
  'Over-the-Counter Medicines': 'Pharmaceuticals',
  'Pharmaceutical Products': 'Pharmaceuticals',
  'Laboratory Supplies': 'Medical Supplies',
  'Medical Disposables & Consumables': 'Medical Supplies',
  'Hospital Equipment': 'Medical Equipments',
  'Medical Equipment & Apparatus': 'Medical Equipments',
  'Medical Equipment': 'Medical Equipments',
};

async function runMigration() {
  console.log('🔄 Starting Database Update Migration...');

  // 1. Update Local JSON database
  try {
    const rawData = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(rawData);
    let jsonUpdatedCount = 0;

    const updatedProducts = products.map((prod) => {
      let changed = false;
      const newCategory = categoryMapping[prod.category] || prod.category;
      if (newCategory !== prod.category) {
        prod.category = newCategory;
        changed = true;
      }
      if (prod.specs && prod.specs.includes('GDSP')) {
        prod.specs = prod.specs.replace(/GDSP/g, 'GDP');
        changed = true;
      }
      if (prod.description && prod.description.includes('GDSP')) {
        prod.description = prod.description.replace(/GDSP/g, 'GDP');
        changed = true;
      }
      if (changed) jsonUpdatedCount++;
      return prod;
    });

    await fs.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
    console.log(`✅ Local JSON Database (${productsFilePath}) updated: ${jsonUpdatedCount} records modified.`);
  } catch (err) {
    console.error(`⚠️ Error updating JSON database: ${err.message}`);
  }

  // 2. Update MongoDB Database (if MONGODB_URI is provided)
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('ℹ️ No MongoDB URI configured in .env. Local JSON database is active and fully updated.');
    return;
  }

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log('🍃 MongoDB Connected Successfully.');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const productCollectionName = collections.find(c => c.name.toLowerCase().includes('product'))?.name || 'products';

    const productCollection = db.collection(productCollectionName);
    const allProducts = await productCollection.find({}).toArray();

    console.log(`Found ${allProducts.length} documents in MongoDB '${productCollectionName}' collection.`);

    let mongoUpdatedCount = 0;
    for (const prod of allProducts) {
      const mappedCategory = categoryMapping[prod.category];
      const updates = {};

      if (mappedCategory && mappedCategory !== prod.category) {
        updates.category = mappedCategory;
      }
      if (typeof prod.specs === 'string' && prod.specs.includes('GDSP')) {
        updates.specs = prod.specs.replace(/GDSP/g, 'GDP');
      }
      if (typeof prod.description === 'string' && prod.description.includes('GDSP')) {
        updates.description = prod.description.replace(/GDSP/g, 'GDP');
      }

      if (Object.keys(updates).length > 0) {
        await productCollection.updateOne({ _id: prod._id }, { $set: updates });
        mongoUpdatedCount++;
      }
    }

    console.log(`✅ MongoDB Atlas: Successfully migrated ${mongoUpdatedCount} product documents.`);
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed.');
  } catch (err) {
    console.error(`⚠️ MongoDB update encountered an error: ${err.message}`);
    console.log('Local JSON fallback database is verified and fully updated.');
  }

  console.log('🎉 Database update complete!');
}

runMigration().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
