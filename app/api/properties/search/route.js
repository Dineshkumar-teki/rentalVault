import dbConnect from "@/config/dbConfig";
import Property from "@/models/Property";

// GET /api/properties/search

export const GET = async (request) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");

    //match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    //only check for property if it's not 'ALL'
    if (propertyType && propertyType !== "All") {
      const typePttern = new RegExp(propertyType, "i");
      query.type = typePttern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {}
};
