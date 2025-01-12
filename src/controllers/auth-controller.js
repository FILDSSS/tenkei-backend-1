const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const { extendedRegisterSchema,registerSchema,loginSchema  } = require("../validators/auth-validator");
const createError = require("../utils/create-error");


exports.register = async (req, res, next) => {
    try {
        // ตรวจสอบข้อมูลที่ส่งเข้ามา
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // ดึงข้อมูลผู้ใช้จาก body
        const {
            User_ID,
            User_Name,
            User_Abb,
            User_Pass,
            User_Remark,
            
        } = req.body;

        // ตรวจสอบว่าผู้ใช้มีอยู่แล้วในฐานข้อมูลหรือไม่
        const existingUser = await prisma.tM_User.findUnique({
            where: { User_ID },
        });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        // แฮชรหัสผ่าน
        const hashedPassword = await bcrypt.hash(User_Pass, 10);

        // สร้างผู้ใช้ใหม่ในฐานข้อมูล
        const newUser = await prisma.tM_User.create({
            data: {
                User_ID,
                User_Name,
                User_Abb,
                User_Remark,
                User_Pass: hashedPassword, // เพิ่มรหัสผ่านที่แฮชแล้ว
         
            },
        });

        // สร้าง JSON Web Token
        const token = jwt.sign({ User_ID: newUser.User_ID }, process.env.JWT_SECRET, {
            expiresIn: "6h",
        });

        // ส่งข้อมูลกลับ
        res.status(201).json({
            message: "User registered successfully",
            user: {
                User_ID: newUser.User_ID,
                User_Name: newUser.User_Name,
                User_Abb: newUser.User_Abb,
                User_Remark: newUser.User_Remark,
            },
            token,
        });
    } catch (err) {
        
        console.error(err);
        next(err); // ส่งข้อผิดพลาดไปยัง middleware ของ Express
    }
};

exports.login = async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return next(createError(400, error.details[0].message)); // ส่งข้อผิดพลาดกลับไป
        }

        const { Worker_CD, Worker_Pass } = value; // ดึง User_ID และ User_Pass ออกจาก value

        // ตรวจสอบว่าผู้ใช้มีอยู่ในฐานข้อมูลหรือไม่
        const existingUser = await prisma.tM_Worker.findUnique({
            where: { Worker_CD },
        });
        if (!existingUser) {
            return next(createError(400, "Invalid credentials.")); // ข้อความที่ถูกต้อง
        }

        let isMatch = false;

        // พยายามตรวจสอบรหัสผ่านแบบ bcrypt
        // if (existingUser.User_Pass.startsWith("$2b$")) { // ตรวจสอบว่ารหัสผ่านถูกเข้ารหัสด้วย bcrypt หรือไม่

        // ตรวจสอบว่ารหัสผ่านถูกเข้ารหัสด้วย bcrypt หรือไม่ ยอมรับทั้ง $2b$ และ $2a$
        if (existingUser.Worker_Pass.startsWith('$2a$') || existingUser.Worker_Pass.startsWith('$2b$')) { 
            isMatch = await bcrypt.compare(Worker_Pass, existingUser.Worker_Pass);
        } else {
            // ตรวจสอบรหัสผ่านแบบไม่เข้ารหัส
            isMatch = Worker_Pass === existingUser.Worker_Pass;
        }

        if (!isMatch) {
            return next(createError(400, "Invalid credentials.")); // ข้อความที่ถูกต้อง
        }

        // สร้าง JSON Web Token
        const payload = { Worker_CD: existingUser.Worker_CD };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY || "defaultRandom",
            {
                expiresIn: process.env.JWT_EXPIRE || "6h", // กำหนดเวลาหมดอายุของ token
            }
        );

        // ลบรหัสผ่านออกจากข้อมูลผู้ใช้ก่อนส่งกลับ
        delete existingUser.Worker_Pass;

        // ส่งข้อมูลกลับ
        res.status(200).json({ accessToken, user: existingUser }); // ส่งข้อมูลผู้ใช้ที่ไม่มีรหัสผ่าน
    } catch (err) {
        next(err); // ส่งข้อผิดพลาดไปยัง middleware
    }
};

exports.getMe = (req, res) => {
    res.status(200).json({ user: req.user }); // ส่งข้อมูลผู้ใช้จาก request
};

exports.updaterow = async (req, res, next) => {
    try {
        const userId = req.params.userId; // รับ User_ID จาก params

        // ตรวจสอบว่าผู้ใช้เป็นแอดมินหรือไม่
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // ตรวจสอบความถูกต้องของข้อมูล
        const { error, value } = updatePermissionsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: 'Invalid input.', details: error.details });
        }

        const { setAll, permissions } = value;

        // สมมติว่าคุณมีฟังก์ชันเพื่อดึงข้อมูลผู้ใช้ตาม userId
        const userPermissions = await YourModel.getUserPermissions(userId);

        if (!userPermissions) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // ตั้งค่าทั้งหมดเป็น true หรือ false
        if (setAll !== undefined) {
            for (const key in permissionsSchema) {
                userPermissions[key] = setAll; // ตั้งค่าตาม setAll
            }
        } else if (permissions) {
            // อัปเดตเฉพาะ permissions ที่กำหนด
            for (const key in permissions) {
                if (permissionsSchema.hasOwnProperty(key)) {
                    userPermissions[key] = permissions[key];
                }
            }
        }

        // สมมติว่าคุณมีฟังก์ชันเพื่อบันทึก permissions ใหม่กลับไปในฐานข้อมูล
        await YourModel.updateUserPermissions(userId, userPermissions);

        // ส่งข้อมูลที่อัปเดตแล้ว
        return res.status(200).json({ message: 'Permissions updated successfully.', data: userPermissions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }

  };
