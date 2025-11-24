import Image from "next/image";
import type { Flutist } from "@/app/lib/flutists-data";

interface FlutistCardProps {
    flutist: Flutist;
}

export default function FlutistCard({ flutist }: FlutistCardProps) {
    const isAlive = !flutist.dod || flutist.dod === "";

    return (
        <div className="card w-full max-w-sm bg-transparent dark:bg-thyme-100/5 border-2 border-thyme-400 rounded-xl shadow-md shadow-current p-6">
            {/* Image */}
            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                    src={flutist.img}
                    alt={flutist.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-thyme-500 dark:text-thyme-100 text-center mb-2">
                {flutist.name}
            </h2>

            {/* Dates and Country */}
            <div className="text-center text-sm text-thyme-600 dark:text-thyme-300 mb-3">
                <p>{flutist.dob} - {isAlive ? "Present" : flutist.dod}</p>
                <p>{flutist.country} • {flutist.period}</p>
            </div>

            {/* Bio */}
            <p className="text-sm text-thyme-700 dark:text-thyme-200 mb-4 line-clamp-3">
                {flutist.bio}
            </p>

            {/* Teachers */}
            {flutist.teachers.length > 0 && (
                <div className="mb-3">
                    <h3 className="text-xs font-semibold text-thyme-600 dark:text-thyme-300 mb-1">
                        Teachers:
                    </h3>
                    <p className="text-xs text-thyme-700 dark:text-thyme-200">
                        {flutist.teachers.join(", ")}
                    </p>
                </div>
            )}

            {/* Students */}
            {flutist.students.length > 0 && (
                <div className="mb-3">
                    <h3 className="text-xs font-semibold text-thyme-600 dark:text-thyme-300 mb-1">
                        Notable Students:
                    </h3>
                    <p className="text-xs text-thyme-700 dark:text-thyme-200">
                        {flutist.students.join(", ")}
                    </p>
                </div>
            )}

            {/* Hashtags */}
            <div className="flex flex-wrap gap-1 mt-4">
                {flutist.hashtags.slice(0, 4).map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs px-2 py-1 bg-thyme-200 dark:bg-thyme-800 text-thyme-700 dark:text-thyme-200 rounded"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

