import dbConnect from "@/config/dbConfig";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request, { params }) => {
  try {
    await dbConnect();
    const property = await Property.findById(params.id);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};
