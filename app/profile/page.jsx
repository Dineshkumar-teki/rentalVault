"use client";

import Link from "next/link";
import Image from "next/image";
import defaultProfile from "@/assests/styles/images/defaultProfile.png";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [userProperties, setUserProperties] = useState([]);

  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const handleDeleteProperty = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        const updatedProperties = userProperties.filter(
          (property) => property._id !== id
        );
        setUserProperties(updatedProperties);
        toast.success("Property deleted successfully");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("Failed to delete property");
      alert("failed to delete property");
    }
  };

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setUserProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4 font-serif">Your Profile</h1>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10 flex flex-col">
              <div className="mb-4 self-center">
                <Link href="/property.html">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full object-cover mx-auto md:mx-0"
                    src={profileImage || defaultProfile}
                    alt="User"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </Link>
              </div>

              <h2 className="text-xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {!loading && userProperties.length === 0 && (
                <p>You have no properties listing</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                userProperties.map((property) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt="Property 2"
                        width={500}
                        height={100}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street},{" "}
                        {property.location.city}, {property.location.state},{" "}
                        {property.location.zipcode}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
