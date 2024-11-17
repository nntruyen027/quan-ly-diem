const User = require('../models/User')
const Class = require('../models/Class')
const TeachingAssignment = require('../models/TeachingAssignment')
const { getAllDocuments } = require('../utils/querryDocument');
const bcrypt = require('bcryptjs');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
exports.getAllStudent = async (req, res) => {

  const query = { 
    $and: [
      { 
        $or: [
          { isAdmin: { $exists: false } },
          { isAdmin: false },
        ],
      },
      { 
        $or: [
          { isTeacher: { $exists: false } },
          { isTeacher: false },
        ],
      },
    ]
  };

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  if(req.query.class)
    query.class = req.query.class

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res, [
    'class'
  ]);
}


exports.getAllTeacher = async (req, res) => {

  const query = { 
    isTeacher: true
  };

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res);
}

exports.getAllAdmin = async (req, res) => {

  const query = { 
    isAdmin: true,
  };

  if(req.query.search)
    query.fullname = { $regex: req.query.search, $options: 'i' };

  const defaultField = 'fullname';
  getAllDocuments(User, query, defaultField, req, res);
}

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id
    
    const object = await User.findById(id)

    res.status(200).json({
      data: object
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.getHomeroomClass = async (req, res) => {
  try {
    const id = req.user.id
    
    const homeroomTeacher = await User.findById(id)

    let students = []
    const object = await Class.findOne({homeroomTeacher: homeroomTeacher.id})
    if(object)
      students = await User.find({class: object._id}).populate('class')


    res.status(200).json({
      data: {
       ...object?._doc,
       students
      },
    })
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.getAssignmentClasses = async (req, res) => {
  try {
    const id = req.user.id
    
    const teacher = await User.findById(id)
    const query = { 
      teacher: teacher.id
    };
  
    if(req.query.search)
      query.name = { $regex: req.query.search, $options: 'i' };
  
    const defaultField = 'name';
    getAllDocuments(TeachingAssignment, query, defaultField, req, res, ['class', 'subject', 'teacher']);
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

exports.createOne = async (req, res) => {
  const {
    username,
    fullname,
    birthday,
    phone,
    address,
    email,
    password,
    isAdmin,
    isTeacher,
    className,
    gender,
    father,
    fatherPhone,
    mother,
    motherPhone,
    note
  } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const userData = {
      username,
      fullname,
      email,
      password: await bcrypt.hash(password, 10),
      birthday,
      phone,
      address,
      isAdmin,
      isTeacher,
      class: className,
      gender,
      father,
      fatherPhone,
      mother,
      motherPhone,
      note
    };

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ data: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const {
      isAdmin,
      isTeacher,
      className,
      gender,
      father,
      fatherPhone,
      mother,
      motherPhone,
      note
    } = req.body;
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    if (isTeacher !== undefined) user.isTeacher = isTeacher;
    if (className) user.class = className;
    if (gender) user.gender = gender;
    if (father) user.father = father;
    if (fatherPhone) user.fatherPhone = fatherPhone;
    if (mother) user.mother = mother;
    if (motherPhone) user.motherPhone = motherPhone;
    if (note) user.note = note;

    await user.save();
    res.status(200).json({ data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id)

    res.status(204).send()
  }
  catch(err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

// const xlsx = require('xlsx');
// const path = require('path');
// const fs = require('fs');
// const Class = require('../models/Class'); // Thay thế với đường dẫn thực tế của mô hình Class

const ExcelJS = require('exceljs');

exports.downloadTemplate = async (req, res) => {
  try {
    const classes = await Class.find({}, 'name');
    const classNames = classes.map(cls => cls.name);

    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Template');

    // Thêm tiêu đề vào worksheet
    ws.addRow(["username", "fullname", "birthday", "phone", "address", "email", "password", "isAdmin (true/false)", "isTeacher (true/false)", "className", "gender", "father", "fatherPhone", "mother", "motherPhone", "note"]);

    // Đặt chiều rộng cho các cột
    ws.columns.forEach((col) => {
      col.width = 20; // Chiều rộng mặc định cho tất cả các cột
    });

    // Thêm dữ liệu validation cho các ô dropdown
    ws.getCell('H2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formula1: '"true,false"',
      showErrorMessage: true,
      errorTitle: 'Invalid selection',
      error: 'Please select a value from the dropdown.',
    };

    ws.getCell('I2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formula1: '"true,false"',
      showErrorMessage: true,
      errorTitle: 'Invalid selection',
      error: 'Please select a value from the dropdown.',
    };

    // Tạo dropdown cho className từ classNames
    ws.getCell('J2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formula1: `"${classNames.join(',')}"`,
      showErrorMessage: true,
      errorTitle: 'Invalid selection',
      error: 'Please select a value from the dropdown.',
    };

    // Định dạng tiêu đề
    const headerRow = ws.getRow(1);
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFADD8E6' },
    };

    headerRow.eachCell((cell) => {
      cell.font = {
        name: 'Arial',
        size: 12,
        bold: true,
        color: { argb: 'FF000000' }, // Màu chữ đen
      };
      cell.alignment = {
        horizontal: 'center',
      };
    });

    // Tạo file và gửi cho người dùng
    const filePath = path.join(__dirname, 'User_Template.xlsx');
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
      }
      fs.unlinkSync(filePath); // Xóa file sau khi tải xuống
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.importUsersFromExcel = async (req, res) => {
  try {
    const file = req.files?.['file'][0];  // Nhận file từ client
    
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    
    // Đọc file Excel
    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const errors = [];
    const users = [];

    for (let i = 1; i < rows.length; i++) {
      const [
        username, fullname, birthday, phone, address, email, password, isAdmin, isTeacher, className, gender,
        father, fatherPhone, mother, motherPhone, note
      ] = rows[i];

      // Kiểm tra tính hợp lệ và tìm ID lớp theo tên lớp
      const classObj = await Class.findOne({ name: className.trim() });
      if (!classObj) {
        errors.push(`Row ${i + 1}: Class "${className}" does not exist.`);
        continue;
      }
      
      const hashedPassword = await bcrypt.hash('' + password, 10);
      console.log(hashedPassword)
      const user = new User({
        username,
        fullname,
        birthday,
        phone,
        address,
        email,
        password: hashedPassword,
        isAdmin: isAdmin === 'true',
        isTeacher: isTeacher === 'true',
        class: classObj._id,
        gender,
        father,
        fatherPhone,
        mother,
        motherPhone,
        note
      });
      
      users.push(user);
    }
    
    await User.insertMany(users);
    fs.unlinkSync(file.path); 

    res.status(200).json({
      message: `${users.length} users have been imported successfully.`,
      errors
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
