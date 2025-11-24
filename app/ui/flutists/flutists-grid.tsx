import FlutistCard from "./flutists-card";
import flutists from "@/app/lib/flutists-data";

export default function FlutistsGrid() {
    return (
        <div className="mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-thyme-500 dark:text-thyme-100 text-center mb-8">
                Flutists to Know
            </h1>
            <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
                {flutists.map((flutist) => (
                    <FlutistCard key={flutist.name} flutist={flutist} />
                ))}
            </div>
        </div>
    );
}