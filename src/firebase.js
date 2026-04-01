// 全局调试控制 - 设置为false禁用所有console输出
const GLOBAL_DEBUG = true;
if (!GLOBAL_DEBUG) {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
}

// Firebase配置 - 使用环境变量，如果不存在则使用备用配置
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAFT1hV0tCJEDdFzq0BQChkcfVMGru9h5I",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "iamshaoning-qiu.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "iamshaoning-qiu",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "iamshaoning-qiu.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "599860248393",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:599860248393:web:8c3dce72c200cbafbee498",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QVG10CDXJR",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://iamshaoning-qiu-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// 安全检查：确保Firebase配置存在
console.log('Firebase配置:', firebaseConfig);
if (!firebaseConfig.apiKey) {
    console.error('Firebase配置缺失，请检查API密钥');
}

try {
    // 检查是否已初始化
    if (!window.firebaseApp) {
        // Initialize Firebase
        console.log('开始初始化Firebase...');
        const app = firebase.initializeApp(firebaseConfig);
        console.log('Firebase App初始化成功:', app);
        
        const analytics = firebase.analytics(app);
        console.log('Firebase Analytics初始化成功');
        
        const database = firebase.database(app);
        console.log('Firebase Database初始化成功:', database);
        
        const auth = firebase.auth(app);
        console.log('Firebase Auth初始化成功:', auth);
        
        // 全局变量
        window.firebaseApp = app;
        window.firebaseDatabase = database;
        window.firebaseAuth = auth;
        window.firebaseRef = function(db, path) { return db.ref(path); };
        window.firebaseSet = function(ref, value) { return ref.set(value); };
        window.firebaseGet = function(ref) { return ref.once('value'); };
        window.firebaseOnValue = function(ref, callback) { return ref.on('value', callback); };
        
        console.log('Firebase初始化完成，所有全局变量已设置');
    } else {
        console.log('Firebase已初始化，跳过重复初始化');
    }
} catch (error) {
    console.error('Firebase初始化失败:', error);
    // 初始化失败时，确保全局变量有默认值
    window.firebaseApp = null;
    window.firebaseDatabase = null;
    window.firebaseAuth = null;
    window.firebaseRef = null;
    window.firebaseSet = null;
    window.firebaseGet = null;
    window.firebaseOnValue = null;
    // 显示用户友好的错误提示
    if (typeof notification !== 'undefined') {
        notification.show('Firebase初始化失败，将使用本地存储', 'error');
    }
}