import { Link } from "react-router-dom";

import Button from "../components/ui/Button";

export default function NotFoundPage() {

    return (

        <div
            className="
                flex
                min-h-screen
                flex-col
                items-center
                justify-center
                gap-6
                bg-zinc-950
                text-center
                text-white
            "
        >

            <h1 className="text-8xl font-bold">
                404
            </h1>


            <div>

                <h2 className="text-2xl font-semibold">
                    Page not found
                </h2>


                <p className="mt-2 text-zinc-400">
                    The page you are looking for does not exist.
                </p>

            </div>


            <Link to="/dashboard">

                <Button>
                    Go to Dashboard
                </Button>

            </Link>

        </div>

    );

}