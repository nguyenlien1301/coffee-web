"use server";
// chạy ở phía server nên thêm dòng "use server"
import mongoose from "mongoose";
// singleton connection
// Nó sẽ check là nếu đã kết nối rồi thì sẽ ko kết nối nữa.
let isConnected: boolean = false;
// Mặc định là chưa kết nối.
export const connectToDatabase = async () => {
  // nếu chưa kết nối sẽ báo lỗi
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }
  // nếu đã kết nối thông báo cho hay.
  if (isConnected) {
    console.log("MONGODB is already connected");
    return;
  }
  //   Nếu chưa có gì hết thì thử kết nối
  // Nếu kết nối sẽ chạy xúng isConnected = true;
  // academy là tên mà chúng ta tạo trên db compass
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "coffee",
    });
    // kết nối đc rồi thì cho
    isConnected = true;
    console.log("Using new database connection");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};
