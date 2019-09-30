const mongoose = require("mongoose");
const Validator = require("validator");
const Bcrypt = require("bcryptjs"); // hashing password library

mongoose.connect("mongodb+srv://Vehbi:Anakonda11@cluster0-zaujt.mongodb.net/task?retryWrites=true&w=majority", {
	useNewUrlParser: true
});

const taskSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
		trim: true
	},

	completed: {
		type: Boolean,
		default: false
	}
});

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		default: "anonymous",
		trim: true
	},
	age: {
		type: Number,
		validate(age) {
			if (age < 0) {
				throw new Error("Age must be positive");
			}
		}
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate(email) {
			if (!Validator.isEmail(email)) {
				throw new Error("Please enter a valid email");
			}
		},
		trim: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
		validate(password) {
			if (password.toLowerCase().includes("password")) {
				throw new Error("Password cannot contain 'password'");
			}
		}
	}
});

userSchema.statics.findByCredential = async user => {
	// logs users in, checks email and compares given
	// password to hashed password
	const foundUser = await User.findOne({ email: user.email });

	if (!foundUser) {
		throw new Error("Unable to login");
	}

	let isValidPassword = await Bcrypt.compare(user.password, foundUser.password);

	if (!isValidPassword) {
		throw new Error("Unable to login");
	}

	return foundUser;
};

userSchema.pre("save", async function(next) {
	//every .save() runs thru this.
	if (this.isModified("password")) {
		this.password = await Bcrypt.hash(this.password, 8); //checking and re hashing password
	}

	next();
});

const Task = mongoose.model("Task", taskSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
	Task: Task,
	User: User
};
