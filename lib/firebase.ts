import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { Analytics, getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: "G-4GG57V3T1S"
};

// 初始化 Firebase
let app: FirebaseApp;
let analytics: Analytics;

// 检查是否已经初始化
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    // 仅在客户端初始化 analytics
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
} else {
    app = getApps()[0];
}

// 获取 Auth 实例
const auth: Auth = getAuth(app);

export { auth, app }; 