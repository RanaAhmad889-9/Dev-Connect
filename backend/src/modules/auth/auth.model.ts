import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./auth.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    coverPhoto: {
      type: String,
      default: "",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) {
    return;
  }

  user.password = await bcrypt.hash(user.password, 10);
});


userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};


userSchema.methods.isPasswordMatched = async function (
  plainTextPassword: string
) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);