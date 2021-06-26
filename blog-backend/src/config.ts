import dotenv from 'dotenv';
import User from '@app/models/User';

dotenv.config();

(async () => {
  const prevAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (!prevAdmin) {
    const admin = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });

    admin.save();
  }
})();
