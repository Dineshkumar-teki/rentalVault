import dbConnect from "@/config/dbConfig";
import Property from "@/models/Property";
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

    let message;

    if (isBookmarked) {
      // if aalready bookmarked , remove it
      user.bookmarks.pull(propertyId);
      message = "bookmark removed successfully";
      isBookmarked = false;
    } else {
      // if not add
      user.bookmarks.push(propertyId);
      message = "bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();
    return new Response(
      JSON.stringify({
        message,
        isBookmarked,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 200 });
  }
};

// GET /api/bookmarks
export const GET = async () => {
  try {
    await dbConnect();

    const session = await getSessionUser();

    if (!session || !session.userId) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = session;

    // find user in database
    const user = await User.findOne({ _id: userId });

    // GET users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
