const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Crop = require('../models/Crop');
const Disease = require('../models/Disease');
const User = require('../models/User');

const cropsData = require('./data/cropsData');
const diseasesData = require('./data/diseasesData');

const seedDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crop_disease_db';
  console.log(`[SEED] Connecting to MongoDB at ${mongoUri}...`);

  try {
    await mongoose.connect(mongoUri);
    console.log('[SEED] Connected to MongoDB.');

    // 1. Seed Crops
    console.log(`[SEED] Seeding ${cropsData.length} crops...`);
    const cropMap = {};
    for (const cropItem of cropsData) {
      let cropDoc = await Crop.findOne({ name: cropItem.name });
      if (!cropDoc) {
        cropDoc = await Crop.create(cropItem);
      } else {
        cropDoc.translations = cropItem.translations;
        cropDoc.imageUrl = cropItem.imageUrl;
        await cropDoc.save();
      }
      cropMap[cropItem.name] = cropDoc._id;
    }
    console.log(`[SEED] Successfully saved ${Object.keys(cropMap).length} crops.`);

    // 2. Seed Diseases
    console.log(`[SEED] Seeding ${diseasesData.length} plant diseases and healthy classes...`);
    let diseaseCount = 0;
    for (const diseaseItem of diseasesData) {
      const cropId = cropMap[diseaseItem.cropName];
      if (!cropId) {
        console.warn(`[SEED] Warning: No crop found for ${diseaseItem.cropName}`);
        continue;
      }

      const diseasePayload = {
        crop: cropId,
        name: diseaseItem.name,
        classLabel: diseaseItem.classLabel,
        isHealthy: diseaseItem.isHealthy,
        description: diseaseItem.description,
        symptoms: diseaseItem.symptoms,
        causes: diseaseItem.causes,
        prevention: diseaseItem.prevention,
        organicTreatment: diseaseItem.organicTreatment,
        chemicalTreatment: diseaseItem.chemicalTreatment,
        bestPractices: diseaseItem.bestPractices,
        severityNote: diseaseItem.severityNote,
        translations: diseaseItem.translations
      };

      await Disease.findOneAndUpdate(
        { classLabel: diseaseItem.classLabel },
        diseasePayload,
        { upsert: true, new: true }
      );
      diseaseCount++;
    }
    console.log(`[SEED] Successfully saved ${diseaseCount} disease/healthy class entries.`);

    // 3. Seed Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@cropcare.ai').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const adminName = process.env.ADMIN_NAME || 'Agricultural Admin';

    let adminUser = await User.findOne({ email: adminEmail });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    if (!adminUser) {
      adminUser = await User.create({
        name: adminName,
        email: adminEmail,
        passwordHash,
        role: 'admin',
        preferredLanguage: 'en'
      });
      console.log(`[SEED] Created default admin account: ${adminEmail}`);
    } else {
      adminUser.name = adminName;
      adminUser.passwordHash = passwordHash;
      adminUser.role = 'admin';
      await adminUser.save();
      console.log(`[SEED] Updated default admin account: ${adminEmail}`);
    }

    console.log('=====================================================');
    console.log('SEEDING SUMMARY:');
    console.log(`- Crops seeded: ${Object.keys(cropMap).length}`);
    console.log(`- Diseases/Classes seeded: ${diseaseCount} / 38`);
    console.log(`- Admin login: ${adminEmail} (password: ${adminPassword})`);
    console.log('=====================================================');

    await mongoose.connection.close();
    console.log('[SEED] Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error during seeding:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
