const express = require("express");
const cors = require("cors");
const app = express();
const Place = require("./models/Place.js")
const User = require("./models/User.js")
const Booking = require("./models/Booking.js");
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const connectDb = require("./models/connectDb")
const jwt = require("jsonwebtoken");
const secret = "SECRETKEYHERE";
const imageDownloader = require("image-downloader");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config();

//connecting database
connectDb();

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.json());



//routes
app.get("/", (req, resp) => {
    resp.send("Server Working");
});


//user Routes
app.post("/register", async (req, resp) => {

    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return resp.status(400).json({
                success: false,
                message: "Please Enter All the Credentials"
            })
        }


        let user = await User.findOne({ email });

        if (user) return resp.status(400).json({
            success: false,
            message: "Email already Exists, Please Login",
        });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        resp.status(200).json({
            success: true,
            message: "User Created Succesfully",
            user,
        });
    } catch (e) {
        throw Error(e.message);
    }
})


//login user
app.post("/login", async (req, resp) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const isMatched = await bcrypt.compare(password, user.password);


        if (isMatched) {
            const token = jwt.sign({ _id: user._id, email: user.email }, secret);

            resp.status(200).cookie('token', token).json({
                success: true,
                message: "Login Successfull",
                token,
                name: user.name,
                id: user._id,
            })

        }
        else {
            resp.status(404).json({
                suceess: false,
                message: "Invalid Credentials",
            });
        }
    }

    else {
        resp.status(200).json({
            success: false,
            message: "User Not Found",
        });
    }

})

//Profile 
app.post("/profile", async (req, resp) => {

    const data = req.body;

    if (data.token == null || !data.token) return resp.status(400).json({
        success: false,
        message: "Please Login to access your Profile"
    });

    const token = JSON.parse(data.token);


    const userInfo = await jwt.verify(token, secret);
    const { name, email, _id } = await User.findById(userInfo);

    resp.json({ name, email, _id });

})


//places

// console.log(path.join(__dirname + '/uploads'))
//not working rightnow
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: './uploads' + newName,
    });

    res.json(newName);
});



//for uploading photo from device.
const photoMiddleware = multer({ dest: 'uploads' });

app.post("/upload", photoMiddleware.array('photos', 100), (req, resp) => {

    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }

    resp.json(uploadedFiles);
})

//for adding a place
app.post("/places", async (req, resp) => {
    let { token } = req.body;

    const { title, address, addedPhotos,
        description, perks, extraInfo, checkIn,
        checkOut, maxGuests, price } = req.body;

    if (token == null || !token) {
        resp.json(
            {
                success: false,
                message: "Please login first",
            }
        );
    } else {
        token = JSON.parse(token);
        const userInfo = await jwt.verify(token, secret);

        const placeDoc = await Place.create({
            owner: userInfo._id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });
        resp.json(placeDoc)
    }

});

app.post('/placesData', async (req, resp) => {
    let { token } = req.body;

    if (token == null || !token) {
        resp.json({
            success: false,
        });
    }
    token = JSON.parse(token);

    const userInfo = await jwt.verify(token, secret);
    const id = userInfo._id;

    resp.json(await Place.find({ owner: id }));

})

app.get('/places/:id', async (req, resp) => {

    
    const { id } = req.params;
    resp.json(await Place.findById(id));
})

//for updating
app.put("/places", async (req, resp) => {
    let { token } = req.body;
    if (token == null || !token) return resp.json('not logged in');

    token = JSON.parse(token);
    const userInfo = await jwt.verify(token, secret);


    const { id, title, address, addedPhotos,
        description, perks, extraInfo, checkIn,
        checkOut, maxGuests, price } = req.body;

    const placeDoc = await Place.findById(id);


    if (userInfo._id === placeDoc.owner.toString()) {
        placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        })
        await placeDoc.save();
        resp.json('ok');
    }
})

//index page
app.get('/index-page', async (req, resp) => {
    resp.send(await Place.find({}));
})


//bookings
app.post("/bookings", async (req, resp) => {

    let { token } = req.body;
    if (token == null || !token) return resp.json('not logged in');

    token = JSON.parse(token);
    const userInfo = await jwt.verify(token, secret);


    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
    
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price, user: userInfo._id,
    }).then((doc) => {
        resp.json(doc);
    }).catch((err) => {
        throw err;
    })
});

app.post("/getBookings", async (req, resp) => {
    let { token } = req.body;
    if (token == null || !token) return resp.json('not logged in');

    token = JSON.parse(token);
    const userInfo = await jwt.verify(token, secret);

    resp.json(await Booking.find({ user: userInfo._id }).populate('place'));

})

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
})