# Supermarket App

یک اپلیکیشن فروشگاهی سوپرمارکتی مدرن با استفاده از React Native و Expo که از پلتفرم‌های iOS، Android و Web پشتیبانی می‌کند.

## ویژگی‌ها

- طراحی زیبا و کاربرپسند
- پشتیبانی از پلتفرم‌های iOS، Android و Web
- پشتیبانی از حالت تاریک (Dark Mode) و روشن (Light Mode)
- مدیریت حساب کاربری (ثبت‌نام، ورود، فراموشی رمز عبور)
- مرور محصولات و دسته‌بندی‌ها
- جستجو و فیلتر محصولات
- سبد خرید و مدیریت سفارشات
- پروفایل کاربری و تاریخچه سفارشات

## تکنولوژی‌های استفاده شده

- **React Native**: فریمورک اصلی برای توسعه اپلیکیشن
- **Expo**: برای ساده‌تر کردن توسعه و سازگاری با پلتفرم‌های مختلف
- **Zustand**: برای مدیریت وضعیت (State Management)
- **React Query**: برای مدیریت درخواست‌ها و کشینگ داده‌ها
- **NativeWind**: برای استایل‌دهی (ادغام Tailwind CSS با React Native)
- **React Navigation**: برای مدیریت ناوبری در اپلیکیشن

## نصب و راه‌اندازی

1. ابتدا مطمئن شوید که Node.js و npm روی سیستم شما نصب شده است.
2. Expo CLI را نصب کنید:
   ```
   npm install -g expo-cli
   ```
3. پروژه را کلون کنید:
   ```
   git clone https://github.com/yourusername/supermarket-app.git
   cd supermarket-app
   ```
4. وابستگی‌ها را نصب کنید:
   ```
   npm install
   ```
5. پروژه را اجرا کنید:
   ```
   npm start
   ```

## ساختار پروژه

```
supermarket-app/
├── src/
│   ├── api/            # API calls and services
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── constants/      # Constants and theme
│   ├── hooks/          # Custom hooks
│   ├── navigation/     # Navigation setup
│   ├── screens/        # App screens
│   ├── store/          # State management
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── App.tsx             # Main app component
├── babel.config.js     # Babel configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## توسعه‌دهندگان

- نام شما

## لایسنس

MIT
