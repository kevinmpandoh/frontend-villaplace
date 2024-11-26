import ProfileUser from "@/components/Profile/ProfileUser";

export const metadata = {
  title: "Profile | Villaplace",
};
//   try {
//     const res = await fetch("http://localhost:8000/api/user/current-user", {
//       method: "GET",
//       {
//         wi
//       }
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     const user = await res.json();

//     return {
//       props: {
//         user, // Data pengguna akan diteruskan ke komponen sebagai props
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         user: null,
//       },
//     };
//   }
// };

const Profile = () => {
  return (
    <>
      <div className=" p-2 border-b-2 border-gray-200 mb-5">
        <h1 className="text-lg font-bold">Edit Profile</h1>
      </div>
      <ProfileUser />
    </>
  );
};

export default Profile;
