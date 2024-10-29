import dbConnect from "@/config/dbConfig";
import Property from "@/models/Property";

// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await dbConnect();

    const properties = await Property.find({ is_featured: true });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};

// export const POST = async (request) => {
//   try {
//     await dbConnect();

//     const sessionUser = await getSessionUser();

//     if (!sessionUser || !sessionUser.userId) {
//       return new Response("User Id is required", { status: 401 });
//     }

//     const { userId } = sessionUser;

//     const formData = await request.formData();

//     const amenities = formData.getAll("amenities");
//     const images = formData
//       .getAll("images")
//       .filter((image) => image.name != "");

//     const propertyData = {
//       type: formData.get("type"),
//       name: formData.get("name"),
//       description: formData.get("description"),
//       location: {
//         street: formData.get("location.street"),
//         city: formData.get("location.city"),
//         state: formData.get("location.state"),
//         zipcode: formData.get("location.zipcode"),
//       },
//       beds: formData.get("beds"),
//       baths: formData.get("baths"),
//       square_feet: formData.get("square_feet"),
//       amenities,
//       rates: {
//         weekly: formData.get("rates.weekly"),
//         monthly: formData.get("rates.monthly"),
//         nightly: formData.get("rates.nightly"),
//       },
//       seller_info: {
//         name: formData.get("seller_info.name"),
//         email: formData.get("seller_info.email"),
//         phone: formData.get("seller_info.phone"),
//       },
//       owner: userId,
//       // images,
//     };

//     //upload images to cloudinary

//     const imageUploadPromises = [];
//     for (const image of images) {
//       const imageBuffer = await image.arrayBuffer();
//       const imageArray = Array.from(new Uint8Array(imageBuffer));
//       const imageData = Buffer.from(imageArray);

//       // convert the image data to base64
//       const imageBase64 = imageData.toString("base64");

//       //Make request to upload to cloudinary
//       const result = await cloudinary.uploader.upload(
//         `data:image/png;base64,${imageBase64}`,
//         {
//           folder: "rentalVault",
//         }
//       );

//       imageUploadPromises.push(result.secure_url);

//       // wait for all images to upload
//       const uploadedImages = await Promise.all(imageUploadPromises);

//       // add uploaded images to property data object
//       propertyData.images = uploadedImages;
//     }

//     const newProperty = new Property(propertyData);
//     await newProperty.save();

//     return Response.redirect(`
//       ${process.env.NEXTAUTH_URL}/properties/${newProperty._id}
//       `);
//   } catch (error) {
//     return new Response(JSON.stringify({ message: error }), { status: 500 });
//   }
// };
