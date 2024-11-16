import Link from "next/link";
import Button from "./Button";
import ProfileDialogBox from "./ProfileDialog";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-none  py-4  ">
      <div className="flex text-center items-center justify-between max-w-7xl mx-auto">
        <div className="text-white text-lg font-bold flex items-baseline w-full">
          Navbar
        </div>
        <div className=" flex items-center justify-center w-full  ">
          <div className="div space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-medium"
            >
              Home
            </Link>
            <Link
              href="/inspiration"
              className="text-gray-300 hover:text-white font-medium"
            >
              Inspiration
            </Link>
          </div>
        </div>
        <div className="space-x-4 flex  w-full  justify-end">
          <Button
            label="Submit portfolio"
            style="dark"
            onClick={() => router.push("/submit-portfolio")}
          />

          <div className="flex items-center ">
            <ProfileDialogBox />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
