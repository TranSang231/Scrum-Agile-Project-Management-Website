### Folder Structure 
```
my-react-app-project-2025/  
├── public/                     # Các tệp tĩnh (favicon, index.html, manifest.json)  
├── src/  
│   ├── assets/                 # Ảnh, font, icons, CSS, SCSS...  
│   ├── components/             # Các component dùng chung  
│   │   ├── ui/                 # Các component UI chung (Button, Modal, Input)  
│   │   └── layout/             # Các Layout như Navbar, Sidebar, Footer  
│   ├── hooks/                  # Custom hooks (useAuth, useTheme...)  
│   ├── utils/                  # Hàm tiện ích (formatDate, debounce...)  
│   ├── pages/                  # Mỗi page có thư mục riêng  
│   │   ├── Home/  
│   │   ├── About/  
│   │   └── Dashboard/  
│   ├── store/                  # Quản lý state (Redux, Zustand...)  
│   │   ├── slices/             # Redux Slices (authSlice, userSlice)  
│   │   └── index.ts  
│   ├── routes/                 # Cấu hình Router  
│   │   ├── privateRoutes.ts    # Route yêu cầu đăng nhập  
│   │   ├── publicRoutes.ts     # Route không yêu cầu đăng nhập  
│   │   └── index.tsx  
│   ├── services/               # API services (Axios, Fetch)  
│   │   ├── authService.ts      # Service xác thực  
│   │   └── userService.ts      # Service người dùng  
│   ├── config/                 # Cấu hình chung (axios, env, theme...)  
│   │   ├── axios.ts            # Cấu hình axios  
│   │   ├── env.ts              # Load biến môi trường  
│   │   └── theme.ts            # Dark/Light Theme config  
│   ├── types/                  # Chứa TypeScript types  
│   │   ├── user.ts             # Định nghĩa kiểu dữ liệu User  
│   │   └── auth.ts             # Định nghĩa kiểu dữ liệu Auth  
│   ├── App.tsx                 # Component gốc của ứng dụng  
│   └── main.tsx                # Entry point của ứng dụng  
├── .env                        # Biến môi trường  
├── tsconfig.json               # Cấu hình TypeScript  
├── tailwind.config.js          # Cấu hình Tailwind CSS  
├── package.json                # Danh sách dependencies  
├── vite.config.ts              # Cấu hình Vite  
└── README.md                   # Tài liệu dự án  
```
### 1. Chạy chương trình
Bước 1. 
``` 
npm install
```
Bước 2. 
```  
npm run dev
```

### Download Project

- Cài đặt vite.
$npm install vite --save-dev

- Sau đó, kiểm tra lại bằng.
$npm list vite

- Chạy project.
$npm run dev


