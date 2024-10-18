import dbConnect from "@/config/dbConfig";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {
  try {
    await dbConnect();
    const properties = await Property.find({});
    console.log(properties);
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
