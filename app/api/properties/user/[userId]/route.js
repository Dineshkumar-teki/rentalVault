import dbConnect from "@/config/dbConfig";
import Property from "@/models/Property";

// GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await dbConnect();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const userProperties = await Property.find({owner: userId});
    if (!userProperties) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(userProperties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 200 });
  }
};
