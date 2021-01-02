const UserModal = require('./models/user');
const passwordHash = require('password-hash');

function createNewUser(data) {
    const user = UserModal.build(data);
    return user.save();
}

function getUserByEmail(email) {
    return UserModal.findOne({
        where: {
          email: email
        }
    })
};

router.post('/login', function(req, res) {
    let data = req.body;
    getUserByEmail(data.email).then((result) => {
        if(result) {
            let match = passwordHash.verify(data.password, result.password);
            if(match) {
                res.json({ 
                    success: true,
                    message: "sucesss"
                }) 
            } else {
                res.json({ 
                    success: false,
                    message: "Password Is Incorrect"
                })
            }
        } else {
            res.json({ 
                success: false,
                message: `No User With ${data.email} found`
            })
        }
    });
});

router.post('/signup', function (req, res) {
    let data = req.body;

    getUserByEmail(data.email).then((result) => {
        if(result) {
            return res.json({ 
                success: false,
                message: "Email Address Already In Use"
            })
        }

        createNewUser({
            ...data,
            password: passwordHash.generate(data.password)
        }).then((result) => {
            res.json({ 
                success: true,
                message: "User Account Created"
            })
        }).catch(() => {
            res.json({ 
                success: false,
                message: "Invalid Email Or Password"
            });
        });
    });
});

