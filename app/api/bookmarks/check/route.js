import dbConnect from "@/config/dbConfig";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { propertyId } = await request.json();
    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response("User ID is required", {
        status: 401,
      });
    }
    const { userId } = session;
    // find user in database
    const user = await User.findOne({ _id: userId });

    // check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 200 });
  }
};
