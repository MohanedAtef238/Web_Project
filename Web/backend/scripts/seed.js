const seedBooks = require('../seeders/bookSeeder');
const bcrypt = require('bcrypt');
const { User } = require('../models');

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function runSeeders() {
  try {
    // Create admin user with hashed password
    const hashedPassword = await hashPassword('admin1!');
    await User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        email: 'admin@example.com',
        password: hashedPassword,
        isAuthor: true
      }
    });

    // Run book seeder
    await seedBooks();
    
    console.log('All seeders completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
}

runSeeders(); 